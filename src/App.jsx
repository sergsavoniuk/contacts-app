import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import Header from "./components/Header";
import { AuthProvider } from "./components/Auth";
import routes from "./components/routes";
import ProtectedRoute from "./components/routes/ProtectedRoute";

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
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/login" />} />
            {routes.map(({ component, key, protectedRoute, ...rest }) =>
              protectedRoute ? (
                <ProtectedRoute key={key} component={component} {...rest} />
              ) : (
                <Route key={key} component={component} {...rest} />
              )
            )}
          </Switch>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
