import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import Header from "./components/Header";
import Routes from "./components/routes";
import { AuthProvider } from "./components/Auth";

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    max-width: 100%;
    margin: 0;
    padding: 0;
    background-color: #fff;
    font-family: IBM Plex Mono, Space Grotesk, Roboto Slab, sans-serif;
    font-size: 16px;
  }
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <AuthProvider>
        <Router>
          <Header />
          <Routes />
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
