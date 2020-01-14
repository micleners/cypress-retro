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

export const Auth = () => (
  <Slide transition={["zoom"]} bgColor="dark">
    <H1Norm>Auth Integration</H1Norm>
    <br />
    <H2>It is a necessary evil 🤷‍♀️</H2>
    <br />
    <List style={{ marginLeft: 100 }} textColor="text">
      <ListItem>Our Stack: Azure AD, SSO, EasyAuth, ADAL</ListItem>
      <ListItem>Must have token to access GUI</ListItem>
      <ListItem>Must have valid token to access API</ListItem>
      <ListItem>EasyAuth == barrier around deployed API</ListItem>
      <ListItem>Using Cypress request we:</ListItem>
      <ListItemIndent>Call to SSO for token</ListItemIndent>
      <ListItemIndent>Use desired service account auth level</ListItemIndent>
      <ListItemIndent>Save token in place ADAL is expecting it</ListItemIndent>
    </List>
  </Slide>
);
