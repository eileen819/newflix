import { useState } from "react";
import { generateUniqueId, makeImagePath } from "utils/utils";
import { Card, CardImg, Info } from "./boxStyle";
import { useNavigate } from "react-router-dom";

const boxVariants = {
  normal: (index: number) => ({
    opacity: 1,
    scale: 1,
    originX: index % 6 === 0 ? 0 : index % 6 === 5 ? 1 : 0.5,
  }),
  hover: (index: number) => ({
    scale: 1.2,
    y: -25,
    originX: index % 6 === 0 ? 0 : index % 6 === 5 ? 1 : 0.5,
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
    transition: {
      delay: 0.3,
      duration: 0.2,
      type: "tween",
    },
  },
};

interface IBoxProps {
  id: number;
  index?: number;
  queryId?: string;
  backdrop_path?: string;
  poster_path?: string;
  title?: string;
  name?: string;
  media?: string;
}

export default function Box({
  id,
  index,
  queryId,
  backdrop_path,
  poster_path,
  title,
  name,
}: IBoxProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      custom={index}
      layoutId={generateUniqueId(queryId!, id)}
      variants={boxVariants}
      initial="normal"
      whileHover="hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
        $bgTitle={backdrop_path === null && poster_path === null ? title! : ""}
      />
      {/* <AnimatePresence>
        {isClicked !== id && (
          <CardImg
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            $bgPhoto={makeImagePath(backdrop_path || poster_path, "w500")}
          />
        )}
      </AnimatePresence> */}
      <Info variants={infoVariants} $isHovered={isHovered}>
        <h4>{title || name}</h4>
      </Info>
    </Card>
  );
}
