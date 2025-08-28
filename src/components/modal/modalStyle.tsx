import { motion } from "framer-motion";
import { device } from "style/media";
import styled from "styled-components";

export const Overlay = styled(motion.div)`
  z-index: 999;
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
  background-color: black;
  border-radius: 15px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(63, 66, 71, 0.3) 0px 8px 24px;

  @media ${device.tablet} {
    width: 80vw;
  }
  @media ${device.mobileM} {
    width: 80vw;
  }
  @media ${device.mobileS} {
    width: 90vw;
  }
`;

export const BigMovieWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 56.25%;
  overflow: hidden;
`;

export const BigCover = styled(motion.div)<{ $bgPhoto: string }>`
  /* width: 100%;
  height: 350px; */
  background-image: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)),
    url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center center;

  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
`;

export const VideoLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
`;

// export const BigMovieCover = styled.div`
//   background: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0));
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
// `;

export const Scrim = styled.div`
  position: absolute;
  inset: 0;
  z-index: 3;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0));
`;

export const DetailWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: -180px;
  z-index: 4;

  @media ${device.tablet} {
    bottom: -180px;
  }

  @media ${device.mobileM} {
    bottom: -170px;
  }

  @media ${device.mobileS} {
    bottom: -200px;
  }
`;

export const BigTitle = styled.h2`
  color: ${(props) => props.theme.white.lighter};
  font-size: 28px;
  font-weight: 400;
  position: absolute;
  top: 70px;
  /* bottom: 40%; */
  padding: 0 20px;

  @media ${device.mobileS} {
    font-size: 20px;
  }
`;

export const BigDetail = styled.div`
  width: 100%;
  height: 150px;
  position: absolute;
  top: 150px;
  /* bottom: 100px; */
  padding: 0 20px 20px 20px;
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

  @media ${device.mobileS} {
    top: 120px;
  }
`;

export const GenreWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  span {
    padding: 0px 10px;
    border-right: 1px solid white;

    &:last-child {
      border: none;
    }
  }
`;

export const ReleaseWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 5px;
  span {
    line-height: 1.3;
  }
`;

export const RunTimeWrapper = styled(ReleaseWrapper)``;

export const BigOverview = styled.p`
  color: ${(props) => props.theme.white.lighter};
  font-size: 16px;
  padding-top: 10px;
`;
