import { Navigate, Route, Routes } from "react-router-dom";
import TvPage from "./pages/tv";
import SearchPage from "./pages/search";
import Home from "pages/home";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="movie" element={<Home key="movie-modal" />} />
      </Route>
      <Route path="/tv" element={<TvPage key="tv" />} />
      <Route path="/search" element={<SearchPage key="search" />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}
