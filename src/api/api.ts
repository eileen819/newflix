import axios, { AxiosError } from "axios";

const TOKEN = import.meta.env.VITE__MOVIEDB_TOKEN;
const BASE_PATH = "https://api.themoviedb.org/3";

const movieInstance = axios.create({
  baseURL: BASE_PATH,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
});

export async function getMovies(url: string) {
  try {
    const response = await movieInstance.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getMovieDetail(media: string, movieId: string) {
  if (!movieId) throw new Error("movieId is undefined");
  try {
    const response = await movieInstance.get(`/${media}/${movieId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getMovieVideo(media: string, movieId: string) {
  if (!movieId) throw new Error("movieId is undefined");
  try {
    const response = await movieInstance.get(`/${media}/${movieId}/videos`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getSearchResults(
  media: string,
  keyword: string,
  pageParam: number = 1
) {
  if (!keyword.trim()) return null;
  try {
    const response = await movieInstance.get(`/search/${media}`, {
      params: {
        query: keyword,
        page: pageParam,
      },
    });
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    console.error("TMDB 검색 에러:", err.message);
    throw new Error("검색 요청에 실패했습니다.");
  }
}
