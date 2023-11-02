import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Pokedex from "../pages/Pokedex";
import SearchResult from "../pages/SearchResult";
import Backoffice from "../pages/Backoffice";
import UpdatePokemon from "../pages/UpdatePokemon";
import Register from "../pages/Register";
import Login from "../pages/Login";

export default function Content() {
  return (
    <section className="content">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path="/search/:userResearch" element={<SearchResult />} />
        <Route path="/backoffice" element={<Backoffice />} />
        <Route path="/updatePokemon" element={<UpdatePokemon />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </section>
  );
}
