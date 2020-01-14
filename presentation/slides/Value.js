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

export const Value = () => (
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
);
