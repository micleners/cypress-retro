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

export const DashboardFeatures = () => (
  <Slide transition={["zoom"]} bgColor="dark">
    <H1Norm>Cypress Test Runner</H1Norm>
    <br />
    <video controls autoPlay="autoplay">
      <source
        src="https://www.cypress.io/static/dashboard-565afdee6fc0c84a8d84e858dc1c7061.webm"
        type="video/webm"
      />
    </video>
    <br />
    <Link href="https://www.cypress.io/features">Features</Link>
  </Slide>
);
