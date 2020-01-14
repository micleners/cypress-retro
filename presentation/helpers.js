// Import React
import React from "react";
import styled from "styled-components";
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

export const themeColors = {
  dark: "#1C1B21",
  text: "#BBBBBB",
  lightText: "#EAEAEA",
  darkText: "#3D4554",
  green: "#26D9D2",
  red: "#EF5350",
  aqua: "#24c4b7",
  yellow: "#fded07",
  purple: "#663399"
};

export const H1Norm = ({ children }) => (
  <Heading size={2} lineHeight={1.1} textColor="text">
    {children}
  </Heading>
);

export const H1Col1 = styled(H1Norm)`
  color: ${themeColors.yellow};
`;

export const H2 = ({ children }) => (
  <Heading size={4} lineHeight={1.1} textColor="lightText">
    {children}
  </Heading>
);

export const FlexRowCenter = ({ children }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    {children}
  </div>
);

export const ListItemIndent = ({ children }) => (
  <ListItem style={{ marginLeft: 80 }}>{children}</ListItem>
);
