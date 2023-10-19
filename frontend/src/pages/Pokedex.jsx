import { useState, useEffect } from "react";
import axios from "axios";
import PokemonCard from "../components/PokemonCard";

export default function Pokedex() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/pokemon/`).then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <div className="pokemon_list">
      {data.map((pokemon) => (
        <PokemonCard key={pokemon.id} details={pokemon} />
      ))}
    </div>
  );
}
