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

### Bad rap for E2E testing
End-to-end testing has a fraught history of being flaky and unreliable. This is partially because sometimes 1s and 0s in software misfires and software running on the internet over HTTP requests in the browser compounds this.

Sometimes requests don't come through. Sometimes it takes 0.3 seconds for that element to appear on the DOM. Sometime it never appears. As test suites grow, the likelihood of all tests passing in a single run diminishes. We can try to wrangle instability in Selenium based solutions with waits, but then sometimes things never return. Then we have to do error handing and <strong>*Ack!</strong> I'm going home*

Cypress mitigates a lot of these headache points with:
- Auto retry capability
- Sweet debugging capabilities
- Traffic control for flaky API calls
- Wait helpers for DOM elements and XHR requests

### What I wish I knew before starting
