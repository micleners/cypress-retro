# How We Use Cypress for End-to-End Testing

*This blog is part of a series on end-to-end (E2E) testing in Cypress. In this post, we will take a look at how our team uses Cypress to benefit our workflow and increase the safety in which we deploy new features.  This information is available in [this presentation](https://cypress-retro.micleners.com/) I give on the topic. You can also check out a demo application with Cypress at [this repo](http://github.com/micleners/cypress-cotd).*

## A Retrospective and Explanation of My Team's E2E Testing Flow

### What is Cypress?

[Cypress](https://www.cypress.io/features) is "fast, easy and reliable testing for anything that runs in a browser". It is batteries included so it comes fully baked-in tons of features and perks. It is also open source, has a strong user community, and great documentation.

Cypress accesses the application via the browser, therefore it is most suitable for end-to-end (E2E) acceptance tests or user interface (UI) tests. If you have interest, Cypress can be used to unit test your components with some home-brewing. Cypress also allows for full on traffic control of API calls, so it can also be used for API testing.

### What is Cypress and what Tests can it replace?

Our team uses Angular, which comes with Jasmine/Karma for unit testing and Protractor for E2E tests. We chose to replace the former with Jest since our team had more experience with it and we chose not to use Protractor because of it being Selenium based.

We experienced challenges with using TestBed for UI testing. TestBed is the way in Angular to set up the modules, providers, and child components necessary to shallow mount a component. It is necessary to do _any_ UI testing on a unit test level.

We use Jest to unit test our components. Instead of doing these tests with TestBed, we resereved Jest unit testing for TypeScript logic only. This mean any logic around function calls and flags were tested, but their connection to the template or DOM was not at this level. This is where we leveraged Cypress tests

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
The ecosystem around of QA requirements and dynamics is complex. Every company will vary in approach and solution as every team and project needs will be different. Whether QA is embedded on a team or separate and whether developers or QA automation engineers write the automated tests are key differences. Our team has a QA member that writes test cases and manually tests, while our developers right the automated tests. We've found that writing E2E tests has bolstered communication on our team, particularly tightening our dev-to-QA feedback loop.

At the beginning of each story, developers and testing come together to whiteboard a story around acceptance criteria. If needed, developers will have a separate technical implementation whiteboarding session to further refine their approach.

When the developers are wrapping up feature work, they meet again with QA to discuss what was implemented. At this point, test cases have been written, are refined, and the developers and QA can decide which E2E test cases should be automated via Cypress.

Even if test cases are automated, at feature implementation, QA still rigorously manually tests them. They also check the effectiveness of the Cypress tests against their manual testing for a given case. From that point, the tests are marked as "automated" and Cypress can act as our regression test suite. This allows us to focus on smoke and exploratory testing, rather than redoing tedious and manual regression testing.

### Integration with Build and Deploys (working towards CI/CD)
Let's get some definitions set out for this section, as it can be a bit technical and confusing. I will refer to a **build** or build **artifact** as the code that is going to be **released** to an environment. The **release** process involves **deploying** code, therefore nother term for a **release** is a **deploy**. Both a build and a release have the possibility to **fail (red)** or **pass (green)**. Failing means that the next step will not be performed.

The deploy process releases a build to an **environment**. An environment consists of a **group of resources** that is required to run an instance of our digital application (distinct URL, database, API server, UI server, functions, etc). The five environments we deploy to builds are DEV, TEST, AUTO, STAGE, and PROD. DEV is for developers to check their work, TEST if for QA, AUTO are for our E2E tests, STAGE is for business user, and PROD is for our customers to use.

Are deploy process as it pertains to Cypress is that we run Cypress tests in on deploy to AUTO. The tests are required to pass in AUTO (green) in order to go to stage. You can see details of this in the figure below and in the text that follows:
![image showing the details of how our piperline flow works with cypress](pipeline.png)

When we create a pull request (PR) to master, we are requesting new code to be merged and deployed. At this point a build happens. As part of our build proces, before any releases happen, we run integration tests. These include unit tests in Jest on the frontend, unit tests in MSTest on the back end, and SpecFlow acceptance tests on our API. If these fail, the build does not release to any of our environments.

After building, we deploy to DEV and AUTO environments concurrently. If the DEV release passes (green), the build also goes to TEST. These releases stand up resources and deploy our new code — nothing special.

The AUTO release does the same release as DEV and AUTO with an additional step. Once the new code has been deployed to the environment, we trigger an additional build that runs all of our Cypress E2E tests against the AUTO environment. If the tests fail, the release fails (red) and rolls back to the previous build. If the tests pass, the release passes (green).

For tests that fail, we capture screen-shots. Regardless of tests passing or failing, videos are captured of each test. Both of these are saved to the build artifact that runs the Cypress tests. The initial setup in Azure was done by a teammate and we received further help from our DevOps colleague to save the screen-shots and videos as a build artifact.

In order for a build to go to STAGE, we require two things: Cypress tests passing in auto (green) and QA signing off on all features merged. Once a release is in STAGE, it can go to PROD if it has been signed off by business. We use **Launch Darkly** as feature flags to help remove barriers to releasing partial features, as we'll discuss in this next section.

### Working with Feature Flags
Given our CI/CD and QA workflows, we needed to figure out how to integrate feature flags into our Cypress testing flow. While it is possible to toggle feature flags for certain Cypress tests, we decided to create a workflow that was suitable for us. What we ended up agreeing on as a dev team is:

1. Start with a feature flag on in DEV/Local for initial feature development

We can control feature flags at different environment levels, and DEV and local are controlled together. This means if a feature flag is on in the DEV environment, it will be on locally. We start with the feature flag on here so we can write code for the feature that is behind the feature flag.

2. We submit a PR to merge the feature with the flag off in AUTO

While Cypress tests would likely fail or be incomplete locally because of the new feature, **all Cypress tests should pass in AUTO** with the feature flag off. This means that we successfully integrated a new feature behind a feature flag without breaking any existing features.

At this point, QA can begin manually testing the feature by toggling the feature flag in the TEST environment.

3. We update Cypress tests locally with the feature flag on

We want to update our Cypress tests so they will pass with the feature flag on, as this is the desired end state in PROD.

4. When the Cypress PR merges we turn the feature flag on in AUTO

This can be tricky, especially if the tests do not pass in AUTO right away or there is PR feedback from other developers. Usually around this time one or two auto builds will fail because the flag is on but tests are not updated yet.

5. The Cypress tests pass in AUTO with the new feature 🎉

Having AUTO green is important and exciting for us. We often hear from colleagues that it is difficult to keep AUTO green because of the flaky nature of E2E tests and the difficulty QA has keeping up with writing tests. Because we have QA integrated onto our team and the developers write the automated tests, we keep our E2E test suite up to date.

## A Retrospective on the Retrospective
Cypress has brought a lot to our team and our process. It has brought our team closer in communication around feature expectations. It has provided us with a tool to catch defects as they are being generated. Possibly most importantly, it has created a regression testing suite that helps us feel assured that we have not negatively affected any previous features when implementing new ones.

Cypress also offers a breadth of helpful features allowing developers to dive into E2E testing without having to create a Page Object Model or write wait helpers. Also, the value of the interactive test runner, screen-shot and video output makes this tool highly valuable to non-developer members of our team.