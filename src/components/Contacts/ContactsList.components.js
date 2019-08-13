import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  max-width: 1200px;
  margin: 0 auto;
`;

export const NewContact = styled.button`
  width: 100%;
  background: #7dbf26;
  margin-bottom: 10px;
  font-size: 16px;
  line-height: 16px;
  height: 48px;
  border: none;
  border-radius: 3px;
  color: #fff;

  &:hover {
    cursor: pointer;
    background: #6aa220;
  }

  &:disabled {
    cursor: not-allowed;
    background: #6aa220;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 20px;
  padding: 10px;
`;

export const ContactCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  min-height: 200px;
  padding: 10px;
  padding-top: 0;
  border: 1px solid black;
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
