import { motion } from "framer-motion";
import styled from "styled-components";

export const Card = styled(motion.div)`
  height: 150px;
  cursor: pointer;
  /* position: relative; */
`;

interface ICardImgProps {
  $bgPhoto: string | null;
  $bgTitle: string;
}

export const CardImg = styled(motion.div)<ICardImgProps>`
  background: ${(props) =>
    props.$bgPhoto ? `url(${props.$bgPhoto})` : "#800000"};
  background-size: cover;
  background-position: center;
  height: 150px;
  overflow: hidden;

  &::before {
    content: "${(props) => props.$bgTitle}";
    display: block;
    font-size: 18px;
    font-weight: 400;
    padding: 20px;
  }
`;

export const Info = styled(motion.div)<{ $isHovered: boolean }>`
  width: 100%;
  background-color: ${(props) => props.theme.black.lighter};
  padding: 10px;
  opacity: 0;
  pointer-events: ${(props) => (props.$isHovered ? "auto" : "none")};
  h4 {
    text-align: center;
    font-size: 12px;
    font-weight: 500;
  }
`;
