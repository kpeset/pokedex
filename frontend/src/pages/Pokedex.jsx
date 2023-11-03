import { useState, useEffect } from "react";
import axios from "axios";
import PokemonCard from "../components/PokemonCard";

export default function Pokedex() {
  const [data, setData] = useState([]);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/pokemon`, {
        withCredentials: true,
      })
      .then((response) => {
        setData(response.data);
        setIsAllowed(true);
        console.info(response);
      })
      .catch((err) => {
        console.error(err);
        setIsAllowed(false);
      });
  }, []);

  const displayPokemonList = () => {
    return (
      <div className="pokemon_list">
        {data.map((pokemon) => (
          <PokemonCard key={pokemon.id} details={pokemon} />
        ))}
      </div>
    );
  };

  return (
    <>
      <h1>Liste des pokemon</h1>
      <p>Ici se trouve la liste des pokemons de l'univers de la série</p>

      {isAllowed
        ? displayPokemonList()
        : "Accès pas autorisé, veuillez vous connecter !"}
    </>
  );
}
