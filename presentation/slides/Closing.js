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
  sai: require("../../assets/sai.png").default,
  dsmjs: require("../../assets/dsmjs.png").default,
  twitter: require("../../assets/twitter.png").default
};

export const Closing = () => (
  <Slide transition={["zoom"]} bgColor="dark">
    <H1Norm>Questions or Comments?</H1Norm>
    <List style={{ marginLeft: "200" }} textColor="text">
      <br />
      <br />
      <Heading size={5} lineHeight={1} textColor="text">
        This Presentation: cypress-retro.micleners.com
      </Heading>
      <br />

      <Heading size={5} lineHeight={1} textColor="text">
        Article: github.com/micleners/cypress-retro
      </Heading>
      <br />

      <Heading size={5} lineHeight={1} textColor="text">
        Demo Repo: github.com/micleners/cypress-cotd
      </Heading>
    </List>

    <br />
    <br />
    <br />

    <FlexRowCenter>
      <div>
        <Heading size={4} caps lineHeight={1} textColor="text">
          Michael Leners
        </Heading>
        <Heading size={6} lineHeight={1} textColor="darkText">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end"
            }}
          >
            <img
              src={images.twitter}
              style={{ marginRight: 15 }}
              width="50px"
            />{" "}
            @micLeners
          </div>
        </Heading>
      </div>
      <Image src={images.dsmjs} style={{ margin: "0 45px" }} width="100px" />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start"
        }}
      >
        <Heading
          size={6}
          lineHeight={0.3}
          style={{ margin: "20px 0 0 0" }}
          textColor="darkText"
        >
          Hosted by
        </Heading>
        <img src={images.sai} width="500px" />
      </div>
    </FlexRowCenter>
  </Slide>
);
