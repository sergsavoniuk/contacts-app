import React from "react";
import { withRouter } from "react-router-dom";

import authService from "../../api/auth";
import {
  Wrapper,
  Logo,
  HeaderTitle,
  Link,
  Logout,
  LogoutButton
} from "./Header.components";
import { useAuthContext } from "../Auth/";

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
        <LogoutButton
          imgUrl={`${process.env.PUBLIC_URL}/assets/logout.png`}
          onClick={handleLogout}
        />
      </Wrapper>
    )
  );
}

export default withRouter(Header);
