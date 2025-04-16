import { motion } from "framer-motion";
import styled from "styled-components";

export const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  font-size: 14px;
  color: white;
  padding: 20px 60px;
  z-index: 10;
`;

export const Col = styled.div`
  display: flex;
  align-items: center;
`;

export const Logo = styled(motion.svg)`
  margin-right: 50px;
  width: 95px;
  height: 25px;
  fill: ${(props) => props.theme.red};
  path {
    stroke: white;
    stroke-width: 6px;
  }
`;

export const Items = styled.ul`
  display: flex;
  align-items: center;
`;

export const Item = styled.li`
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-right: 20px;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

export const MenuTitle = styled.span`
  font-weight: 500;
  opacity: 0.7;
  transition: opacity 0.3s ease-in-out;
  &:hover {
    opacity: 1;
  }
`;

export const Circle = styled(motion.div)`
  width: 5px;
  height: 5px;
  border-radius: 2.5px;
  background-color: ${(props) => props.theme.red};
  position: absolute;
  left: 0;
  right: 0;
  bottom: -5px;
  margin: 0 auto;
`;
