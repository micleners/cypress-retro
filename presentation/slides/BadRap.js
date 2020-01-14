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

export const BadRap = () => (<Slide transition={["zoom"]} bgColor="dark">
<H1Norm>Bad Rap for E2E Testing</H1Norm>
<br />
<H2>Flakiness and frustration 😫</H2>
<br />
<List style={{ marginLeft: 75 }} textColor="text">
  <ListItem>Waiting on API calls/flaky API calls</ListItem>
  <ListItem>Waiting DOM changes and load time</ListItem>
  <ListItem>Inconsistent browser renders from run to run</ListItem>
  <ListItem>Error catching and handling</ListItem>
</List>
<H2>Cypress has solutions baked in 😎</H2>
</Slide>)