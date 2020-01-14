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

export const Cost = () => (
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
);
