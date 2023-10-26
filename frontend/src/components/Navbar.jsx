import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function Navbar() {
  return (
    <nav>
      <div className="logo">
        <img src="/images/logo.png" alt="pokeball" />
      </div>
      <ul>
        <li>
          <Link to="/">Accueil</Link>
        </li>
        <li>
          <Link to="/pokedex">Pokedex</Link>
        </li>
        <li>
          <Link to="/backoffice">Backoffice</Link>
        </li>
        <li>
          <Link to="/updatePokemon">UpdatePokemon</Link>
        </li>
        <li>
          <Link to="/register">S'enregistrer</Link>
        </li>
      </ul>
      <SearchBar />
    </nav>
  );
}
