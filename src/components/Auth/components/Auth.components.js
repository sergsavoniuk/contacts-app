import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";

export const Link = styled(RouterLink)`
  color: #06c;
  text-decoration: none;

  &:hover {
    color: #09529a;
    text-decoration: underline;
  }
`;

// Social Links component

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const LinksContainer = styled.div`
  display: flex;
  width: 100%;
`;

export const Label = styled.p`
  color: #999;
  margin: 5px 0;
`;

export const AuthButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  color: #fff;
  width: 100%;
  height: 60px;
  cursor: pointer;
`;

export const GoogleButton = styled(AuthButton)`
  background-color: #db4437;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;

  &:hover {
    background-color: #ba3a2f;
  }
`;

export const FacebookButton = styled(AuthButton)`
  background-color: #3a5998;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;

  &:hover {
    background-color: #004d99;
  }
`;

export const GoogleIcon = styled.img.attrs({
  src: `${process.env.PUBLIC_URL}/assets/google_provider_icon.png`,
  alt: "Google Provider icon",
})``;

export const FacebookIcon = styled.img.attrs({
  src: `${process.env.PUBLIC_URL}/assets/facebook_provider_icon.png`,
  alt: "Facebook Provider icon",
})``;

export const HorizontalBreak = styled.div`
  width: 100%;
  border-top: 1px solid #e2e2e2;
  line-height: 1;
  margin: 15px 0;
`;
