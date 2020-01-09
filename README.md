This presentation was created in [Spectacle](https://github.com/FormidableLabs/spectacle)

A [ReactJS](https://reactjs.org/)-based Presentation Library.

[![Greenkeeper badge](https://badges.greenkeeper.io/micleners/cypress-retro.svg)](https://greenkeeper.io/)

## Cypress for E2E Testing: A Retrospective

If you've worked with Angular, you have probably at least seen Protractor as the end-to-end (E2E) testing solution provided when you `ng new` a project. If you have every worked with Protractor or other selenium based solutions, you have likely become challenged and frustrated with the experience.

Our team chose to go towards greener, more JS based pastures by opting to use Cypress instead of Protractor. Was the grass greener on the other side? We sure think so! Here's been our experience.

*Note: E2E testing can sometimes be referred to as UI testing - because the UI is the entry point at one end. I may use these terms interchangeably but will make a distinction between our use case for the two later in this article*

### What is Cypress?
Cypress is a "fast, easy and reliable testing for anything that runs in a browser". It is batteries included with baked in features and perks. Cypress has a strong user community and great documentation.

It also has limitations. Most notably, Cypress currently only supports Chrome. It also comes with inherent concerns that all hot and new open source projects come with: what if the next hot thing comes out and maintainers jump ship? Not likely, and the same thing could happen with Protractor as we have seen with [tslint](#url)

[video of cypress usage](url)

### What will it cost me?
Cypress has a super generous free tier. You can <code>npm install cypress</code> and get kicking righting tests in no time. Then hop into the test runner and go back in time to see what happened at each point in your tests.

Free tier also provides the capability to take screenshots, videos and output reports. Not to mention all the baked in test development tools like cypress commands, traffic control, aliasing and dropping into jQuery attributes or Mocha assertions as needed.

The benefits of the paid tier of Cypress a pretty straight forward: a dope magical dashboard with a history of your test runs, including those video and screenshots mentioned above. We figured out how to extract these into our pipeline

### Bad rap for E2E testing
End-to-end testing has a fraught history of being flaky and unreliable. This is partially because sometimes 1s and 0s in software misfires and software running on the internet over HTTP requests in the browser compounds this.

Sometimes requests don't come through. Sometimes it takes 0.3 seconds for that element to appear on the DOM. Sometime it never appears. As test suites grow, the likelihood of all tests passing in a single run diminishes. We can try to wrangle instability in Selenium based solutions with waits, but then sometimes things never return. Then we have to do error handing and <strong>*Ack!</strong> I'm going home*

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

A strong push on our team to try out Cypress was our challenges with TestBed. TestBed is the way in angular to set up the modules, providers and child components necessary to shallow mount a component. It is necessary to do *any* UI testing on a unit test level:

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('can do fixture/template tests', () => {
    const addButton = fixture.debugElement.nativeElement.querySelector('.add-discard-contract');
    addButton.click();
    expect(matDialog.open).toHaveBeenCalled();
  })
});
```

The `configureTestingModule` method proved to be an ongoing challenge for us. Any additional material component or service injected meant additional imports or providers required. Also, extracting the services from the testbed to assign them as variables to spy on was a challenging paradigm to get into the groove of. Therefore, we opted to stop UI testing
