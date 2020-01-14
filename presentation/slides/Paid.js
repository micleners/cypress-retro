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

export const Paid = () => (
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
);
