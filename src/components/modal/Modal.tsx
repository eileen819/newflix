import { useQuery } from "@tanstack/react-query";
import { getMovieDetail } from "api/api";
import { IGetMovieDetail, IResult } from "api/interfaceData";
// import { useMatch, useNavigate } from "react-router-dom";
import {
  BigCover,
  BigDetail,
  BigMovie,
  BigOverview,
  BigTitle,
  GenreWrapper,
  Overlay,
} from "./modalStyle";
import { generateUniqueId, makeImagePath } from "utils/utils";
import { useNavigate } from "react-router-dom";

// interface
interface IMovieModalProp {
  queryName: string;
  queryId: string;
  movie: IResult;
  clickedId: number;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

// function
export default function Modal({
  queryName,
  queryId,
  movie,
  clickedId,
  setShowModal,
}: IMovieModalProp) {
  const navigate = useNavigate();
  const onOverlayClick = () => {
    navigate(-1);
    setShowModal(false);
  };

  const media = queryName === "movies" ? "movie" : "tv";

  const { data } = useQuery<IGetMovieDetail>({
    queryKey: ["detail", queryId, clickedId],
    queryFn: () => getMovieDetail(media, String(clickedId)),
  });

  return (
    <>
      <Overlay
        onClick={onOverlayClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, type: "tween" }}
      />
      <BigMovie
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, type: "tween" }}
        layoutId={generateUniqueId(queryId!, clickedId)}
      >
        <BigCover $bgPhoto={makeImagePath(movie?.backdrop_path || "")} />
        <BigTitle>
          {movie?.title || movie?.name || data?.original_title}
        </BigTitle>
        <BigDetail>
          <GenreWrapper>
            {data?.genres.map((genre) => (
              <span key={genre.id}>{genre.name}</span>
            ))}
          </GenreWrapper>
          <div>company: {data?.production_companies[0].name}</div>
          <div>release: {data?.release_date}</div>
          <div>{data?.runtime}minutes</div>
          <BigOverview>{movie?.overview || data?.overview}</BigOverview>
        </BigDetail>
      </BigMovie>
    </>
  );
}
