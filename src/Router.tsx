import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import TvPage from "./pages/tv";
import SearchPage from "./pages/search";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="movies/:movieId" element={<Home key="modal" />} />
      </Route>
      <Route path="/tv" element={<TvPage key="tv" />}>
        <Route path=":tvShowId" element={<TvPage key="modal" />} />
      </Route>
      <Route path="/search" element={<SearchPage key="search" />} />
    </Routes>
  );
}
