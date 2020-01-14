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
  pipeline: require("../../assets/pipeline.png").default
};

export const PipelineImage = () => (
  <Slide transition={["zoom"]} bgColor="dark">
    <H1Norm>Release Pipeline Flow</H1Norm>
    <br />
    <H2>AUTO is a gate to stage ↺</H2>
    <br />
    <Image src={images.pipeline} />
  </Slide>
);
