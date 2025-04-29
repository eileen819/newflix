import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  color: white;
  label {
    position: absolute;
    right: 0;
    bottom: -17px;
    margin-right: 5px;
  }
`;

const Input = styled(motion.input)`
  width: 220px;
  transform-origin: right center;
  position: absolute;
  right: 0;
  z-index: -1;
  padding: 7px 10px 7px 40px;
  border: 1px solid ${(props) => props.theme.white.darker};
  border-radius: 3px;
  outline: none;
  background-color: transparent;
  color: white;
  font-size: 16px;
`;

const Svg = styled(motion.svg)`
  width: 20px;
  height: 25px;
  fill: ${(props) => props.theme.white.darker};
  cursor: pointer;
`;

interface IForm {
  keyword: string;
}

function SearchBar() {
  const searchRef = useRef<HTMLFormElement>(null);
  const searchIconRef = useRef<SVGSVGElement>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const inputAnimation = useAnimation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const navigate = useNavigate();

  const toggleSearch = () => {
    if (searchOpen) {
      // 애니메이션 트리거. 검색창이 열려있기 때문에 닫아줌
      inputAnimation.start({ scaleX: 0 });
    } else {
      // 애니메이션 트리거. 검색창이 닫혀있기 때문에 열어줌
      inputAnimation.start({ scaleX: 1 });
    }
    setSearchOpen((prev) => !prev);
  };

  const onValid = (data: IForm) => {
    console.log(data);
    navigate(`/search?keyword=${data.keyword}`);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        searchIconRef.current &&
        !searchRef.current.contains(event.target as Node) &&
        !searchIconRef.current.contains(event.target as Node)
      ) {
        inputAnimation.start({ scaleX: 0 });
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [inputAnimation]);
  // 로고나 메뉴 버튼을 눌렀을 때도 동작함. 해당부분의 실행여부를 생각해볼 필요가 있음
  // dependency 경고문 뜸, 사용하기 전에 확인 필요함 -> inputAnimation을 dependency에 넣으라고 뜨는데 해당 부분 확이 필요함

  return (
    <Wrapper ref={searchRef} onSubmit={handleSubmit(onValid)}>
      <label htmlFor="search">
        <Svg
          ref={searchIconRef}
          onClick={toggleSearch}
          transition={{ ease: "linear" }}
          animate={{ x: searchOpen ? -185 : 0 }}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          ></path>
        </Svg>
      </label>
      <Input
        {...register("keyword", {
          required: "검색어를 한 글자 이상 입력해주세요",
          minLength: 2,
        })}
        id="search"
        transition={{ ease: "linear" }}
        initial={{ scaleX: 0 }}
        animate={inputAnimation}
        placeholder={!errors.keyword ? "movie, tv" : errors.keyword.message}
        autoComplete="off"
      />
    </Wrapper>
  );
}

export default SearchBar;
