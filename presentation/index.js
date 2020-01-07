// Import React
import React from "react";

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
  Text
} from "spectacle";

// Import theme
import createTheme from "spectacle/lib/themes/default";

const images = {
  formidagon: require("../assets/formidable-logo.svg"),
  goodWork: require("../assets/good-work.gif")
};

// Require CSS
require("normalize.css");

const theme = createTheme(
  {
    dark: "#1C1B21",
    text: "#BBBBBB",
    tertiary: "#EAEAEA",
    quaternary: "#3D4554",
    accentGreen: "#26D9D2",
    accentRed: "#EF5350",
    accentBlue: "#1876D2"
  },
  {
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
  }
);

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck
        transition={["zoom", "slide"]}
        transitionDuration={500}
        contentWidth={1400}
        theme={theme}
      >
        <Slide transition={["zoom"]} bgColor="dark">
          <Heading size={2} lineHeight={1.1} textColor="accentGreen">
            Cypress for E2E Testing:
          </Heading>
          <Heading size={3} lineHeight={1.1} textColor="accentGreen">
            A Retrospective
          </Heading>
          <br></br>
          <Heading size={4} caps lineHeight={1} textColor="tertiary">
            Michael Leners
          </Heading>
          <Heading size={4} lineHeight={1} textColor="tertiary">
            @micLeners
          </Heading>
          <br></br>
          <Heading size={4} lineHeight={1} textColor="accentBlue">
            dsmJS @ Source Allies
          </Heading>
          <Heading size={4} caps lineHeight={1} textColor="accentBlue">
            January 14, 2020
          </Heading>
        </Slide>
        {/* <Slide bgColor="text">
          <Image src={images.formidagon} width={800} />
        </Slide>
        <Slide transition={["fade"]} bgColor="tertiary">
          <Heading size={6} textColor="dark" caps>
            Typography
          </Heading>
          <Heading size={1} textColor="text">
            Heading 1
          </Heading>
          <Heading size={2} textColor="text">
            Heading 2
          </Heading>
          <Heading size={3} textColor="text">
            Heading 3
          </Heading>
          <Heading size={4} textColor="text">
            Heading 4
          </Heading>
          <Heading size={5} textColor="text">
            Heading 5
          </Heading>
          <Text size={6} textColor="text">
            Standard text
          </Text>
        </Slide>
        <Slide transition={["fade"]} bgColor="dark" textColor="tertiary">
          <Heading size={6} textColor="text" caps>
            Standard List
          </Heading>
          <List>
            <ListItem bulletStyle="star">Item 1</ListItem>
            <ListItem bulletStyle="cross">Item 2</ListItem>
            <ListItem>Item 3</ListItem>
            <ListItem>Item 4</ListItem>
          </List>
        </Slide>
        <Slide transition={["fade"]} bgColor="text" textColor="dark">
          <BlockQuote>
            <Quote>Example Quote</Quote>
            <Cite margin="10px 0 0 30px">Author</Cite>
          </BlockQuote>
        </Slide>
        <Slide>
          <Image src={images.goodWork} width={500} />
          <Notes>gifs work too</Notes>
        </Slide> */}
      </Deck>
    );
  }
}
