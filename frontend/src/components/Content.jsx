import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Pokedex from "../pages/Pokedex";
import SearchResult from "../pages/SearchResult";
import ExportContext from "../contexts/Context";
import Backoffice from "../pages/Backoffice";
import UpdatePokemon from "../pages/UpdatePokemon";
import Register from "../pages/Register";
import Login from "../pages/Login";
import PrivateRoute from "../services/PrivateRoute";
import Messages from "../pages/Messages";
import MessageDetails from "../pages/MessageDetails";
import Newsletter from "../pages/Newsletter";

export default function Content() {
  const { infoUser } = useContext(ExportContext.Context);

  return (
    <section className="content">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path="/search/:userResearch" element={<SearchResult />} />
        <Route
          path="/backoffice"
          element={
            <PrivateRoute isAllowed={infoUser.role === "admin"}>
              <Backoffice />
            </PrivateRoute>
          }
        />
        <Route path="/updatePokemon" element={<UpdatePokemon />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/newsletter" element={<Newsletter />} />

        <Route
          path="/messages/:sender/:receiver"
          element={<MessageDetails />}
        />
      </Routes>
    </section>
  );
}
