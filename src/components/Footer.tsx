import styled from "styled-components";

const Container = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  padding: 20px 0;
`;

const Title = styled.p`
  color: ${(props) => props.theme.white.lighter};
  font-weight: 400;
`;

const LinkTo = styled.a`
  span {
    font-size: 25px;
  }
`;

const Div = styled.div`
  p {
    font-size: 14px;
    color: ${(props) => props.theme.white.darker};
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
      <Title>
        <span>&copy;{year} Newflix</span>
      </Title>
      <Div>
        <p>본 프로젝트는 학습용 데모이며 Netflix와 무관합니다.</p>
        <p>
          This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </p>
      </Div>
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
