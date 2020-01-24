# How We Use Cypress for End-to-End Testing
## A (Mostly) Nontechnical Retrospective and Explanation My Team's E2E Testing Flow

### What tests can Cypress replace?

Cypress accesses your application through the browser, therefore it is most suitable for end-to-end acceptance tests or UI tests. If you have interest, Cypress can be used to unit test your components in Angular with some home-brewing. Considering the UI access point, Cypress is not appropriate for API testing.

On our team, challenges with TestBed were a strong motivation to try Cypress. TestBed is the way in Angular to set up the modules, providers, and child components necessary to shallow mount a component. It is necessary to do _any_ UI testing on a unit test level.

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

Focusing on controller logic has simplified our Jest tests. We offload UI testing to E2E tests in Cypress.

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
We've found that writing E2E tests has bolstered communication on our team, particularly tightening our dev-to-QA feedback loop.

At the beginning of each story, developers and testing come together to whiteboard a story around acceptance criteria. If needed, developers will have a separate technical implementation whiteboarding session.

When the devs are close to wrapping up feature work they meet again with QA to discuss what was implemented. At this point, test cases have been written, are refined, and the developers and QA can decide which test cases should be automated via Cypress (or SpecFlow if the test is API/DB related).

Even if test cases are automated, QA still rigorously manually tests around them. They also check the effectiveness of the Cypress tests against their manual testing for a given case. Then when new futures are produced, Cypress can act as our regression test suite and QA can focus on smoke and exploratory testing, rather than redoing tedious manual regression testing.

### Integration with Build and Deploys (working towards CI/CD)
In this section, I will refer to a build or build artifact as the code that is going to be released to an environment. Another term for releasing is deploying. The deploy process involves releasing a build to an environment. Both a build and a release have a possibility of failing. We have five distinct environments we deploy our builds to: DEV, TEST, AUTO, STAGE, and PROD. **FIX ME** In short, we run Cypress tests in our deployed AUTO environment. AUTO is required to be passing (green) in order to go to stage.

As part of our build process (before deploy/release), we run integration tests. These include unit tests in Jest on the frontend, unit tests in MSTest on the back end, and SpecFlow to acceptance test our API. If these fail, the build does not release to any of our environments.

After building, we deploy to DEV and AUTO environments concurrently. If the DEV release passes, the build also goes to TEST. These releases stand up resources and deploy our new code.

The AUTO release does the same as DEV and AUTO with an additional step. Once the new code has been deployed to the environment, we trigger an additional build that runs all of our Cypress E2E tests against the AUTO environment. If the tests fail, the release fails (red) and rolls back to the previous build. If the tests pass, the release passes (green).

For tests that fail, we capture screen-shots. Regardless of tests passing or failing, videos are captured of each test. Both of these are saved to the build artifact that runs the Cypress tests.

The initial setup in Azure was done by a teammate and we received further help from our DevOps colleague to save the screen-shots and videos as a build artifact.

### Working with Feature Flags
Given our CI/CD and QA workflows, we needed to figure out how to integrate feature flags into our Cypress testing flow. What we ended up agreeing on as a dev team is:

1. We start with feature flag on in DEV/Local for initial feature development
2. We submit a PR to merge the feature with the flag off in AUTO
3. All Cypress tests should pass in AUTO without the new feature
4. We update Cypress tests locally with the feature flag on
5. When the Cypress PR merges we turn the feature flag on in AUTO
6. The Cypress tests pass in AUTO with the new feature 🎉

Between steps 3-5 we have our testing discussions with QA and QA can begin testing the new feature by toggling the feature flag separately in our TEST environment.

## A Retrospective on the Retrospective
Cypress has brought a lot to our team and our process. It has brought our team closer in communication around feature expectations. It has provided us with a tool to catch defects as they are being generated. Possibly most importantly, it has created a regression testing suite that helps us feel assured that we have not negatively affected any previous features when implementing new ones.

Cypress also offers a breadth of helpful features allowing developers to dive into E2E testing without having to deal with the minutia of creating a Page Object Model and writing complex waiting helpers. Lastly, the value of the interactive test runner, screen-shot and video output makes this tool highly valuable to non-developer members of our team.

I have written another blog (see below) with more information about technical nuances of Cypress.