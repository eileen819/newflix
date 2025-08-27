import { useQuery } from "@tanstack/react-query";
import { getMovieDetail, getMovieVideo } from "api/api";
import { IGetMovieDetail, IResult } from "api/interfaceData";
import { IResultProps } from "pages/search";
import { useMemo } from "react";
import { makeImagePath } from "./utils";

// interface
// interface IMovieModalProp {
//   queryName?: string;
//   queryId?: string;
//   movie?: IResult | IResultProps | null;
//   clickedId?: number | null;
//   setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
// }

interface IMovieVideo {
  key: string;
  name: string;
  site: string;
  type: string;
}

interface IMovieVideosProp {
  id: number;
  results: IMovieVideo[];
}

interface IUseMovieMediaProp {
  queryName?: string;
  queryId?: string;
  movie?: IResult | IResultProps | null;
  clickedId?: number | null;
}

function trailerKey(video: IMovieVideosProp) {
  if (video.results.length === 0) return;

  const official = video.results.find(
    (v) => v.name === "Official Trailer" && v.site === "YouTube"
  );
  if (official) return official.key;

  const anyTrailer = video.results.find(
    (v) =>
      (v.name.includes("Trailer") ||
        v.type.includes("Trailer") ||
        v.type.includes("Teaser")) &&
      v.site === "YouTube"
  );
  return anyTrailer?.key;
}

export function useMovieMedia(opts: IUseMovieMediaProp) {
  const { queryName, queryId, clickedId, movie } = opts;
  const media = queryName === "movie" ? "movie" : "tv";

  const { isLoading: detailLoading, data: movieDetail } =
    useQuery<IGetMovieDetail>({
      queryKey: ["detail", queryId, clickedId],
      queryFn: () => getMovieDetail(media, String(clickedId)),
    });

  const { isLoading: videoLoading, data: movieVideos } =
    useQuery<IMovieVideosProp>({
      queryKey: ["detail", "video", queryId, clickedId],
      queryFn: () => getMovieVideo(media, String(clickedId)),
    });

  const trailerId = movieVideos ? trailerKey(movieVideos) : null;

  const coverSrc = useMemo(
    () =>
      makeImagePath(
        movie?.backdrop_path ||
          movie?.poster_path ||
          movieDetail?.poster_path ||
          movieDetail?.backdrop_path ||
          ""
      ),
    [movie, movieDetail]
  );

  return {
    movieDetail,
    detailLoading,
    videoLoading,
    trailerId,
    coverSrc,
  };
}
