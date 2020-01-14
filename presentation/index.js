// Import React
import CodeSlide from "spectacle-code-slide";
import React from "react";
import styled from "styled-components";

import "./styles.css";

// Import Spectacle Core tags
import {
  BlockQuote,
  Cite,
  Deck,
  Heading,
  Image,
  List,
  ListItem,
  Notes,
  Quote,
  Slide,
  Text,
  Link
} from "spectacle";

// Import theme
import createTheme from "spectacle/lib/themes/default";

const images = {
  cypress: require("../assets/cypress-bw.png").default,
  sai: require("../assets/sai.png").default,
  dsmjs: require("../assets/dsmjs.png").default,
  pipeline: require("../assets/pipeline.png").default,
  twitter: require("../assets/twitter.png").default
};

// Require CSS
require("normalize.css");

const themeColors = {
  dark: "#1C1B21",
  text: "#BBBBBB",
  lightText: "#EAEAEA",
  darkText: "#3D4554",
  green: "#26D9D2",
  red: "#EF5350",
  aqua: "#24c4b7",
  yellow: "#fded07",
  purple: "#663399"
};

const theme = createTheme(themeColors, {
  primary: {
    name: "Oxygen Mono",
    googleFont: true,
    styles: ["400", "700i"]
  },
  secondary: {
    name: "Roboto Mono",
    googleFont: true,
    styles: ["400", "700i"]
  }
});

const H1Norm = ({ children }) => (
  <Heading size={2} lineHeight={1.1} textColor="text">
    {children}
  </Heading>
);

const H1Col1 = styled(H1Norm)`
  color: ${themeColors.yellow};
`;

const H2 = ({ children }) => (
  <Heading size={4} lineHeight={1.1} textColor="text">
    {children}
  </Heading>
);

const FlexRowCenter = ({ children }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    {children}
  </div>
);

const ListItemIndent = ({ children }) => (
  <ListItem style={{ marginLeft: 80 }}>{children}</ListItem>
);

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck
        transition={["zoom", "slide"]}
        transitionDuration={500}
        contentWidth={1400}
        theme={theme}
        bgColor="dark"
      >
        <Slide transition={["zoom"]} bgColor="dark">
          <H1Norm>
            <span style={{ color: themeColors.yellow }}>Cypress</span> for E2E
            Testing:
          </H1Norm>
          <Heading size={3} lineHeight={1.1} textColor="darkText">
            A Retrospective
          </Heading>
          <br />
          <br />
          <br />

          <FlexRowCenter>
            <div>
              <Heading size={4} caps lineHeight={1} textColor="text">
                Michael Leners
              </Heading>
              <Heading size={6} lineHeight={1} textColor="darkText">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end"
                  }}
                >
                  <img
                    src={images.twitter}
                    style={{ marginRight: 15 }}
                    width="50px"
                  />{" "}
                  @micLeners
                </div>
              </Heading>
            </div>
            <Image
              src={images.dsmjs}
              style={{ margin: "0 45px" }}
              width="100px"
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start"
              }}
            >
              <Heading
                size={6}
                lineHeight={0.3}
                style={{ margin: "20px 0 0 0" }}
                textColor="darkText"
              >
                Hosted by
              </Heading>
              <img src={images.sai} width="500px" />
            </div>
          </FlexRowCenter>
          <br />
          <br />
          <br />
          <Heading size={5} caps lineHeight={1} textColor="darkText">
            January 14, 2020
          </Heading>
        </Slide>

        <Slide transition={["zoom"]} bgColor="dark">
          <H1Norm>
            <FlexRowCenter>
              What is{" "}
              <img
                src={images.cypress}
                style={{ marginLeft: 40 }}
                width="400"
              />{" "}
              ?
            </FlexRowCenter>
          </H1Norm>
          <br />
          <H2>
            Fast, easy and reliable testing for anything that runs in a browser
            🌐
          </H2>
          <br />
          <List style={{ marginLeft: 200 }} textColor="text">
            <ListItem>Fast, easy and reliable E2E testing</ListItem>
            <ListItem>Batteries included</ListItem>
            <ListItem>Great docs and strong community</ListItem>
            <ListItem>Easy to install</ListItem>
            <ListItemIndent>
              Can setup TypeScript (
              <a href="https://github.com/bahmutov/add-typescript-to-cypress">
                R1
              </a>
              ) (
              <a href="https://medium.com/joolsoftware/unittesting-angular-components-with-cypress-202a38d9f81a">
                R2
              </a>
              )
            </ListItemIndent>
          </List>
        </Slide>
        
        <Slide transition={["zoom"]} bgColor="dark">
          <H1Norm>What is Cypress an alternative to?</H1Norm>
          <br />
          <H2>Selenium based testing platforms and having to use TestBed 😩</H2>
          <br />
          <List style={{ marginLeft: 270 }} textColor="text">
            <ListItem>
              Protractor (
              <a href="https://techblog.fexcofts.com/2018/09/24/end-to-end-e2e-angular-testing-protractor-vs-cypress/">
                R1
              </a>
              ) (
              <a href="https://hackernoon.com/cypress-io-vs-protractor-e2e-testing-battle-d124ece91dc7">
                R2
              </a>
              ) (
              <a href="https://watirmelon.blog/category/automated-testing/">
                R3
              </a>
              )
            </ListItem>
            <ListItem>Shallow mounting with TestBed</ListItem>
          </List>
        </Slide>

        <Slide transition={["zoom"]} bgColor="dark">
          <H1Norm>Bad Rap for E2E Testing</H1Norm>
          <br />
          <H2>Flakiness and frustration 😫</H2>
          <br />
          <List style={{ marginLeft: 75 }} textColor="text">
            <ListItem>Waiting on API calls/flaky API calls</ListItem>
            <ListItem>Waiting DOM changes and load time</ListItem>
            <ListItem>Inconsistent browser renders from run to run</ListItem>
            <ListItem>Error catching and handling</ListItem>
          </List>
          <H2>Cypress has solutions baked in 😎</H2>
        </Slide>

        <Slide transition={["zoom"]} bgColor="dark">
          <H1Col1>Automated E2E Testing Value</H1Col1>
          <br />
          <H2>It's the gift that keeps on giving 🎁</H2>
          <br />
          <List style={{ marginLeft: 75 }} textColor="text">
            <ListItem>Catch more defects in development</ListItem>
            <ListItem>Tighten communication between developer and QA</ListItem>
            <ListItem>Serves as regression test suite</ListItem>
          </List>
        </Slide>

        <Slide transition={["zoom"]} bgColor="dark">
          <H1Norm>Who uses Cypress?</H1Norm>
          <br />
          <H2>
            Developers and QA engineers 🙋‍♀️ building web applications and testing
          </H2>
          <br />
          <List style={{ marginLeft: 400 }} textColor="text">
            <ListItem>End-to-end tests</ListItem>
            <ListItem>Integration tests</ListItem>
            <ListItem>Unit tests</ListItem>
            <ListItem>Acceptance tests</ListItem>
            <ListItem>Regression tests</ListItem>
          </List>
        </Slide>

        <Slide transition={["zoom"]} bgColor="dark">
          <H1Norm>What does it cost?</H1Norm>
          <br />
          <H2>Free for a smorgasbord of features 🥗</H2>
          <br />
          <List style={{ marginLeft: 250 }} textColor="text">
            <ListItem>Debuggability</ListItem>
            <ListItem>Real time reloads</ListItem>
            <ListItem>Automatic waiting</ListItem>
            <ListItem>Screenshots, videos and reporting</ListItem>
          </List>
        </Slide>

        <Slide transition={["zoom"]} bgColor="dark">
          <H1Norm>Writing + Running Tests</H1Norm>
          <br />
          <video controls autoPlay="autoplay">
            <source
              src="https://www.cypress.io/static/writing-tests-24ff41477f89dd27e36b03a00da9c5a3.webm"
              type="video/webm"
            />
          </video>
          <br />
          <Link href="https://www.cypress.io/features">Features</Link>
        </Slide>

        <Slide transition={["zoom"]} bgColor="dark">
          <Heading
            size={2}
            lineHeight={1.1}
            style={{ width: "150%", textAlign: "left" }}
            textColor="text"
          >
            What does paying provide?
          </Heading>
          <br />
          <H2>A magical dashboard 🧙‍♂️</H2>
          <br />
          <List style={{ marginLeft: 75 }} textColor="text">
            <ListItem>Parallelization, grouping and load balancing</ListItem>
            <ListItem>Insights</ListItem>
            <ListItem>Recording and Screenshots (in dashboard)</ListItem>
            <ListItem>Run in CI (more easily)</ListItem>
            <ListItem>Screenshots, videos and reporting</ListItem>
          </List>
        </Slide>

        <Slide transition={["zoom"]} bgColor="dark">
          <H1Norm>Cypress Test Runner</H1Norm>
          <br />
          <video controls autoPlay="autoplay">
            <source
              src="https://www.cypress.io/static/dashboard-565afdee6fc0c84a8d84e858dc1c7061.webm"
              type="video/webm"
            />
          </video>
          <br />
          <Link href="https://www.cypress.io/features">Features</Link>
        </Slide>

        <CodeSlide
          className="code"
          transition={[]}
          bgColor="dark"
          lang="js"
          textColor="dark"
          code={require("raw-loader!../assets/testbed.example").default}
          ranges={[
            { loc: [0, 2], title: "TestBed Example" },
            { loc: [2, 8], title: "Configuring Testing Module" },
            {
              loc: [3, 4],
              title: "Configuring Testing Module",
              note: "`declarations` to import the components being mounted"
            },
            {
              loc: [4, 5],
              title: "Configuring Testing Module",
              note:
                "`NO_ERRORS_SCHEMA` to suppress errors related to not importing child components"
            },
            {
              loc: [5, 6],
              title: "Configuring Testing Module",
              note:
                "`imports` to bring in any modules your component depends on"
            },
            {
              loc: [6, 7],
              title: "Configuring Testing Module",
              note: "`providers` for dependency injection of services"
            },
            {
              loc: [2, 8],
              title: "Configuring Testing Module",
              note: "This is a typical testbed setup"
            },
            { loc: [11, 19], title: "Instantiate Component" },
            {
              loc: [11, 14],
              title: "Extract and Setup Services",
              note:
                "Pull out authorization service from TestBed in order to mock"
            },
            {
              loc: [14, 16],
              title: "Extract and Setup Services",
              note: "Same for Angular Material dialog service"
            },
            {
              loc: [16, 19],
              title: "Extract Component from Fixture",
              note:
                "Component is controller (TypeScript), fixture contains template"
            },
            { loc: [21, 30], title: "Testing Dialog Modal" }
          ]}
        />

        <CodeSlide
          className="code"
          transition={[]}
          bgColor="dark"
          lang="js"
          textColor="text"
          code={require("raw-loader!../assets/controller.example").default}
          ranges={[
            { loc: [0, 2], title: "Controller Example" },
            {
              loc: [2, 4],
              title: "Setup Services",
              note: "Set up authorization service and mock"
            },
            {
              loc: [4, 8],
              title: "Setup Services",
              note: "Same for Angular Material dialog service"
            },
            {
              loc: [8, 12],
              title: "Create Component",
              note: "Like a good ol' fashioned normal object ☺️"
            },
            { loc: [2, 12], title: "Configuring Testing Module?" },
            { loc: [2, 12], title: "Configuring Testing Module 🎉" },
            { loc: [14, 18], title: "Testing Dialog Modal" }
          ]}
        />

        <CodeSlide
          className="code"
          transition={[]}
          bgColor="dark"
          lang="js"
          textColor="text"
          code={require("raw-loader!../assets/cypress.example").default}
          ranges={[
            { loc: [0, 2], title: "Cypress Example" },
            {
              loc: [2, 4],
              title: "Setup",
              note:
                "`cy.login` is a custom built Cypress command to deal with authentication"
            },
            {
              loc: [6, 9],
              title: "Open Modal",
              note: "Assert that it's on the DOM"
            },
            {
              loc: [10, 12],
              title: "Select in Searchable Dropdown",
              note:
                "`cy.contains` allows you to search for element containing text"
            },
            { loc: [13, 16], title: "Do other things" },
            {
              loc: [17, 19],
              title: "Finish Flow",
              note: "Assert that dialog modal is no longer open."
            }
          ]}
        />

        <Slide transition={["zoom"]} bgColor="dark">
          <H1Norm>Release Pipeline Flow</H1Norm>
          <br />
          <H2>AUTO is a gate to stage ↺</H2>
          <br />
          <Image
            src={images.pipeline}
          />
        </Slide>

        <Slide transition={["zoom"]} bgColor="dark">
          <H1Norm>Integrating into CI/CD</H1Norm>
          <br />
          <H2>AUTO is a gate to stage ↺</H2>
          <br />
          <List style={{ marginLeft: 0 }} textColor="text">
            <ListItem>Build passes pending integration tests:</ListItem>
            <ListItemIndent>
              Frontend (Jest) and API (MSTest) unit tests
            </ListItemIndent>
            <ListItemIndent>SpecFlow API acceptance tests</ListItemIndent>
            <ListItem>Build deploys to DEV and AUTO concurrently</ListItem>
            <ListItem>AUTO runs Cypress against itself</ListItem>
            <ListItem>AUTO deploy fails if any Cypress tests fail</ListItem>
            <ListItem>
              Screenshots and Videos saved to{" "}
              <a href="https://vs-pioneer.visualstudio.com/project0/_build/results?buildId=175461&view=artifacts&type=publishedArtifacts">
                build artifact
              </a>
            </ListItem>
            <ListItem>We don't go to STAGE unless AUTO is green</ListItem>
          </List>
        </Slide>

        <Slide transition={["zoom"]} bgColor="dark">
          <H1Norm>Feature Flag Flow</H1Norm>
          <br />
          <H2>Integrating with Launch Darkly 🌚</H2>
          <br />
          <List style={{ marginLeft: 100 }} textColor="text">
            <ListItem>Flag on in DEV/Local</ListItem>
            <ListItem>Merge feature (flag off in AUTO)</ListItem>
            <ListItem>Cypress passes in AUTO w/o feature</ListItem>
            <ListItem>Update Cypress locally w/ flag on</ListItem>
            <ListItem>Cypress PR merges => Feature flag on in AUTO </ListItem>
            <ListItem>Cypress passes in AUTO w/ new feature 🎉</ListItem>
          </List>
        </Slide>

        <Slide transition={["zoom"]} bgColor="dark">
          <H1Norm>Team Dynamics</H1Norm>
          <br />
          <H2>Cypress brings QA and Devs together 🤝</H2>
          <br />
          <List style={{ marginLeft: 100 }} textColor="text">
            <ListItem>Start of story: Dev + QA Whiteboard</ListItem>
            <ListItem>Devs work on and merge feature work</ListItem>
            <ListItem>Devs + QA decide what to automate</ListItem>
            <ListItem>QA manually tests, devs write Cypress</ListItem>
            <ListItem>QA validates Cypress against test cases</ListItem>
            <ListItem>QA marks cases as "automated" for regression</ListItem>
          </List>
        </Slide>

        <Slide transition={["zoom"]} bgColor="dark">
          <H1Norm>Auth Integration</H1Norm>
          <br />
          <H2>It is a necessary evil 🤷‍♀️</H2>
          <br />
          <List style={{ marginLeft: 100 }} textColor="text">
            <ListItem>Our Stack: Azure AD, SSO, EasyAuth, ADAL</ListItem>
            <ListItem>Must have token to access GUI</ListItem>
            <ListItem>Must have valid token to access API</ListItem>
            <ListItem>EasyAuth == barrier around deployed API</ListItem>
            <ListItem>Using Cypress request we:</ListItem>
            <ListItemIndent>Call to SSO for token</ListItemIndent>
            <ListItemIndent>
              Use desired service account auth level
            </ListItemIndent>
            <ListItemIndent>
              Save token in place ADAL is expecting it
            </ListItemIndent>
          </List>
        </Slide>

        <CodeSlide
          className="code"
          transition={[]}
          bgColor="dark"
          lang="js"
          textColor="text"
          code={require("raw-loader!../assets/auth.example").default}
          ranges={[
            { loc: [2, 22], title: "Setup Auth Request" },
            {
              loc: [2, 4],
              title: "Setup",
              note:
                "`cy.login` is a custom built Cypress command to deal with authentication"
            },
            {
              loc: [6, 9],
              title: "Open Modal",
              note: "Assert that it's on the DOM"
            },
            {
              loc: [10, 12],
              title: "Select in Searchable Dropdown",
              note:
                "`cy.contains` allows you to search for element containing text"
            },
            { loc: [13, 16], title: "Do other things" },
            {
              loc: [17, 19],
              title: "Finish Flow",
              note: "Assert that dialog modal is no longer open."
            }
          ]}
        />

        <Slide transition={["zoom"]} bgColor="dark">
          <H1Norm>Traffic Control</H1Norm>
          <br />
          <H2>Monitor & Mock Requests 🛩</H2>
          <br />
          <List style={{ marginLeft: 100 }} textColor="text">
            <ListItem>Wait on XHR requests (Launch Darkly)</ListItem>
            <ListItem>Watch and assert on requests</ListItem>
            <ListItem>Mock API returns</ListItem>
          </List>
        </Slide>

        <CodeSlide
          className="code"
          transition={[]}
          bgColor="dark"
          lang="js"
          textColor="text"
          code={require("raw-loader!../assets/traffic.example").default}
          ranges={[
            { loc: [0, 2], title: "Cypress Example" },
            {
              loc: [2, 4],
              title: "Setup",
              note:
                "`cy.login` is a custom built Cypress command to deal with authentication"
            },
            {
              loc: [6, 9],
              title: "Open Modal",
              note: "Assert that it's on the DOM"
            },
            {
              loc: [10, 12],
              title: "Select in Searchable Dropdown",
              note:
                "`cy.contains` allows you to search for element containing text"
            },
            { loc: [13, 16], title: "Do other things" },
            {
              loc: [17, 19],
              title: "Finish Flow",
              note: "Assert that dialog modal is no longer open."
            }
          ]}
        />
      </Deck>
    );
  }
}
