import { Link, useMatch, useNavigate } from "react-router-dom";
import {
  Circle,
  Col,
  Item,
  Items,
  Logo,
  MenuTitle,
  Nav,
  SearchIcon,
  SearchModal,
  SearchModalInput,
} from "./headerStyle";
import {
  useAnimation,
  useMotionValueEvent,
  useScroll,
  motion,
} from "framer-motion";
import SearchBar from "./SearchBar";
import { useMediaQuery } from "utils/useMediaQuery";
import { useState } from "react";
import { useForm } from "react-hook-form";

const logoVariants = {
  normal: {
    fillOpacity: 1,
  },
  active: {
    fillOpacity: [0, 1, 0],
    transition: {
      repeat: Infinity,
    },
  },
};

const navVariants = {
  top: {
    background: "linear-gradient(to bottom, rgba(0,0,0,0.5) , rgba(0,0,0,0))",
  },
  scroll: { background: "linear-gradient(rgba(0,0,0,1) , rgba(0,0,0,1))" },
};

interface ISearchForm {
  searchInput: string;
}

export default function Header() {
  const navigate = useNavigate();
  const homeMatch = useMatch("/");
  const tvMatch = useMatch("/tv");
  const { scrollY } = useScroll();
  const navAnimation = useAnimation();
  const { isMobileS } = useMediaQuery();
  const [isSearchModal, setIsSearchModal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ISearchForm>();

  useMotionValueEvent(scrollY, "change", () => {
    if (scrollY.get() > 80) {
      navAnimation.start("scroll");
    } else {
      navAnimation.start("top");
    }
  });

  const onSubmit = ({ searchInput }: ISearchForm) => {
    setIsSearchModal(false);
    navigate(`/search?keyword=${searchInput}`);
    setValue("searchInput", "");
  };

  return (
    <Nav
      variants={navVariants}
      initial="top"
      animate={navAnimation}
      transition={{ duration: 0.3 }}
    >
      <Col>
        <Logo
          onClick={() => navigate("/")}
          variants={logoVariants}
          initial="normal"
          whileHover="active"
          xmlns="http://www.w3.org/2000/svg"
          version="1.0"
          width="873"
          height="260"
          viewBox="0 0 873 260"
        >
          <motion.path d="M24 125.9c0 58.4.3 106.1.6 106.1 1 0 27.9-4 30.2-4.5l2.2-.5.1-55.3v-55.2l7.3 21.5c15.9 46.7 28.9 84.5 29.1 84.8.2.2 8.2-.5 17.9-1.4l17.6-1.8-.2-99.6-.3-99.5-16 .3-16 .2-.2 58.2c-.2 31.9-.5 58.3-.8 58.6-.3.3-.5-.1-.5-.8 0-1.1-38.8-115.2-39.3-115.6-.1-.1-7.3-.5-15.9-.9L24 19.8v106.1zM158 118.4v98.8l8.8-.7c4.8-.4 24.5-1.7 43.7-2.9l35-2.1.2-16.3.2-16.3-8.2.6c-10 .7-42 2.5-44.2 2.5-1.3 0-1.5-3.1-1.5-24.5V133h43v-32h-43V53h53.6l.3-16 .3-16h-40.4c-22.2 0-42-.3-44-.6l-3.8-.7v98.7zM265.5 24.7c.8 6.2 27.2 169.8 28.6 178.2l1.2 6.4 9.6-.7c5.3-.3 13.7-.6 18.7-.6h9.1l.6-3.8c4.6-31.7 15.3-97 15.7-96.4.3.4 1.6 7.7 2.8 16.2 1.3 8.5 4.7 30.6 7.6 49l5.2 33.5 20-.4c10.9-.2 20.2-.6 20.5-1 .3-.3 6.8-41.1 14.3-90.6 7.6-49.5 14-91 14.3-92.3l.5-2.2h-17.1c-12.8 0-17.3.3-17.6 1.2-.2.7-2.5 17.3-5.1 36.8-9.6 74.2-11.2 86.2-11.6 86.6-.4.3-10.5-61.3-17-103.9L362.6 20H336.3l-2.2 15.7c-1.2 8.7-4.6 31.3-7.6 50.3-3 19-6.2 39.7-7.1 46-.9 6.3-1.9 11-2 10.5C316.8 140.7 299 23 299 21c0-.6-6.4-1-17.1-1h-17.1l.7 4.7zM562 114v94h3.7c5.3 0 74.1 3.9 79.1 4.5l4.2.5v-16.5c0-16.4 0-16.5-2.2-16.5-2.1-.1-50.9-2.8-51.5-3-.2 0-.3-24.9-.3-55.3 0-30.3-.3-65.7-.7-78.5l-.6-23.2H562v94zM676 20.5v194l6.7.6c3.8.3 11 .9 16.1 1.3l9.2.7V20h-16c-8.8 0-16 .2-16 .5zM811 25.4c-1.2 2.8-6 14.5-10.7 26.1-4.7 11.5-8.9 21.3-9.2 21.7-.3.4-4.9-11.1-10.2-25.5l-9.6-26.2-18.1-.3L735 21l2 4.9c1 2.7 9.4 25.2 18.5 49.9l16.5 45-7 16.8c-3.9 9.3-13 31.3-20.4 48.9-7.3 17.6-13.2 32.1-13.1 32.3.6.7 34 4.1 34.5 3.5.4-.5 2.5-5.3 4.8-10.8 2.3-5.5 7-17 10.5-25.5s6.7-16.4 7.1-17.4c.3-1 .8-1.7 1-1.5.2.2 5.3 13.9 11.2 30.4 5.9 16.5 11 30.3 11.3 30.7.6.6 35.2 5 35.8 4.5.1-.2-8.8-25.5-19.8-56.2l-20-55.9L828.1 72c11.1-26.7 20.4-49.3 20.7-50.3.4-1.7-.6-1.8-17.6-1.6l-18 .1-2.2 5.2zM454 113.5V206h33v-73h41.8l.1-16 .2-16H487V53h52V21h-85v92.5z" />
        </Logo>
        <Items>
          <Item>
            <Link to="/">
              <MenuTitle>Movies</MenuTitle>
              {homeMatch && <Circle layoutId="circle" style={{ originY: 0 }} />}
            </Link>
          </Item>
          <Item>
            <Link to="/tv">
              <MenuTitle>Tv Shows</MenuTitle>
              {tvMatch && <Circle layoutId="circle" style={{ originY: 0 }} />}
            </Link>
          </Item>
        </Items>
      </Col>
      <Col>
        {!isMobileS ? (
          <SearchBar />
        ) : (
          <SearchIcon
            onClick={() => setIsSearchModal(true)}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </SearchIcon>
        )}
      </Col>
      {isSearchModal && (
        <SearchModal onClick={() => setIsSearchModal(false)}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <SearchModalInput
              {...register("searchInput", {
                required: "검색어를 한 글자 이상 입력해주세요.",
                minLength: 1,
              })}
              onClick={(event: React.MouseEvent<HTMLInputElement>) => {
                event.stopPropagation();
              }}
              placeholder={
                !errors.searchInput ? "movie, tv.." : errors.searchInput.message
              }
              autoComplete="off"
            />
          </form>
        </SearchModal>
      )}
    </Nav>
  );
}
