import CodeSlide from "spectacle-code-slide";
import React from "react";
import createTheme from "spectacle/lib/themes/default";
import {
  themeColors,
  H1Norm,
  H1Col1,
  H2,
  FlexRowCenter,
  ListItemIndent
} from "./helpers";
import {
  Title,
  CypressIs,
  Alternative,
  BadRap,
  Value,
  WhoUses,
  Cost,
  Auth,
  Closing,
  DashboardFeatures,
  FeatureFlags,
  FreeFeatures,
  Paid,
  PipelineImage,
  PipelineText,
  TeamDynamics,
  Traffic
} from "./slides";
import "./styles.css";
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

require("normalize.css");

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
        <Title />
        <CypressIs />
        <Alternative />
        <BadRap />
        <Value />
        <WhoUses />
        <Cost />
        <FreeFeatures />
        <Paid />
        <DashboardFeatures />
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
        <PipelineImage />
        <PipelineText />
        <FeatureFlags />
        <TeamDynamics />
        <Auth />
        <CodeSlide
          className="code"
          transition={[]}
          bgColor="dark"
          lang="js"
          textColor="text"
          code={require("raw-loader!../assets/auth.example").default}
          ranges={[
            { loc: [0, 22], title: "Auth Flow with Cypress" },
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
        <Traffic />
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
        <Closing />
      </Deck>
    );
  }
}
