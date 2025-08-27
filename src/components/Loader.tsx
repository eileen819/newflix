import styled, { keyframes } from "styled-components";

const rotationAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Loader = styled.div`
  width: 48px;
  height: 48px;
  border: 6px solid #a30202;
  border-bottom-color: transparent;
  border-radius: 50%;
  animation: ${rotationAnimation} 1s linear infinite;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 3;
`;
