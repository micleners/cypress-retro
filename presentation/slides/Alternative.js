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

export const Alternative = () => (
  <Slide transition={["zoom"]} bgColor="dark">
    <H1Norm>What is Cypress an alternative to?</H1Norm>
    <br />
    <H2>Selenium based testing platforms and having to use TestBed 😩</H2>
    <br />
    <List style={{ marginLeft: 270 }} textColor="text">
      <ListItem>
        Protractor (
        <a href="https://techblog.fexcofts.com/2018/09/24/end-to-end-e2e-angular-testing-protractor-vs-cypress/">
          R1
        </a>
        ) (
        <a href="https://hackernoon.com/cypress-io-vs-protractor-e2e-testing-battle-d124ece91dc7">
          R2
        </a>
        ) (<a href="https://watirmelon.blog/category/automated-testing/">R3</a>)
      </ListItem>
      <ListItem>Shallow mounting with TestBed</ListItem>
    </List>
  </Slide>
);
