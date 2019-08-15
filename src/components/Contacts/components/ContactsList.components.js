import styled, { css } from "styled-components";

import { Input } from "components/shared/formControls.components";

export const Wrapper = styled.div`
  display: grid;
  max-width: 1200px;
  margin: 50px auto;
  padding: 30px;
  border: 1px solid #e2e2e2;

  @media (max-width: 1199px) {
    width: 95%;
  }
`;

export const Title = styled.h1`
  text-align: center;
`;

export const NewContact = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 10px;

  & > * {
    padding: 10px;
    background-color: #7dbf26;
    border-radius: 3px;
    font-size: 16px;
    line-height: 16px;
    text-decoration: none;
    color: #fff;

    &:hover {
      cursor: pointer;
      background: #6aa220;
    }
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 20px 0;
  justify-items: center;
  padding: 10px 0;
`;

export const ContactCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  min-height: 200px;
  padding: 10px;
  padding-top: 0;
  border: 1px solid #e2e2e2;
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 5px 0;
`;

export const Avatar = styled.img.attrs({
  src: `${process.env.PUBLIC_URL}/assets/contact_icon.png`,
  alt: "Contact Avatar"
})`
  width: 80px;
  height: 80px;
  margin: 0 auto;
`;

const iconSize = css`
  width: 24px;
  height: 24px;
`;

export const ContactIcon = css`
  ${iconSize};
  margin-right: 5px;
`;

export const NameIcon = styled.img.attrs({
  src: `${process.env.PUBLIC_URL}/assets/name_icon.png`,
  alt: "Name icon"
})`
  ${ContactIcon}
`;

export const PhoneIcon = styled.img.attrs({
  src: `${process.env.PUBLIC_URL}/assets/phone_icon.png`,
  alt: "Phone icon"
})`
  ${ContactIcon}
`;

export const EmailIcon = styled.img.attrs({
  src: `${process.env.PUBLIC_URL}/assets/email_icon.png`,
  alt: "Email icon"
})`
  ${ContactIcon}
`;

export const SkypeIcon = styled.img.attrs({
  src: `${process.env.PUBLIC_URL}/assets/skype_icon.png`,
  alt: "Skype icon"
})`
  ${ContactIcon}
`;

export const ActionButton = css`
  border: none;
  cursor: pointer;
  ${iconSize};
`;

export const EditButton = styled.button`
  background: url(${props => props.imgUrl}) no-repeat scroll 0 0;
  margin-right: 5px;
  ${ActionButton}
`;

export const RemoveButton = styled.button`
  background: url(${props => props.imgUrl}) no-repeat scroll 0 0;
  ${ActionButton}
`;

export const Text = styled.span``;

export const SearchInput = styled(Input)`
  background: url(${process.env.PUBLIC_URL}/assets/search_icon.png) no-repeat
    scroll 5px 5px;
  padding-left: 40px;
  width: 100%;

  @media (max-width: 320px) {
    width: 250px;
  }
`;

export const NotFound = styled.h3``;
