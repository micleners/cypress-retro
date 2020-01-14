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

export const FreeFeatures = () => (
  <Slide transition={["zoom"]} bgColor="dark">
    <H1Norm>Writing + Running Tests</H1Norm>
    <br />
    <video controls autoPlay="autoplay">
      <source
        src="https://www.cypress.io/static/writing-tests-24ff41477f89dd27e36b03a00da9c5a3.webm"
        type="video/webm"
      />
    </video>
    <br />
    <Link href="https://www.cypress.io/features">Features</Link>
  </Slide>
);
