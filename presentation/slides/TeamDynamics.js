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

export const TeamDynamics = () => (
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
);
