import { useContext } from "react";
import { Link } from "react-router-dom";
import ExportContext from "../contexts/Context";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const { infoUser } = useContext(ExportContext.Context);

  return (
    <nav>
      <div className="logo">
        <img src="/images/logo.png" alt="pokeball" />
      </div>
      <p>{infoUser.email ? infoUser.email : ""}</p>
      <ul>
        <li>
          <Link to="/">Accueil</Link>
        </li>
        <li>
          <Link to="/pokedex">Pokedex</Link>
        </li>

        {infoUser.role === "user" ? (
          <li>
            <Link to="/messages">Messages</Link>
          </li>
        ) : (
          ""
        )}

        {infoUser.role === "admin" ? (
          <>
            <li>
              <Link to="/backoffice">Backoffice</Link>
            </li>

            <li>
              <Link to="/updatePokemon">UpdatePokemon</Link>
            </li>
          </>
        ) : (
          ""
        )}
        {infoUser.role === "admin" || infoUser.role === "user" ? (
          ""
        ) : (
          <>
            {" "}
            <li>
              <Link to="/register">S'enregistrer</Link>
            </li>
            <li>
              <Link to="/login">Se connecter</Link>
            </li>
          </>
        )}
      </ul>
      <SearchBar />
    </nav>
  );
}
