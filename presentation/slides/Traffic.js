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

export const Traffic = () => (
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
);
