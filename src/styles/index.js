import { createGlobalStyle } from "styled-components";
import normalize from "styled-normalize";

export const theme = {
    mainColor: "#333335",
    secondaryColor: "#ec6707",
    sectionColorLight: "#f8f8f8",
    sectionColorDark: "#e8e8e8",

    contentWidth: "65rem",
  };
  
export const GlobalStyle = createGlobalStyle`
    body {
      background-color: ${theme.sectionColorLight}
    }
  `;