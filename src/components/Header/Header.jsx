import React, { useMemo, memo } from "react";
import { withRouter } from "react-router-dom";

import firebase from "../../firebase/firebase";
import authService from "api/auth";
import ROUTES from "constants/routes";
import {
  Wrapper,
  Logo,
  HeaderTitle,
  Link,
  LogoutButton,
  Box,
  Username,
} from "./Header.components";
import { useAuthContext } from "components/Auth";
import { routerPropTypes } from "utils/routerPropTypes";

export function Header(props) {
  const user = useAuthContext();

  const isAuthPage = useMemo(
    () =>
      [ROUTES.Root, ROUTES.Login, ROUTES.Register].includes(
        props.location.pathname
      ),
    [props.location.pathname]
  );

  async function handleLogout() {
    await authService.logout();
    props.history.push(ROUTES.Login);
  }

  return (
    !isAuthPage && (
      <Wrapper>
        <Link to={ROUTES.ContactsList}>
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
            data-testid="logout"
            imgUrl={`${process.env.PUBLIC_URL}/assets/logout_icon.png`}
            onClick={handleLogout}
          />
        </Box>
      </Wrapper>
    )
  );
}

Header.propTypes = routerPropTypes;

const LoginRoutes = [ROUTES.Root, ROUTES.Login, ROUTES.Register];

function areEqual(prevProps, nextProps) {
  const prevPathname = prevProps.location.pathname;
  const nextPathname = nextProps.location.pathname;
  return !(
    (!LoginRoutes.includes(prevPathname) &&
      LoginRoutes.includes(nextPathname)) ||
    (LoginRoutes.includes(prevPathname) && !LoginRoutes.includes(nextPathname))
  );
}

export default withRouter(memo(Header, areEqual));
