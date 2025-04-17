import { motion } from "framer-motion";
import styled from "styled-components";

export const Card = styled(motion.div)`
  height: 150px;
  cursor: pointer;
`;

export const CardImg = styled(motion.div)<{ $bgPhoto: string }>`
  background-image: url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center;
  height: 150px;
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
