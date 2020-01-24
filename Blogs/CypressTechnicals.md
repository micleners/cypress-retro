Cypress for E2E Testing:
## Technical How We Do and Tips + Tricks

### Authentication and Authorization
I'll be honest, working with Azure AD, EasyAuth, and ADAL has been challenging. However, integrating auth with any end-to-end testing solution poses common challenges. We chose to follow an auth flow *as close to* our PROD auth flow as possible, rather than building a backdoor.

To do this in Cypress, we needed to catch the call to Single Sign-On (SSO) attempting to make an auth request. This is easier said than done and there are many forums about achieving this SSO flow. Our solution is provided here with confidential information redacted as UPERCASE_UNDERCORE_VARIABLES:

```javascript
function login(secret: string, id: string) {
  cy.request({
    method: 'POST',
    url: SSO_TOKEN,
    form: true,
    body: {
      grant_type: 'client_credentials',
      client_id: id,
      client_secret: secret,
      resource: RESOURCE_ID
    }
  }).then(response => {
    const adalToken = response.body.access_token;
    window.localStorage.setItem(
      'adal.access.token.keyede' + RESOURCE_ID,
      adalToken
    );

    window.localStorage.setItem('adal.idtoken', adalToken);
  });
}

export function loginWriteAll() {
  login(WRITE_ALL_SECRET, WRITE_ALL_ID);
}

export function loginReadAll() {
  login(READ_ALL_SECRET, READ_ALL_ID);
}

export function loginReporting() {
  login(REPORTING_SECRET, REPORTING_ID);
}
```

What you see above is three cypress commands that can be used to login our Cypress test at each authorization level that we have in our application. We do this before each test:

```javascript
  describe('writeAll role', () => {
    beforeEach(() => {
      cy.loginWriteAll();
      cy.visit(guiUrl);
    });
    ... tests ...
  });

  describe('readAll role', () => {
    beforeEach(() => {
      cy.loginReadAll();
      cy.visit(guiUrl);
    });
    ... tests ...
  });

  describe('reporting role', () => {
    beforeEach(() => {
      cy.loginReporting();
      cy.visit(guiMbUrl);
    });
    ... tests ...
  });
```

For more information on setting up this flow, see <a href="./assets/cypress-setup-by-alec.md">this write up from our teammate</a>.


### Traffic Control
E2E testing means testing your entire application from the browser through your API to your database. UI testing focuses on specific feature implementation on the UI. We decided to take advantage of traffic control in Cypress to test UI separately from our E2E processes. This is how we setup the folder structure for cypress:

```
  ▾ cypress/
   ▸ fixtures/
   ▾ integration/
    ▾ e2e/
     - cbot-price-table.e2e.ts
     - market-..is-table.e2e.ts
     - market-..is-table.e2e.ts
     - market-..is-table.e2e.ts
     - payment..is-table.e2e.ts
     - price-quote-table.e2e.ts
    ▾ ui/
     - cbot-price-table.ui.ts
     - market-basis-table.ui.ts
     - market-..sis-table.ui.ts
     - market-..sis-table.ui.ts
     - payment..sis-table.ui.ts
     - price-quote-table.ui.ts
    - side-nav.ts
   ▸ plugins/
   ▾ support/
    - commands.ts
    - index.js
   - README.md
   - cypress.json
   - tsconfig.json
```

Our E2E tests were written as expected with requests hitting our API. This required us to create a seed project to setup the data in our AUTO database to be accurate to our Prod environment. **This is easier said than done and each team should figure out which database seeding process works best for them sooner than later** (perhaps speaking from experience 😅)

In our UI tests, we created lists of mock data. We then caught API requests using `cy.server()` and `cy.route()` (*thank you, Cypress!*) and returned the mocked data instead of letting the API requests go through.

The example below shows how we checked our UI messages stating "No ___ POMBs Available". POMBs is a type of transactional business model we use. There can either be "Pending" or "Active"—sometimes none of one type or the other. You'll see we hardcoded the messages we expected to see (or not see), mocking the data (data redacted), and how we caught our API calls and returned mocked data. Finally, we assert that we see the "No Active POMBs" on the active tab when no active POMBs are returned form our API.

```javascript
  beforeEach(() => {
    cy.loginWriteAll();
    cy.server({});
  });

  const pendingPombTitle = 'No Pending Payment Option Market Basis Results';
  const pendingPombMessage = 'All POMB records for this basis date are Active.';
  const activePombTitle = 'No Active Payment Option Market Basis Results';
  const activePombMessage = 'All POMB records for this basis date are Pending.';

  const mockedPendingPombs = [
    { 'POMB object 1' }, ..., { 'POMB object N' }
  ];

  const mockActivePombs = [
    { 'POMB object 1' }, ..., { 'POMB object N' }
  ];

  it('should have a "no Active POMBS" message if there are no Active POMBs but some Pending POMBs', () => {
    cy.route({
      method: 'Get',
      url: apiPombUrl,
      response: [
        {
          paymentOptionMarketBasisListViewModels: [],
          status: 'Active'
        },
        {
          paymentOptionMarketBasisListViewModels: mockedPendingPombs,
          status: 'Pending'
        }
      ]
    });

    cy.visitAndWaitXhr(guiPombUrl);

    cy.checkNoDataMessageHidden(pendingPombTitle, pendingPombMessage);
    cy.checkNoDataMessageHidden(activePombTitle, activePombMessage);

    cy.contains('.mat-tab-label', 'Active').click();

    cy.checkNoDataMessageHidden(pendingPombTitle, pendingPombMessage);
    cy.checkNoDataMessage(activePombTitle, activePombMessage);
  });
```

