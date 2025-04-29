import { useQuery } from "@tanstack/react-query";
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

const SearchMovieWrapper = styled.div`
  margin-bottom: 50px;
`;

const SearchTvWrapper = styled(SearchMovieWrapper)``;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 20px;
`;

const BoxWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
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
  results: IResultProps[];
}

export default function SearchPage() {
  const [readSearchParams, setSearchParams] = useSearchParams();
  const [openModal, setOpenModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<IResultProps | null>(null);
  const [queryName, setQueryName] = useState("");
  const [clickedId, setClickedId] = useState<number | null>(null);
  const keyword = readSearchParams.get("keyword") || "";

  const { isLoading: movieLoading, data: movieData } =
    useQuery<ISearchResultProps>({
      queryKey: ["search", "movie", keyword],
      queryFn: () => getSearchResults("movie", keyword),
    });

  const { isLoading: tvLoading, data: tvData } = useQuery<ISearchResultProps>({
    queryKey: ["search", "tv", keyword],
    queryFn: () => getSearchResults("tv", keyword),
  });

  const isLoading = movieLoading || tvLoading;

  const clickedMedia = (id: number) => {
    let selectedData = null;
    if (movieData) {
      selectedData = movieData.results.find(
        (media) => media.id === id
      ) as IResultProps;
    } else {
      selectedData = tvData?.results.find(
        (media) => media.id === id
      ) as IResultProps;
    }
    setSelectedMedia(selectedData);
  };

  const handleBoxClick = (media: string, id: number) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set(media, String(id));
      return newParams;
    });
    clickedMedia(id);
    setQueryName(media);
    setClickedId(id);
    setOpenModal(true);
  };

  return (
    <Wrapper>
      {!isLoading ? (
        movieData?.results.length === 0 && tvData?.results.length === 0 ? (
          <div>검색결과가 없습니다.</div>
        ) : (
          <>
            {movieData && (
              <SearchMovieWrapper>
                <Title>MOVIE</Title>
                <BoxWrapper>
                  {movieData?.results.map((movie, index) => (
                    <div
                      key={movie.id}
                      onClick={() => handleBoxClick("movies", movie.id)}
                    >
                      <Box
                        id={movie.id}
                        index={index}
                        queryId={`movie_${movie.genre_ids?.[0]}`}
                        title={movie.original_title || movie.title}
                        backdrop_path={movie.backdrop_path}
                        poster_path={movie.poster_path}
                      />
                    </div>
                  ))}
                </BoxWrapper>
              </SearchMovieWrapper>
            )}
            {tvData && (
              <SearchTvWrapper>
                <Title>TV</Title>
                <BoxWrapper>
                  {tvData?.results.map((tv, index) => (
                    <div
                      key={tv.id}
                      onClick={() => handleBoxClick("tv", tv.id)}
                    >
                      <Box
                        id={tv.id}
                        index={index}
                        queryId={`tv_${tv.genre_ids?.[0]}`}
                        title={tv.original_name}
                        backdrop_path={tv.backdrop_path}
                        poster_path={tv.poster_path}
                      />
                    </div>
                  ))}
                </BoxWrapper>
              </SearchTvWrapper>
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
