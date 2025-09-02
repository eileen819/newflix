import { useState } from "react";
import { generateUniqueId, makeImagePath } from "utils/utils";
import { Card, CardImg, Info } from "./boxStyle";

const boxVariants = {
  normal: ({
    index,
    slidesPerView,
  }: {
    index: number;
    slidesPerView: number;
  }) => ({
    opacity: 1,
    scale: 1,
    originX:
      index % slidesPerView === 0
        ? 0
        : index % slidesPerView === slidesPerView - 1
        ? 1
        : 0.5,
  }),
  hover: ({
    index,
    slidesPerView,
  }: {
    index: number;
    slidesPerView: number;
  }) => ({
    scale: 1.2,
    y: -25,
    zIndex: 10,
    originX:
      index % slidesPerView === 0
        ? 0
        : index % slidesPerView === slidesPerView - 1
        ? 1
        : 0.5,
    transition: {
      delay: 0.3,
      duration: 0.2,
      type: "tween",
    },
  }),
};

const infoVariants = {
  normal: {
    opacity: 0,
  },
  hover: {
    opacity: 1,
    zIndex: 10,
    transition: {
      delay: 0.3,
      duration: 0.2,
      type: "tween",
    },
  },
};

type Mode = "slider" | "grid";
interface IBoxProps {
  id: number;
  index?: number;
  queryId?: string;
  backdrop_path?: string;
  poster_path?: string;
  title?: string;
  name?: string;
  media?: string;
  slidesPerView?: number;
  mode: Mode;
}

export default function Box({
  id,
  index,
  queryId,
  backdrop_path,
  poster_path,
  title,
  name,
  slidesPerView,
  mode,
}: IBoxProps) {
  const [isHovered, setIsHovered] = useState(false);

  const bgTitle = () => {
    if (backdrop_path === null && poster_path === null && title) {
      return title.slice(0, 70);
    }
    return "";
  };

  const enableHover =
    mode === "slider" && typeof slidesPerView === "number" && slidesPerView > 1;

  return (
    <Card
      custom={{ index, slidesPerView }}
      layoutId={generateUniqueId(queryId!, id)}
      variants={boxVariants}
      initial="normal"
      whileHover={enableHover ? "hover" : undefined}
      onMouseEnter={enableHover ? () => setIsHovered(true) : undefined}
      onMouseLeave={enableHover ? () => setIsHovered(false) : undefined}
      transition={{ type: "tween" }}
    >
      <CardImg
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
        $bgPhoto={
          backdrop_path || poster_path
            ? makeImagePath(backdrop_path! || poster_path!, "w500")
            : null
        }
        $bgTitle={bgTitle()}
      />
      {enableHover && (
        <Info variants={infoVariants} $isHovered={isHovered}>
          <h4>{title || name}</h4>
        </Info>
      )}
    </Card>
  );
}
