import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import TvPage from "./pages/tv";
import SearchPage from "./pages/search";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="movies" element={<Home key="movies-modal" />} />
      </Route>
      <Route path="/tv" element={<TvPage key="tv" />}>
        {/* <Route path=":tvShowId" element={<TvPage key="tv-modal" />} /> */}
      </Route>
      <Route path="/search" element={<SearchPage key="search" />}>
        {/* <Route
          path="movies/:movieId"
          element={<SearchPage key="movies-modal" />}
        />
        <Route path="tv/:tvShowId" element={<SearchPage key="tv-modal" />} /> */}
      </Route>
      <Route path="/*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}
