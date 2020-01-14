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

export const WhoUses = () => (
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
);
