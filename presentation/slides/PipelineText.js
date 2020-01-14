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

export const PipelineText = () => (
  <Slide transition={["zoom"]} bgColor="dark">
    <H1Norm>Integrating into CI/CD</H1Norm>
    <br />
    <H2>AUTO is a gate to stage ↺</H2>
    <br />
    <List style={{ marginLeft: 0 }} textColor="text">
      <ListItem>Build passes pending integration tests:</ListItem>
      <ListItemIndent>
        Frontend (Jest) and API (MSTest) unit tests
      </ListItemIndent>
      <ListItemIndent>SpecFlow API acceptance tests</ListItemIndent>
      <ListItem>Build deploys to DEV and AUTO concurrently</ListItem>
      <ListItem>AUTO runs Cypress against itself</ListItem>
      <ListItem>AUTO deploy fails if any Cypress tests fail</ListItem>
      <ListItem>
        Screenshots and Videos saved to{" "}
        <a href="https://vs-pioneer.visualstudio.com/project0/_build/results?buildId=175461&view=artifacts&type=publishedArtifacts">
          build artifact
        </a>
      </ListItem>
      <ListItem>We don't go to STAGE unless AUTO is green</ListItem>
    </List>
  </Slide>
);
