import { createGlobalStyle, css } from "styled-components";
import palette from "./palette";

const globalStyle = css`
  * {
    box-sizing: border-box;
    font-family: "Roboto", "Noto Sans KR", sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  *,
  body {
    font-family: "Roboto", "Noto Sans KR", sans-serif;
  }

  body {
    background-color: ${palette.black};
  }
  a {
    text-decoration: none;
    color: inherit;

    &:visited {
      color: inherit;
    }
  }

  li {
    list-style: none;
  }
`;

const GlobalStyle = createGlobalStyle`
    ${globalStyle};
    
`;

export default GlobalStyle;
