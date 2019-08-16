import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import Header from './components/Header';
import Routes from './components/routes';
import { AuthProvider } from './components/Auth';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Barlow+Semi+Condensed&display=swap');

  * {
    box-sizing: border-box;
  }

  html,
  body {
    max-width: 100%;
    margin: 0;
    padding: 0;
    background-color: #fff;
    font-family: 'Barlow Semi Condensed', sans-serif;
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
