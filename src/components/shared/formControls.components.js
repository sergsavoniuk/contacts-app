import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const FormWrapper = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  margin: 100px auto;
  padding: 20px 40px;
  border: 1px solid #e2e2e2;
  border-radius: 5px;

  @media (max-width: 424px) {
    width: 300px;
    padding: 20px 10px;
  }
`;

export const Title = styled.h2`
  font-weight: 700;
  font-size: 36px;
  margin: 20px 0;
`;

export const Input = styled.input`
  width: 100%;
  margin-bottom: 10px;
  padding: 0 9px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  font-size: 15px;
  line-height: 15px;
  height: 40px;
  outline: none;

  &:focus {
    border: 1px solid rgba(51, 51, 51, 0.7);
  }

  ${props =>
    props.error &&
    css`
      border: 1px solid #fd1000;
      background-color: #ffe7e6;
    `}
`;

export const SubmitButton = styled.button`
  width: 100%;
  background: #7dbf26;
  margin-bottom: 10px;
  font-size: 16px;
  line-height: 16px;
  height: 48px;
  border: none;
  border-radius: 3px;
  color: #fff;
  outline: none;

  &:hover {
    cursor: pointer;
    background: #6aa220;
  }

  &:disabled {
    cursor: not-allowed;
    background: #6aa220;
  }
`;

export const StyledLink = styled(Link)`
  color: #06c;
  text-decoration: none;

  &:hover {
    color: #09529a;
    text-decoration: underline;
  }
`;

export const Error = styled.span`
  display: inline-block;
  color: #d01c10;
  padding-bottom: 10px;
`;

export const ErrorAlert = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  color: #d01c10;
  background-color: #ffe7e6;
`;
