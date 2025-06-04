import { movieInstance } from "./movieInstance.js";

export default async function handler(req, res) {
  const { url } = req.query;
  console.log("🔍 요청된 url:", url);
  console.log(
    "🔐 사용된 토큰:",
    process.env.MOVIEDB_TOKEN?.slice(0, 10),
    "..."
  );

  if (!url) return res.status(400).json({ error: "URL 파라미터 없음" });
  if (!process.env.MOVIEDB_TOKEN)
    return res.status(500).json({ error: "환경 변수 없음" });

  try {
    const response = await movieInstance.get(url);
    return res.status(200).json(response.data);
  } catch (error) {
    console.error("TMDB 호출 에러:", error.message);
    return res.status(500).json({ error: "TMDB 요청 실패" });
  }
}
