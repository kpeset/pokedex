import { useState, useEffect } from "react";
import axios from "axios";

export default function Backoffice() {
  const [pokemonList, setPokemonList] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [weight, setWeight] = useState("");
  const [image, setImage] = useState("");

  const getPokemonList = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/pokemon`)
      .then((response) => {
        setPokemonList(response.data);
      });
  };

  const addPokemon = (event) => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("type", type);
    formData.append("weight", weight);
    formData.append("image", image);

    event.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/pokemon`, formData)
      .then((response) => {
        console.info(response);
      });
    getPokemonList();
  };

  const deletePokemon = (id) => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/pokemon/${id}`)
      .then((response) => {
        console.info(response);
      });
    getPokemonList();
  };

  useEffect(() => {
    getPokemonList();
  }, [pokemonList]);

  return (
    <div className="backoffice_content">
      <h1>Backoffice</h1>
      <p>Gestion des pokemon</p>

      <form onSubmit={addPokemon}>
        <label htmlFor="name">Nom du pokemon</label>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <label htmlFor="type">Type du pokemon</label>
        <input
          type="text"
          value={type}
          onChange={(event) => setType(event.target.value)}
        />
        <label htmlFor="weight">Poids du pokemon</label>
        <input
          type="text"
          value={weight}
          onChange={(event) => setWeight(event.target.value)}
        />
        <label htmlFor="image">Image du pokemon</label>
        <input
          type="file"
          onChange={(event) => setImage(event.target.files[0])}
        />
        <input type="submit" value="Ajouter" />
      </form>

      <ul>
        {pokemonList.map((pokemon) => (
          <li key={pokemon.id}>
            <p>
              {pokemon.id} - {pokemon.name}
            </p>
            <button type="button" onClick={() => deletePokemon(pokemon.id)}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
