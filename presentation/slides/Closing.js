import React from "react";
import {
  themeColors,
  H1Norm,
  H1Col1,
  H2,
  FlexRowCenter,
  ListItemIndent
} from "../helpers";
import "../styles.css";
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

const images = {
  sai: require("../../assets/sai.png").default,
  dsmjs: require("../../assets/dsmjs.png").default,
  twitter: require("../../assets/twitter.png").default
};

export const Closing = () => (
  <Slide transition={["zoom"]} bgColor="dark">
    <H1Norm>Questions or Comments?</H1Norm>
    <List style={{ marginLeft: "200" }} textColor="text">
      <ListItem caps lineHeight={1} textColor="lightText">
        The Hedgehogs
      </ListItem>
      <Text
        style={{ marginLeft: "100" }}
        lineHeight={1.1}
        textColor="lightText"
      >
        DL-TheHedgeHogs@corteva.com
      </Text>
      <br />
      <ListItem caps lineHeight={1} textColor="lightText">
        Dan Rocha
      </ListItem>
      <Text
        style={{ marginLeft: "100" }}
        lineHeight={1.1}
        textColor="lightText"
      >
        dan.rocha@corteva.com
      </Text>
      <br />
      <ListItem caps lineHeight={1} textColor="lightText">
        Michael Leners
      </ListItem>
      <Text
        style={{ marginLeft: "100" }}
        lineHeight={1.1}
        textColor="lightText"
      >
        michael.leners@corteva.com
      </Text>
      <br />

      <Text
        lineHeight={1.1}
        textColor="lightText"
      >
        cypress-review.micleners.com
      </Text>
      <Text lineHeight={1.1} textColor="lightText">
        github.com/micleners/cypress-review
      </Text>
    </List>
  </Slide>
);
