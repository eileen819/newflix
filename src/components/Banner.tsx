import { useQuery } from "@tanstack/react-query";
import { getMovies } from "api/api";
import { IGetResults } from "api/interfaceData";
import styled from "styled-components";
import { makeImagePath } from "utils/utils";

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
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 48px;
  font-weight: 500;
  margin-bottom: 10px;
`;

const Overview = styled.p`
  font-size: 18px;
  width: 50%;
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
        <Loader>Loading...</Loader>
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
