import React from "react";

import {
  Wrapper,
  LinksContainer,
  Label,
  GoogleButton,
  FacebookButton,
  HorizontalBreak,
  GoogleIcon,
  FacebookIcon
} from "./Auth.components";

function SocialLinks({ onSignIn }) {
  function handleSignIn(event) {
    const providerName = event.target.name || event.target.parentNode.name;
    onSignIn(providerName);
  }

  return (
    <Wrapper>
      <Label>Through social networks</Label>
      <LinksContainer>
        <GoogleButton name="google" onClick={handleSignIn}>
          <GoogleIcon />
        </GoogleButton>
        <FacebookButton name="facebook" onClick={handleSignIn}>
          <FacebookIcon />
        </FacebookButton>
      </LinksContainer>
      <HorizontalBreak />
    </Wrapper>
  );
}

export default SocialLinks;
