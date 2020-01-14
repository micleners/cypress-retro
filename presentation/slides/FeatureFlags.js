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

export const FeatureFlags = () => (
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
);
