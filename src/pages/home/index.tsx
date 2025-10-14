import requests from "api/requests";
import Banner from "components/Banner";
import Row from "components/row/Row";
import { device } from "style/media";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.black};
  /* height: 100%; */
  position: relative;
  overflow-x: hidden;
`;

const SlideWrapper = styled.div`
  position: relative;
  bottom: 100px;
  left: 0;

  @media ${device.tablet} {
    top: 0;
    bottom: 0;
  }
  @media ${device.mobileS} {
    bottom: 50px;
    padding: 0 20px;
  }
`;

export default function Home() {
  return (
    <>
      <title>NEWFLIX | Movie</title>
      <Wrapper>
        <Banner
          queryName="movie"
          queryId="nowPlaying"
          queryUrl={requests.getNowPlayingMovies}
        />
        <SlideWrapper>
          <Row
            title="Trending Movies"
            queryName="movie"
            queryId="trending"
            queryUrl={requests.getTrendingMovies}
          />
          <Row
            title="Popular Movies"
            queryName="movie"
            queryId="popular"
            queryUrl={requests.getPopularMovies}
          />
          <Row
            title="Upcomig Movies"
            queryName="movie"
            queryId="upcoming"
            queryUrl={requests.getUpcomingMovies}
          />
          <Row
            title="Top Rated Movies"
            queryName="movie"
            queryId="topRated"
            queryUrl={requests.getTopRatedMovies}
          />
        </SlideWrapper>
      </Wrapper>
    </>
  );
}
