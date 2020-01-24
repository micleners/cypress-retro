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

export const Title = () => (
  <Slide transition={["zoom"]} bgColor="dark">
    <H1Norm>
      <span style={{ color: themeColors.yellow }}>Cypress</span> for E2E
      Testing:
    </H1Norm>
    <Heading size={3} lineHeight={1.1} textColor="text">
      A Retrospective
    </Heading>
    <br />
    <br />
    <br />
    <Text caps lineHeight={1} textColor="lightText">
      The Hedgehogs
    </Text>
    <Text style={{ marginLeft: "100" }} lineHeight={1.1} textColor="lightText">
      DL-TheHedgeHogs@corteva.com
    </Text>
    <FlexRowCenter>
      <div>
        <Heading size={4} caps lineHeight={1} textColor="lightText">
          Dan Rocha
        </Heading>
        <Heading size={6} lineHeight={1} textColor="lightText">
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
            dan.rocha@corteva.com
          </div>
        </Heading>
      </div>
      {/* <Image src={images.dsmjs} style={{ margin: "0 45px" }} width="100px" /> */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start"
        }}
      >
        <Heading size={4} caps lineHeight={1} textColor="lightText">
          Michael Leners
        </Heading>
        <Heading size={6} lineHeight={1} textColor="lightText">
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
            michael.leners@corteva.com
          </div>
        </Heading>
      </div>
    </FlexRowCenter>
    <br />
    <br />
    <br />
    <Heading size={5} caps lineHeight={1} textColor="text">
      January 14, 2020
    </Heading>
  </Slide>
);
