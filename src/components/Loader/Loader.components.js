import styled, { keyframes } from "styled-components";

const circleBounceDelay = keyframes`
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
`;

export const Wrapper = styled.div`
  position: relative;
  width: ${({ size }) => (size ? `${size}px` : "60px")};
  height: ${({ size }) => (size ? `${size}px` : "60px")};
  margin: ${({ alignment }) => alignment || "100px auto"};
  div:nth-child(2) {
    transform: rotate(30deg);
  }
  div:nth-child(3) {
    transform: rotate(60deg);
  }
  div:nth-child(4) {
    transform: rotate(90deg);
  }
  div:nth-child(5) {
    transform: rotate(120deg);
  }
  div:nth-child(6) {
    transform: rotate(150deg);
  }
  div:nth-child(7) {
    transform: rotate(180deg);
  }
  div:nth-child(8) {
    transform: rotate(210deg);
  }
  div:nth-child(9) {
    transform: rotate(240deg);
  }
  div:nth-child(10) {
    transform: rotate(270deg);
  }
  div:nth-child(11) {
    transform: rotate(300deg);
  }
  div:nth-child(12) {
    transform: rotate(330deg);
  }
  div:nth-child(2):before {
    animation-delay: -1.1s;
  }
  div:nth-child(3):before {
    animation-delay: -1s;
  }
  div:nth-child(4):before {
    animation-delay: -0.9s;
  }
  div:nth-child(5):before {
    animation-delay: -0.8;
  }
  div:nth-child(6):before {
    animation-delay: -0.7s;
  }
  div:nth-child(7):before {
    animation-delay: -0.6s;
  }
  div:nth-child(8):before {
    animation-delay: -0.5s;
  }
  div:nth-child(9):before {
    animation-delay: -0.4s;
  }
  div:nth-child(10):before {
    animation-delay: -0.3s;
  }
  div:nth-child(11):before {
    animation-delay: -0.2s;
  }
  div:nth-child(12):before {
    animation-delay: -0.1s;
  }
`;

export const Child = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  :before {
    content: "";
    display: block;
    margin: 0 auto;
    width: 15%;
    height: 15%;
    background-color: ${({ color }) => color || "#e1e1e1"};
    border-radius: 100%;
    animation: ${circleBounceDelay} 1.2s infinite ease-in-out both;
  }
`;
