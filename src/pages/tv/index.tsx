import requests from "api/requests";
import Banner from "components/Banner";
import Row from "components/row/Row";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.black};
  position: relative;
  overflow-x: hidden;
`;

const SlideWrapper = styled.div`
  position: relative;
  bottom: 100px;
  left: 0;
`;

export default function TvPage() {
  return (
    <Wrapper>
      <Banner
        queryName="tv"
        queryId="airingToday"
        queryUrl={requests.getAiringTodayTv}
      />
      <SlideWrapper>
        <Row
          title="On The Air"
          queryName="tv"
          queryId="onTheAir"
          queryUrl={requests.getOnTheAirTv}
        />
        <Row
          title="Trending TV shows"
          queryName="tv"
          queryId="trending"
          queryUrl={requests.getTrendingTv}
        />
        <Row
          title="Top rated TV shows"
          queryName="tv"
          queryId="topRated"
          queryUrl={requests.gettopRatedTv}
        />
        <Row
          title="Popular TV shows"
          queryName="tv"
          queryId="popular"
          queryUrl={requests.getPopularTv}
        />
      </SlideWrapper>
    </Wrapper>
  );
}
