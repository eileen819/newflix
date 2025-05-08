import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { getSearchResults } from "api/api";
import Box from "components/box/Box";
import { Loader } from "components/Loader";
import Modal from "components/modal/Modal";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 100px 50px;
`;

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
`;

const MorePageBtn = styled.button`
  width: 100px;
  height: 40px;
  border: 2px solid #b00101;
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

export interface IResultProps {
  id: number;
  backdrop_path?: string;
  poster_path?: string;
  original_title?: string;
  original_name?: string;
  title?: string;
  genre_ids?: number[];
  overview?: string;
  name?: string;
}

interface ISearchResultProps {
  page: number;
  results: IResultProps[];
  total_pages: number;
  total_results: number;
}

export default function SearchPage() {
  const [readSearchParams, setSearchParams] = useSearchParams();
  const [openModal, setOpenModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<IResultProps | null>(null);
  const [queryName, setQueryName] = useState("");
  const [clickedId, setClickedId] = useState<number | null>(null);
  const keyword = readSearchParams.get("keyword") || "";

  const {
    isLoading: movieLoading,
    data: movieData,
    fetchNextPage: fetchMovieNextPage,
    hasNextPage: hasMovieNextPage,
    isFetchingNextPage: isFetchingMovieNextPage,
  } = useInfiniteQuery<
    ISearchResultProps,
    Error,
    InfiniteData<ISearchResultProps>,
    [string, string, string]
  >({
    queryKey: ["search", "movies", keyword],
    queryFn: ({ pageParam }) =>
      getSearchResults("movie", keyword, Number(pageParam)),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  const {
    isLoading: tvLoading,
    data: tvData,
    fetchNextPage: fetchTvNextPage,
    hasNextPage: hasTvNextPage,
    isFetchingNextPage: isFetchingTvNextPage,
  } = useInfiniteQuery<
    ISearchResultProps,
    Error,
    InfiniteData<ISearchResultProps>,
    [string, string, string]
  >({
    queryKey: ["search", "tv", keyword],
    queryFn: ({ pageParam }) =>
      getSearchResults("tv", keyword, Number(pageParam)),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  const isLoading = movieLoading || tvLoading;

  const clickedMedia = (media: string, pageIndex: number, id: number) => {
    let selectedData = null;
    const sourceData = media === "movies" ? movieData : tvData;
    if (!sourceData) return;

    selectedData = sourceData.pages[pageIndex].results.find(
      (media) => media.id === id
    ) as IResultProps;

    setSelectedMedia(selectedData);
  };
  console.log(tvData);

  const handleBoxClick = (media: string, pageIndex: number, id: number) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set(media, String(id));
      return newParams;
    });
    clickedMedia(media, pageIndex, id);
    setQueryName(media);
    setClickedId(id);
    setOpenModal(true);
  };

  return (
    <Wrapper>
      {!isLoading ? (
        movieData?.pages.length === 0 && tvData?.pages.length === 0 ? (
          <div>검색결과가 없습니다.</div>
        ) : (
          <>
            {movieData && (
              <SearchWrapper>
                <Title>MOVIE</Title>
                <BoxWrapper>
                  {movieData.pages.map((page, pageIndex) =>
                    page.results.map((movie, index) => {
                      const globalIndex =
                        pageIndex * page.results.length + index;
                      return (
                        <div
                          key={movie.id}
                          onClick={() =>
                            handleBoxClick("movies", pageIndex, movie.id)
                          }
                        >
                          <Box
                            id={movie.id}
                            index={globalIndex}
                            queryId={`movie_${movie.genre_ids?.[0]}`}
                            title={movie.original_title || movie.title}
                            backdrop_path={movie.backdrop_path}
                            poster_path={movie.poster_path}
                          />
                        </div>
                      );
                    })
                  )}
                </BoxWrapper>
                {hasMovieNextPage && (
                  <MorePageBtn
                    disabled={isFetchingMovieNextPage || !hasMovieNextPage}
                    onClick={() => {
                      fetchMovieNextPage();
                    }}
                  >
                    More
                  </MorePageBtn>
                )}
                {isFetchingMovieNextPage && <Loader />}
              </SearchWrapper>
            )}
            {tvData && (
              <SearchWrapper>
                <Title>TV</Title>
                <BoxWrapper>
                  {tvData.pages.map((page, pageIndex) =>
                    page.results.map((tv, index) => {
                      const globalIndex =
                        pageIndex * page.results.length + index;
                      return (
                        <div
                          key={tv.id}
                          onClick={() => handleBoxClick("tv", pageIndex, tv.id)}
                        >
                          <Box
                            id={tv.id}
                            index={globalIndex}
                            queryId={`tv_${tv.genre_ids?.[0]}`}
                            title={tv.original_name}
                            backdrop_path={tv.backdrop_path}
                            poster_path={tv.poster_path}
                          />
                        </div>
                      );
                    })
                  )}
                </BoxWrapper>
                {hasTvNextPage && (
                  <MorePageBtn
                    disabled={isFetchingTvNextPage || !hasTvNextPage}
                    onClick={() => {
                      fetchTvNextPage();
                    }}
                  >
                    More
                  </MorePageBtn>
                )}
                {isFetchingTvNextPage && <Loader />}
              </SearchWrapper>
            )}
            <AnimatePresence>
              {openModal && (
                <Modal
                  queryName={queryName}
                  clickedId={clickedId}
                  movie={selectedMedia}
                  setShowModal={setOpenModal}
                />
              )}
            </AnimatePresence>
          </>
        )
      ) : (
        <Loader />
      )}
    </Wrapper>
  );
}
