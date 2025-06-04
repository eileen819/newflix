import axios from "axios";

const TOKEN = process.env.MOVIEDB_TOKEN;
const BASE_PATH = "https://api.themoviedb.org/3";

if (!TOKEN) {
  throw new Error("MOVIEDB_TOKEN 환경 변수가 설정되지 않았습니다.");
}

export const movieInstance = axios.create({
  baseURL: BASE_PATH,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
});
