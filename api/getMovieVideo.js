import { movieInstance } from "./movieInstance.js";

export default async function handler(req, res) {
  const { media, movieId } = req.query;

  try {
    const response = await movieInstance.get(`/${media}/${movieId}/videos`);
    return res.status(200).json(response.data);
  } catch (error) {
    console.error("TMDB 호출 에러:", error.message);
    return res.status(500).json({ error: "TMDB 요청 실패" });
  }
}
