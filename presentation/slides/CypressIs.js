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

const images = {
  cypress: require("../../assets/cypress-bw.png").default
};

export const CypressIs = () => (
        <Slide transition={["zoom"]} bgColor="dark">
        <H1Norm>
          <FlexRowCenter>
            What is{" "}
            <img
              src={images.cypress}
              style={{ marginLeft: 40 }}
              width="400"
            />{" "}
            ?
          </FlexRowCenter>
        </H1Norm>
        <br />
        <H2>
          Fast, easy and reliable testing for anything that runs in a browser
          🌐
        </H2>
        <br />
        <List style={{ marginLeft: 200 }} textColor="text">
          <ListItem>Fast, easy and reliable E2E testing</ListItem>
          <ListItem>Batteries included</ListItem>
          <ListItem>Great docs and strong community</ListItem>
          <ListItem>Easy to install</ListItem>
          <ListItemIndent>
            Can setup TypeScript (
            <a href="https://github.com/bahmutov/add-typescript-to-cypress">
              R1
            </a>
            ) (
            <a href="https://medium.com/joolsoftware/unittesting-angular-components-with-cypress-202a38d9f81a">
              R2
            </a>
            )
          </ListItemIndent>
        </List>
      </Slide>
)