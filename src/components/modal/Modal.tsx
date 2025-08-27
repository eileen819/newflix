import { useQuery } from "@tanstack/react-query";
import { getMovieDetail, getMovieVideo } from "api/api";
import { IGetMovieDetail, IResult } from "api/interfaceData";
// import { useMatch, useNavigate } from "react-router-dom";
import {
  BigCover,
  BigDetail,
  BigMovie,
  BigMovieWrapper,
  BigOverview,
  BigTitle,
  DetailWrapper,
  GenreWrapper,
  Overlay,
  ReleaseWrapper,
  RunTimeWrapper,
  Scrim,
  VideoLayer,
} from "./modalStyle";
import { generateUniqueId, makeImagePath } from "utils/utils";
import { useNavigate } from "react-router-dom";
import YouTube from "react-youtube";
import { IoIosTimer } from "react-icons/io";
import { MdCategory, MdOutlineNewReleases } from "react-icons/md";
import { Loader } from "components/Loader";
import { IResultProps } from "pages/search";
import { useMediaQuery } from "utils/useMediaQuery";
import { useEffect, useState } from "react";

// interface
interface IMovieModalProp {
  queryName?: string;
  queryId?: string;
  movie?: IResult | IResultProps | null;
  clickedId?: number | null;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

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

interface IYoutubeEvent {
  data: number;
}

// function
export default function Modal({
  queryName,
  queryId,
  movie,
  clickedId,
  setShowModal,
}: IMovieModalProp) {
  const [showPlayer, setShowPlayer] = useState(false);
  const [ytState, setYtState] = useState<number | null>(null);

  const navigate = useNavigate();
  const onOverlayClick = () => {
    setShowModal(false);
    navigate(-1);
  };
  const { isMobileS } = useMediaQuery();

  const media = queryName === "movie" ? "movie" : "tv";

  const { isLoading: detailLoading, data } = useQuery<IGetMovieDetail>({
    queryKey: ["detail", queryId, clickedId],
    queryFn: () => getMovieDetail(media, String(clickedId)),
  });

  const { isLoading: videoLoading, data: movieVideos } =
    useQuery<IMovieVideosProp>({
      queryKey: ["detail", "video", queryId, clickedId],
      queryFn: () => getMovieVideo(media, String(clickedId)),
    });

  const trailerKey = (video: IMovieVideosProp) => {
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
  };

  const handleStateChange = (event: IYoutubeEvent) => {
    console.log(event);
    const { data } = event;
    setYtState(data);
    console.log("YT state:", data);
  };

  const isPlaying = ytState === 1;
  const trailerId = movieVideos ? trailerKey(movieVideos) : null;
  const isLoading = detailLoading || videoLoading;
  const shouldShowCover = !trailerId || !showPlayer || !isPlaying;

  useEffect(() => {
    if (!detailLoading && trailerId) {
      const delay = setTimeout(() => setShowPlayer(true), 200);
      return () => clearTimeout(delay);
    } else {
      setShowPlayer(false);
      setYtState(null);
    }
  }, [detailLoading, trailerId]);

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
        layoutId={generateUniqueId(queryId!, clickedId!)}
      >
        {!isLoading ? (
          <>
            <BigMovieWrapper>
              <BigCover
                animate={{ opacity: shouldShowCover ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                $bgPhoto={makeImagePath(
                  movie?.backdrop_path ||
                    data?.poster_path ||
                    data?.backdrop_path ||
                    ""
                )}
              />
              {showPlayer && trailerId && (
                <VideoLayer>
                  <YouTube
                    videoId={trailerId}
                    onStateChange={handleStateChange}
                    onReady={(e) => {
                      try {
                        e.target.mute();
                        e.target.playVideo();
                      } catch {
                        console.log("onReady error");
                      }
                    }}
                    opts={{
                      width: "100%",
                      height: "100%",
                      playerVars: {
                        playsinline: 1,
                        autoplay: 1,
                        loop: 1,
                        playlist: trailerId,
                        rel: 0,
                        modestbranding: 1,
                        controls: 0,
                        mute: 1,
                      },
                    }}
                    style={{
                      position: "absolute",
                      top: isMobileS ? 0 : -60,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      pointerEvents: "none",
                    }}
                  />
                </VideoLayer>
              )}
            </BigMovieWrapper>
            <Scrim />
            {/* {showPlayer ? (
              <BigMovieWrapper>
                <YouTube
                  videoId={trailerId}
                  opts={{
                    width: "100%",
                    height: "100%",
                    playerVars: {
                      autoplay: 1,
                      loop: 1,
                      playlist: trailerId,
                      rel: 0,
                      modestbranding: 1,
                      controls: 0,
                      mute: 1,
                    },
                  }}
                  style={{
                    position: "absolute",
                    top: isMobileS ? 0 : -60,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                  }}
                />
                <BigMovieCover />
              </BigMovieWrapper>
            ) : (
              <BigCover
                $bgPhoto={makeImagePath(
                  movie?.backdrop_path ||
                    data?.poster_path ||
                    data?.backdrop_path ||
                    ""
                )}
              />
            )} */}
            <DetailWrapper>
              <BigTitle>
                {movie?.title || data?.original_name || data?.original_title}
              </BigTitle>
              <BigDetail>
                <GenreWrapper>
                  {data?.genres.length !== 0 ? (
                    <>
                      <MdCategory />
                      {data?.genres.slice(0, 3).map((genre) => (
                        <span key={genre.id}>{genre.name}</span>
                      ))}
                    </>
                  ) : null}
                </GenreWrapper>
                <ReleaseWrapper>
                  <MdOutlineNewReleases size={18} />
                  {data?.release_date ? (
                    <span>{data?.release_date}</span>
                  ) : (
                    <span>
                      {data?.seasons &&
                      data.seasons.length > 0 &&
                      data.seasons[data.seasons.length - 1].season_number !== 0
                        ? "SEASON " +
                          data.seasons[data.seasons.length - 1].season_number +
                          ": "
                        : ""}
                      {data?.seasons
                        ? data?.seasons[data.seasons?.length - 1]
                            .episode_count + " Episodes"
                        : ""}
                    </span>
                  )}
                </ReleaseWrapper>
                <RunTimeWrapper>
                  <IoIosTimer size={18} />
                  {data?.runtime ? (
                    <span>{data?.runtime}m</span>
                  ) : data?.episode_run_time?.length === 0 &&
                    data?.last_episode_to_air?.runtime === null ? (
                    ""
                  ) : (
                    <span>
                      Last episode{" "}
                      {data?.episode_run_time ||
                        data?.last_episode_to_air?.runtime}
                      m
                    </span>
                  )}
                </RunTimeWrapper>
                <BigOverview>{movie?.overview || data?.overview}</BigOverview>
              </BigDetail>
            </DetailWrapper>
          </>
        ) : (
          <Loader />
        )}
      </BigMovie>
    </>
  );
}
