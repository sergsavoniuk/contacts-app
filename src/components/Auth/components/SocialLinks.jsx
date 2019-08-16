import React from 'react';
import { func } from 'prop-types';

import PROVIDERS from 'constants/providers';
import {
  Wrapper,
  LinksContainer,
  Label,
  GoogleButton,
  FacebookButton,
  HorizontalBreak,
  GoogleIcon,
  FacebookIcon
} from './Auth.components';

function SocialLinks({ onSignIn }) {
  function handleSignIn(event) {
    const providerName = event.target.name || event.target.parentNode.name;
    onSignIn(providerName);
  }

  return (
    <Wrapper>
      <Label>Through social networks</Label>
      <LinksContainer>
        <GoogleButton name={PROVIDERS.Google} onClick={handleSignIn}>
          <GoogleIcon />
        </GoogleButton>
        <FacebookButton name={PROVIDERS.Facebook} onClick={handleSignIn}>
          <FacebookIcon />
        </FacebookButton>
      </LinksContainer>
      <HorizontalBreak />
    </Wrapper>
  );
}

SocialLinks.propTypes = {
  onSignIn: func.isRequired
};

export default SocialLinks;
