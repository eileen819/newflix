import { motion } from "framer-motion";
import { device } from "style/media";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";

export const Wrapper = styled.div`
  width: 95%;
  margin: 0 auto;
  margin-bottom: 30px;
  position: relative;
`;

export const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 10px;

  @media ${device.mobileS} {
    font-size: 18px;
  }
`;

export const StyledSwiper = styled(Swiper)`
  overflow: visible;
`;

export const StyledSwiperSlide = styled(SwiperSlide)`
  position: static;
`;

export const NavBtn = styled(motion.div)<{ $position: string }>`
  z-index: 1;
  font-size: 25px;
  border: 1px solid ${(props) => props.theme.white.darker};
  background-color: rgba(0, 0, 0, 0.5);
  width: 20px;
  height: 20px;
  padding: 15px;
  margin: 0 10px;
  border-radius: 50%;
  position: absolute;
  top: 0;
  ${(props) => (props.$position === "prev" ? "left: 0;" : "right: 0;")}
  transform: translateY(90px);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, opacity 0.3s ease-in-out;
  opacity: 0;
  &:hover {
    opacity: 1;
    background-color: ${(props) => props.theme.black.lighter};
  }
`;
