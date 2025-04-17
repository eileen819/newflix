import { motion } from "framer-motion";
import styled from "styled-components";

export const Overlay = styled(motion.div)`
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 0;
`;

export const BigMovie = styled(motion.div)`
  z-index: 999;
  position: fixed;
  width: 60vw;
  height: 75vh;
  inset: 0;
  margin: auto;
  background-color: ${(props) => props.theme.black.darker};
  border-radius: 15px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const BigCover = styled(motion.div)<{ $bgPhoto: string }>`
  width: 100%;
  height: 350px;
  background-image: linear-gradient(
      transparent 50%,
      ${(props) => props.theme.black.darker}
    ),
    url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center center;
`;

export const BigTitle = styled.h2`
  color: ${(props) => props.theme.white.lighter};
  font-size: 28px;
  font-weight: 400;
  position: absolute;
  bottom: 30%;
  padding: 0 20px;
`;

export const BigDetail = styled.div`
  width: 100%;
  height: 150px;
  position: absolute;
  top: 70%;
  padding: 0 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 5px;

  &::-webkit-scrollbar {
    background-color: transparent;
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #c80000;
    border-radius: 10px;
  }
`;

export const GenreWrapper = styled.div`
  span {
    padding: 0px 10px;
    border-right: 1px solid white;

    &:last-child {
      border: none;
    }
  }
`;

export const BigOverview = styled.p`
  color: ${(props) => props.theme.white.lighter};
  font-size: 16px;
`;
