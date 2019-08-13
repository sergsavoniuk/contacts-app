import styled, { css } from "styled-components";
import { Link as RouterLink } from "react-router-dom";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-height: 50px;
  padding: 0 10px;
  background: #000;
  color: #fff;
`;

const imgSize = css`
  width: 48px;
  height: 48px;
`;

export const Logo = styled.img.attrs({
  src: `${process.env.PUBLIC_URL}/assets/contacts_logo.png`,
  alt: "Application Logo"
})`
  ${imgSize}
  margin-right: 10px;
`;

export const LogoutButton = styled.button`
  background: url(${props => props.imgUrl}) no-repeat scroll 0 0 transparent;
  border: none;
  ${imgSize}
  margin: 10px 0;
  cursor: pointer;
`;

export const HeaderTitle = styled.h2``;

export const Link = styled(RouterLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #fff;

  &:hover {
    color: #61dafb;
    cursor: pointer;
  }
`;
