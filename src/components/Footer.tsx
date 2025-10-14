import styled from "styled-components";

const Container = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  padding: 20px 0;
`;

const Copyright = styled.p`
  color: ${(props) => props.theme.white.lighter};
`;

const LinkTo = styled.a`
  span {
    font-size: 25px;
  }
`;

const Icon = styled.img`
  width: 25px;
  height: 25px;
`;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <Container>
      <Copyright>&copy;{year} Eileen. All rights reserved.</Copyright>
      <LinkTo
        href="https://github.com/eileen819"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon src="/github-mark-white.png" alt="GitHub" />
      </LinkTo>
      <LinkTo href="mailto:eileen.ju.8819@gmail.com">
        <span>✉️</span>
      </LinkTo>
    </Container>
  );
}
