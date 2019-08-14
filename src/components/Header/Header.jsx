import React from "react";
import { withRouter } from "react-router-dom";

import firebase from "../../firebase/firebase";

import authService from "api/auth";
import {
  Wrapper,
  Logo,
  HeaderTitle,
  Link,
  LogoutButton,
  Box,
  Username
} from "./Header.components";
import { useAuthContext } from "components/Auth";

export function Header(props) {
  const user = useAuthContext();

  const isAuthPage = ["/login", "/register"].includes(props.location.pathname);

  function handleLogout() {
    authService.logout();
    props.history.push("/login");
  }

  return (
    !isAuthPage && (
      <Wrapper>
        <Link to="/contacts">
          <Logo />
          <HeaderTitle>Contacts Keeper</HeaderTitle>
        </Link>
        <Box>
          <Username>
            {user.name ||
              (firebase.auth.currentUser &&
                firebase.auth.currentUser.displayName)}
          </Username>
          <LogoutButton
            imgUrl={`${process.env.PUBLIC_URL}/assets/logout_icon.png`}
            onClick={handleLogout}
          />
        </Box>
      </Wrapper>
    )
  );
}

export default withRouter(Header);
