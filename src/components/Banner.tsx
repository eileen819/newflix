import { useQuery } from "@tanstack/react-query";
import { getMovies } from "api/api";
import { IGetResults } from "api/interfaceData";
import styled from "styled-components";
import { makeImagePath } from "utils/utils";
import { Loader } from "./Loader";
import { device } from "style/media";

// styled-components
const Wrapper = styled.div<{ $bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 1)),
    url(${(props) => props.$bgPhoto});
  background-size: cover;

  @media ${device.tablet} {
    width: 100vw;
    height: 70vh;
    /* justify-content: flex-end; */
  }

  @media ${device.mobileM} {
    width: 100vw;
    height: 70vh;
    padding: 20px 40px;
    background-position: center center;
    background-repeat: no-repeat;
    justify-content: flex-end;
  }

  @media ${device.mobileS} {
    width: 100vw;
    height: 60vh;
    background-position: center;
    background-repeat: no-repeat;
    padding: 20px;
    justify-content: center;
  }
`;

const Title = styled.h2`
  font-size: 48px;
  font-weight: 500;
  margin-bottom: 10px;

  @media ${device.tablet} {
    font-size: 35px;
  }

  @media ${device.mobileM} {
    font-size: 20px;
  }

  @media ${device.mobileS} {
    /* display: none; */
    font-size: 20px;
    margin-left: 10px;
  }
`;

const Overview = styled.p`
  font-size: 18px;
  width: 50%;

  @media ${device.mobileM} {
    font-size: 14px;
    margin-bottom: 100px;
  }

  @media ${device.mobileS} {
    display: none;
  }
`;

// interface
interface IBannerProps {
  queryName: string;
  queryId: string;
  queryUrl: string;
}

// function
function Banner({ queryName, queryId, queryUrl }: IBannerProps) {
  const { isLoading, data } = useQuery<IGetResults>({
    queryKey: [queryName, queryId],
    queryFn: () => getMovies(queryUrl),
  });

  const randomBannerIndex = Math.floor(
    Math.random() * (data?.results.length || 0)
  );

  const randomMovies = data?.results[randomBannerIndex];

  return (
    <Wrapper $bgPhoto={makeImagePath(randomMovies?.backdrop_path || "")}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Title>{randomMovies?.title || randomMovies?.name}</Title>
          <Overview>
            {randomMovies?.overview?.length || 0 > 180
              ? randomMovies?.overview.slice(0, 180) + "..."
              : randomMovies?.overview}
          </Overview>
        </>
      )}
    </Wrapper>
  );
}

export default Banner;
