import { useQuery } from "@tanstack/react-query";
import { getMovies } from "api/api";
import { IGetResults } from "api/interfaceData";
import { useRef, useState } from "react";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import {
  Loader,
  NavBtn,
  StyledSwiper,
  StyledSwiperSlide,
  Title,
  Wrapper,
} from "./rowStyle";
import Box from "components/box/Box";
import Modal from "components/modal/Modal";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface IRowProps {
  title: string;
  queryName: string;
  queryId: string;
  queryUrl: string;
}

type TypeNavigation = "NEXT" | "PREV";

export default function Row({
  title,
  queryName,
  queryId,
  queryUrl,
}: IRowProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isClickedBox, setIsClickedBox] = useState<number | null>(null);
  const navigate = useNavigate();

  const { isLoading, data } = useQuery<IGetResults>({
    queryKey: [queryName, queryId],
    queryFn: () => getMovies(queryUrl),
  });

  const clickedMedia = data?.results.find((movie) => movie.id === isClickedBox);

  const handleNavigation = (newDirection: TypeNavigation) => {
    if (data?.results && swiperRef.current) {
      if (newDirection === "NEXT") {
        swiperRef.current?.slideNext(1000);
      } else {
        swiperRef.current.slidePrev(1000);
      }
    }
  };

  const handleModal = (id: number, queryName: string) => {
    if (queryName === "tv") {
      navigate(`/tv/${id}`);
    } else {
      navigate(`/movies/${id}`);
    }
    setShowModal(true);
    setIsClickedBox(id);
  };

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading..</Loader>
      ) : (
        <>
          <Title>{title}</Title>
          <StyledSwiper
            slidesPerView={6}
            slidesPerGroup={6}
            spaceBetween={5}
            onSwiper={(swiper: SwiperType) => (swiperRef.current = swiper)}
          >
            {data?.results.slice(0, 18).map((movie, i) => (
              <StyledSwiperSlide
                key={`${queryId}_${i}_${movie.id}`}
                onClick={() => handleModal(movie.id, queryName)}
              >
                <Box {...movie} index={i} queryId={queryId} />
              </StyledSwiperSlide>
            ))}
          </StyledSwiper>
          <NavBtn $position="prev" onClick={() => handleNavigation("PREV")}>
            {"<"}
          </NavBtn>
          <NavBtn $position="next" onClick={() => handleNavigation("NEXT")}>
            {">"}
          </NavBtn>

          <AnimatePresence onExitComplete={() => setIsClickedBox(null)}>
            {showModal && clickedMedia && (
              <Modal
                queryName={queryName}
                queryId={queryId}
                movie={clickedMedia}
                clickedId={clickedMedia?.id}
                setShowModal={setShowModal}
              />
            )}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
