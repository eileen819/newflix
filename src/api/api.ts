import axios from "axios";

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
