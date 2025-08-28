import { IResult } from "api/interfaceData";
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
import { generateUniqueId } from "utils/utils";
import { useNavigate } from "react-router-dom";
import YouTube from "react-youtube";
import { IoIosTimer } from "react-icons/io";
import { MdCategory, MdOutlineNewReleases } from "react-icons/md";
import { Loader } from "components/Loader";
import { IResultProps } from "pages/search";
import { useMediaQuery } from "utils/useMediaQuery";
import { useMovieMedia } from "utils/useMovieMedia";
import { useCoverPreload } from "utils/useCoverPreload";
import { useYoutubeTrailer } from "utils/useYoutubeTrailer";

// interface
interface IMovieModalProp {
  queryName?: string;
  queryId?: string;
  movie?: IResult | IResultProps | null;
  clickedId?: number | null;
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
    setShowModal(false);
    navigate(-1);
  };
  const { isMobileS } = useMediaQuery();

  const { movieDetail, detailLoading, videoLoading, trailerId, coverSrc } =
    useMovieMedia({
      queryName,
      queryId,
      clickedId,
      movie,
    });

  const coverLoaded = useCoverPreload(coverSrc);

  const { handleStateChange, handleReady, showPlayer, hasPlayed, isReady } =
    useYoutubeTrailer({
      detailLoading,
      trailerId,
    });

  const isLoading = detailLoading || videoLoading;
  const shouldShowCover =
    !trailerId || !showPlayer || !hasPlayed || !isReady || !coverLoaded;

  console.log(hasPlayed);

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
                $bgPhoto={coverSrc}
              />
              {showPlayer && trailerId && (
                <VideoLayer>
                  <YouTube
                    key={trailerId}
                    videoId={trailerId}
                    onStateChange={handleStateChange}
                    onReady={handleReady}
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
            <DetailWrapper>
              <BigTitle>
                {movie?.title ||
                  movieDetail?.original_name ||
                  movieDetail?.original_title}
              </BigTitle>
              <BigDetail>
                <GenreWrapper>
                  {movieDetail?.genres.length !== 0 ? (
                    <>
                      <MdCategory />
                      {movieDetail?.genres.slice(0, 3).map((genre) => (
                        <span key={genre.id}>{genre.name}</span>
                      ))}
                    </>
                  ) : null}
                </GenreWrapper>
                <ReleaseWrapper>
                  <MdOutlineNewReleases size={18} />
                  {movieDetail?.release_date ? (
                    <span>{movieDetail?.release_date}</span>
                  ) : (
                    <span>
                      {movieDetail?.seasons &&
                      movieDetail.seasons.length > 0 &&
                      movieDetail.seasons[movieDetail.seasons.length - 1]
                        .season_number !== 0
                        ? "SEASON " +
                          movieDetail.seasons[movieDetail.seasons.length - 1]
                            .season_number +
                          ": "
                        : ""}
                      {movieDetail?.seasons
                        ? movieDetail?.seasons[movieDetail.seasons?.length - 1]
                            .episode_count + " Episodes"
                        : ""}
                    </span>
                  )}
                </ReleaseWrapper>
                <RunTimeWrapper>
                  <IoIosTimer size={18} />
                  {movieDetail?.runtime ? (
                    <span>{movieDetail?.runtime}m</span>
                  ) : movieDetail?.episode_run_time?.length === 0 &&
                    movieDetail?.last_episode_to_air?.runtime === null ? (
                    ""
                  ) : (
                    <span>
                      Last episode{" "}
                      {movieDetail?.episode_run_time ||
                        movieDetail?.last_episode_to_air?.runtime}
                      m
                    </span>
                  )}
                </RunTimeWrapper>
                <BigOverview>
                  {movie?.overview || movieDetail?.overview}
                </BigOverview>
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
