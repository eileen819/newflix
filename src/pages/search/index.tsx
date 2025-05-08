import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { getSearchResults } from "api/api";
import SearchBox from "components/box/SearchBox";
import { Loader } from "components/Loader";
import Modal from "components/modal/Modal";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 100px 50px;
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

export interface ISearchResultProps {
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
    queryKey: ["search", "movie", keyword],
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

  console.log(movieData);
  const isLoading = movieLoading || tvLoading;

  const clickedMedia = (media: string, id: number) => {
    let selectedData = null;
    const sourceData = media === "movie" ? movieData : tvData;
    if (!sourceData) return;

    selectedData = sourceData.pages
      .flatMap((page) => page.results)
      .find((media) => media.id === id) as IResultProps;

    setSelectedMedia(selectedData);
  };
  console.log(tvData);

  const handleBoxClick = (media: string, id: number) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set(media, String(id));
      return newParams;
    });
    clickedMedia(media, id);
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
              <SearchBox
                searchData={movieData}
                hasNextPage={hasMovieNextPage}
                isFetchingNextPage={isFetchingMovieNextPage}
                handleBoxClick={handleBoxClick}
                fetchNextPage={() => fetchMovieNextPage()}
                mediaType="movie"
              />
            )}
            {tvData && (
              <SearchBox
                searchData={tvData}
                hasNextPage={hasTvNextPage}
                isFetchingNextPage={isFetchingTvNextPage}
                handleBoxClick={handleBoxClick}
                fetchNextPage={() => fetchTvNextPage()}
                mediaType="tv"
              />
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
