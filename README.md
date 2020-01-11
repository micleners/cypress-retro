This presentation was created in [Spectacle](https://github.com/FormidableLabs/spectacle)

A [ReactJS](https://reactjs.org/)-based Presentation Library.

[![Greenkeeper badge](https://badges.greenkeeper.io/micleners/cypress-retro.svg)](https://greenkeeper.io/)

# Part 1: Cypress for E2E Testing
## A (Mostly) Nontechnical Retrospective and Explanation of Our Flow

If you've worked with Angular, you have probably at least seen Protractor as the end-to-end (E2E) testing solution provided when you `ng new` a project. If you have every worked with Protractor or other selenium based solutions, you have likely become challenged and frustrated with the experience.

Our team chose to go towards greener, more JS based pastures by opting to use Cypress instead of Protractor. Was the grass greener on the other side? We sure think so! Here's been our experience.

_Note: E2E testing can sometimes be referred to as UI testing - because the UI is the entry point at one end. I may use these terms interchangeably but will make a distinction between our use case for the two later in this article_

### What is Cypress?

Cypress is a "fast, easy and reliable testing for anything that runs in a browser". It is batteries included with baked in features and perks. Cypress has a strong user community and great documentation.

It also has limitations. Most notably, Cypress currently only supports Chrome. It also comes with inherent concerns that all hot and new open source projects come with: what if the next hot thing comes out and maintainers jump ship? Not likely, and the same thing could happen with Protractor as we have seen with [tslint](#url)

[video of cypress usage](url)

### What will it cost me?

Cypress has a super generous free tier. You can <code>npm install cypress</code> and get kicking righting tests in no time. Then hop into the test runner and go back in time to see what happened at each point in your tests.

Free tier also provides the capability to take screenshots, videos and output reports. Not to mention all the baked in test development tools like cypress commands, traffic control, aliasing and dropping into jQuery attributes or Mocha assertions as needed.

The benefits of the paid tier of Cypress a pretty straight forward: a dope magical dashboard with a history of your test runs, including those video and screenshots mentioned above. We figured out how to extract these into our pipeline

### Bad rap for E2E testing ** add to presentation

End-to-end testing has a fraught history of being flaky and unreliable. This is partially because sometimes 1s and 0s in software misfires and software running on the internet over HTTP requests in the browser compounds this.

Sometimes requests don't come through. Sometimes it takes 0.3 seconds for that element to appear on the DOM. Sometime it never appears. As test suites grow, the likelihood of all tests passing in a single run diminishes. We can try to wrangle instability in Selenium based solutions with waits, but then sometimes things never return. Then we have to do error handing and <strong>_Ack!</strong> I'm going home_

Cypress mitigates a lot of these headache points with:

- Auto retry capability
- Sweet debugging capabilities
- Traffic control for flaky API calls
- Wait helpers for DOM elements and XHR requests

### Why automate E2E testing?

Many development teams opt not to automate end-to-end tests. Above the flakiness discussed above, it's another test suite the team needs to manage. On our project, we were already using unit tests in Jest on the frontend, unit tests in MSTest on the back end, and SpecFlow to acceptance test our API.

So what is the value of adding E2E tests? Just like any testing, it can help inform the development process and can help catch defects quickly after development. We've also found doing E2E tests has tightened the communication loop between development and QA.

Possibly the most important factor is your E2E test suite serves as a regression test suite. As you add more and more features, it's unreasonable to expect QA to manually regression test old features to make sure things haven't change. Their efforts can stay focused on creating test cases for new features and exploratory testing.

### What tests can Cypress replace?

Cypress accesses your application through the browser, therefore it is most suitable for end-to-end acceptance tests or UI tests. If you have interest, Cypress can be used to unit test your components in Angular with some home brewing. Considering the UI access point, Cypress is not appropriate for API testing.

A strong push on our team to try out Cypress was our challenges with TestBed. TestBed is the way in angular to set up the modules, providers and child components necessary to shallow mount a component. It is necessary to do _any_ UI testing on a unit test level.

#### TestBed/Shallow Mount
<span style="font-size: 36px">We have opted not to do this 🧐</span>

```js
describe('Shallow Mount', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DiscardContractAddComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [MatDialogModule, RouterTestingModule],
      providers: [AuthTokenService, MatDialog]
    }).compileComponents();
  }));

  beforeEach(() => {
    authTokenService = TestBed.get(AuthTokenService);
    authTokenService.isAuthorized = jest.fn().mockReturnValue(true);
    matDialog = TestBed.get(MatDialog);
    matDialog.open = jest.fn();
    fixture = TestBed.createComponent(DiscardContractAddComponent);
    component = fixture.componentInstance;
  });

  it('can do fixture/template tests', () => {
    const addButton = fixture.debugElement.nativeElement.querySelector(
      '.add-discard-contract'
    );
    addButton.click();
    expect(matDialog.open).toHaveBeenCalled();
  });
});
```

The `configureTestingModule` method proved to be an ongoing challenge for us. Any additional material component or service injected meant additional imports or providers required. Also, extracting the services from the testbed to assign them as variables to spy on was a challenging paradigm to get into the groove of.

We stopped UI testing in Jest and stuck to controller unit testing.

#### Controller Tests
<span style="font-size: 36px">We unit test typescript functionality only in Jest 😎</span>

```js
describe('Controller', () => {
  beforeEach(() => {
    matDialog = new MatDialog(null, null);
    matDialog.open = jest.fn();

    const router: Router = jest.genMockFromModule('@angular/router');
    authTokenService = new AuthTokenService(router);
    authTokenService.isAuthorized = jest.fn();

    component = new DiscardContractAddComponent(matDialog, authTokenService);
  });

  it('can trigger and test things on the typescript level', () => {
    component.addClicked();
    expect(component).toBeTruthy();
  });
});
```

This has simplified our Jest tests a lot to focus on controller logic. Then we couple UI manually testing as we code and develop E2E tests to check UI behavior.

#### Cypress
<span style="font-size: 36px">We use Cypress to test our UI 🥳</span>

```js
describe('Cypress', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('http://localhost:4200/discard');
  });

  it('tests things on the UI', () => {
    cy.get('.add-discard-contract').click();
    cy.get('mat-dialog-container').should('exist');

    cy.get('.market-field input').type('ADM');
    cy.contains('mat-option', 'ADM Altamont').click();

    .
    .
    .

    cy.get('.submit-button').click();
    cy.get('mat-dialog-container').should('not.exist');
  });
});
```

### Our Team Workflow
We've found that writing E2E tests has bolstered communication on our team, particularly bringing our dev to QA feedback loop tighter.

At the beginning of each story, developers and testing come together to whiteboard a story around acceptance criteria. If needed, developers will have a separate technical implementation whiteboarding session.

When the devs are close to wrapping up feature work, they meet again with QA to discuss what what implemnted. At this point, test cases have been written, are refined, and the developeres and QA can decide which test cases should be automated via Cypress (or SpecFlow if the test is API/DB related).

QA rigorously tests test cases flagged as automated. They then reconcile the Cypress tests to assure they pass the test case. Then in the future, Cypress can act as our regression test sweet and QA can focus more on smoke and exploratory testing.

### Integration with Build and Deploys (working towards CI/CD)
Said shortly, we run Cypress tests in our deployed AUTO environment. AUTO is required to be passing (green) in order to go to stage.

As part of our build process (before deploy/release), our integration tests run. These include unit tests in Jest on the frontend, unit tests in MSTest on the back end, and SpecFlow to acceptance test our API. If these fail, the build does not release to any of our

After building, we deploy to DEV and AUTO concurrently. If DEV release passes, the build also goes to TEST. These releases are simple standing up resources and deploying our new code.

The AUTO release does the same as DEV and AUTO with an additional step. Once the new code has been deployed to the environment, we trigger an additional build that runs all our Cypress E2E tests against the AUTO environment. If the tests fail, the release fails (red) rolls back to the previous build. If the tests pass, the release passes (green).

For tests that fail, we capture screen shots. Regardless of tests passing or failing, videos are captured of each test. Both of these area saved to the build artifact that runs the Cypress tests.

The initials setup in Azure was based off of [this blog](https://mariocardinal.wordpress.com/2019/03/05/configuring-cypress-in-ci-with-azure-devops-pipelines/), however we received further help from our DevOps colleague to save the screenshots and videos as a build artifact.

### Working with Feature Flags
Given our CI/CD and QA workflows, we needed to figure out how to integrate feature flags into our Cypress testing flow. What we ended up agreeing on as a dev team is:

1. We start with feature flag on in DEV/Local for initial feature development
2. We submit PR and merge feature with the flag off in AUTO
3. All Cypress tests should pass in AUTO without new feature
4. We update Cypress tests locally with feature flag on
5. When the Cypress PR merges we turn the feature flag on in AUTO
6. The Cypress tests pass in AUTO with the new feature 🎉

Between steps 3-5 we have our testing discussions with QA and QA can begin testing the new feature by toggling the feature flag separately in our TEST environment.

## A Retrospective on the Retrospective
Cypress has brought a lot to our team and our process. It has brought our team closer in communication around feature expectations. It has provided us with a tool to catch defects as they are being generated. It has also, possibly most importantly, created a regression testing suite that helps us feel assured that we have not negatively affected any previous features when implementing new ones.

Cypress also offers a breadth of helpful features allowing developers to dive into E2E testing without having to deal with the minutia of creating a Page Object Model and writing complex waiting helpers. Lastly, the value of the interactive test runner, screenshot and video output makes this tool highly valuable to non-developer members of our team.

I have written another blog (see below) with more information about technical nuances of Cypress.

# Part 2: Cypress for E2E Testing:
## Technical How We Do and Tips + Tricks

### Authentication and Authorization
I'll be honest, working with Azure AD, EasyAuth and ADAL has been a thorn in our side since the beginning of this project. However, every end-to-end testing solution will need to be figured out to integrate with auth. We chose to follow an auth flow *as close to* our prod auth flow as possible, rather than building a backdoor.

To do this in Cypress, we needed to catch the redirect call to SSO make an auth request. This is easier said than done and there are many forums about achieving this SSO flow. Our solution is provided here with confidential information redacted as UPERCASE_UNDERCORE_VARIABLES:

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
E2E testing means testing your entire application from the browser, through your API to your database. UI testing focuses on specific feature implementation on the UI. We decided to take advantage of traffic control in Cypress to test UI separate from our E2E processes. This is how we setup the folder structure for cypress:

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

Our E2E tests were written as expected with requests hitting our API. This required us to create a seed project to setup the data in our AUTO database to be accurate to our Prod environment. **This is easier said than done and each team should figure out what database seeding process works best from them sooner than later** - perhaps speaking from a bit of experience 😅

In our UI tests, we created lists of mock data. We then caught API requests using `cy.server()` and `cy.route()` (*thank you, Cypress!*) and returned these mocked data instead of letting the API requests go through.

The example below shows how we checked our UI messages stating "No ___ POMBs Available". POMBs is a type of transactional business model we use and there can either be "Pending" or "Active" - sometimes none of one type or the other. You'll see we hardcoded the messages we expected to see (or not see), mocking the data (data redacted), and how we caught our API calls and returned mocked data. Finally, we assert that we see the "No Active POMBs" on the active tab when no active POMBs are returned form our API.

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

