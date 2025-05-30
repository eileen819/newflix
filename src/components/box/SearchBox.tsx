import styled from "styled-components";
import Box from "./Box";
import { Loader } from "components/Loader";
import { ISearchResultProps } from "pages/search";
import { InfiniteData } from "@tanstack/react-query";
import { device } from "style/media";

const SearchWrapper = styled.div`
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-weight: 500;
  font-size: 28px;
  margin-bottom: 20px;
  align-self: flex-start;
`;

const BoxWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;

  @media ${device.tablet} {
    grid-template-columns: repeat(5, 1fr);
  }

  @media ${device.mobileM} {
    grid-template-columns: repeat(4, 1fr);
  }

  @media ${device.mobileS} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const MorePageBtn = styled.button`
  width: 100px;
  height: 40px;
  border: 1px solid #b00101;
  outline: none;
  border-radius: 30px;
  background-color: #262626;
  color: white;
  margin-top: 20px;
  cursor: pointer;
  align-self: center;

  &:hover,
  &:focus {
    background-color: #141414;
  }
`;

interface ISearchBoxProps {
  title: string;
  searchData: InfiniteData<ISearchResultProps>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  handleBoxClick: (media: string, id: number) => void;
  mediaType: "movie" | "tv";
}

export default function SearchBox({
  title,
  searchData,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  handleBoxClick,
  mediaType,
}: ISearchBoxProps) {
  let accumulated = 0;
  return (
    <SearchWrapper>
      <Title>{title}</Title>
      <BoxWrapper>
        {searchData.pages.map((page) => {
          const elements = page.results.map((media, index) => {
            const globalIndex = accumulated + index;
            return (
              <div
                key={media.id}
                onClick={() => handleBoxClick(mediaType, media.id)}
              >
                <Box
                  id={media.id}
                  index={globalIndex}
                  queryId={`${mediaType}_${media.genre_ids?.[0]}`}
                  title={
                    media.original_title ||
                    media.title ||
                    media.name ||
                    media.original_name
                  }
                  backdrop_path={media.backdrop_path}
                  poster_path={media.poster_path}
                />
              </div>
            );
          });
          accumulated += page.results.length;
          return elements;
        })}
      </BoxWrapper>
      {hasNextPage && (
        <MorePageBtn
          disabled={isFetchingNextPage || !hasNextPage}
          onClick={fetchNextPage}
        >
          More
        </MorePageBtn>
      )}
      {isFetchingNextPage && <Loader />}
    </SearchWrapper>
  );
}
