import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Pokedex from "../pages/Pokedex";
import SearchResult from "../pages/SearchResult";
import Backoffice from "../pages/Backoffice";

export default function Content() {
  return (
    <section className="content">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path="/search/:userResearch" element={<SearchResult />} />
        <Route path="/backoffice" element={<Backoffice />} />
      </Routes>
    </section>
  );
}
