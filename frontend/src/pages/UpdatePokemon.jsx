import { useState, useEffect } from "react";
import axios from "axios";

export default function UpdatePokemon() {
  const [pokemonList, setPokemonList] = useState([]);

  const [selectedPokemon, setSelectedPokemon] = useState({
    id: null,
    name: "",
    type: "",
    weight: "",
    image: "",
  });

  const [selectedValue, setSelectedValue] = useState("");

  const getPokemonList = () => {
    axios.get(`http://localhost:5000/pokemon`).then((response) => {
      setPokemonList(response.data);
    });
  };

  const getOnePokemon = (id) => {
    axios.get(`http://localhost:5000/pokemon/${id}`).then((response) => {
      setSelectedPokemon({
        id: response.data.id || null,
        name: response.data.name || "",
        type: response.data.type || "",
        weight: response.data.weight || "",
        image: response.data.image || "",
      });
    });
  };

  const updatePokemon = (id) => {
    axios
      .put(`http://localhost:5000/pokemon/${id}`, {
        name: selectedPokemon.name,
        type: selectedPokemon.type,
        weight: selectedPokemon.weight,
        image: selectedPokemon.image,
      })
      .then((response) => {
        console.info(response);
      });
  };

  useEffect(() => {
    getPokemonList();
  }, []);

  useEffect(() => {
    getOnePokemon(selectedValue);
  }, [selectedValue]);

  useEffect(() => {
    console.info(selectedPokemon);
  }, [selectedPokemon]);

  return (
    <div className="update_pokemon_panel">
      <h1>Update Pokemon</h1>
      <select
        onChange={(event) => setSelectedValue(event.target.value)}
        value={selectedValue}
      >
        <option value="">Sélectionne un pokemon</option>
        {pokemonList.map((pokemon) => (
          <option key={pokemon.id} value={pokemon.id}>
            {pokemon.id} - {pokemon.name}
          </option>
        ))}
      </select>
      <div>
        {selectedPokemon && (
          <form onSubmit={() => updatePokemon(selectedPokemon.id)}>
            <input
              type="text"
              placeholder={selectedPokemon.name}
              value={selectedPokemon.name}
              onChange={(event) =>
                setSelectedPokemon({
                  ...selectedPokemon,
                  name: event.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder={selectedPokemon.type}
              value={selectedPokemon.type}
              onChange={(event) =>
                setSelectedPokemon({
                  ...selectedPokemon,
                  type: event.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder={selectedPokemon.weight}
              value={selectedPokemon.weight}
              onChange={(event) =>
                setSelectedPokemon({
                  ...selectedPokemon,
                  weight: event.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder={selectedPokemon.image}
              value={selectedPokemon.image}
              onChange={(event) =>
                setSelectedPokemon({
                  ...selectedPokemon,
                  image: event.target.value,
                })
              }
            />
            <input
              style={{ backgroundColor: "green", color: "white" }}
              type="submit"
              value="Enregistrer"
            />
          </form>
        )}
      </div>
    </div>
  );
}
