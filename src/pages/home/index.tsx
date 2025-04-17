import requests from "api/requests";
import Banner from "components/Banner";
import Modal from "components/modal/Modal";
import Row from "components/row/Row";
import { AnimatePresence } from "framer-motion";
import { useMatch } from "react-router-dom";
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
`;

export default function Home() {
  return (
    <Wrapper>
      <Banner
        queryName="movies"
        queryId="nowPlaying"
        queryUrl={requests.getNowPlayingMovies}
      />
      <SlideWrapper>
        <Row
          title="Trending Movies"
          queryName="movies"
          queryId="trending"
          queryUrl={requests.getTrendingMovies}
        />
        <Row
          title="Popular Movies"
          queryName="movies"
          queryId="popular"
          queryUrl={requests.getPopularMovies}
        />
        <Row
          title="Upcomig Movies"
          queryName="movies"
          queryId="upcoming"
          queryUrl={requests.getUpcomingMovies}
        />
        <Row
          title="Top Rated Movies"
          queryName="movies"
          queryId="topRated"
          queryUrl={requests.getTopRatedMovies}
        />
      </SlideWrapper>
    </Wrapper>
  );
}
