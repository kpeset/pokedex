import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard";

export default function SearchResult() {
  const [dataName, setDataName] = useState([]);
  const [dataType, setDataType] = useState([]);
  const [errorName, setErrorName] = useState(false);
  const [errorType, setErrorType] = useState(false);
  const { userResearch } = useParams();

  const searchName = () => {
    axios
      .get(`http://localhost:5000/pokemon/name/${userResearch}`)
      .then((response) => {
        setDataName(response.data);
      })
      .catch((err) => {
        console.error(err);
        setErrorName(true);
      });
  };

  const searchType = () => {
    axios
      .get(`http://localhost:5000/pokemon/type/${userResearch}`)
      .then((response) => {
        setDataType(response.data);
      })
      .catch((err) => {
        console.error(err);
        setErrorType(true);
      });
  };

  useEffect(() => {
    searchName();
    searchType();
  }, []);

  return (
    <>
      <div className="pokemon_results">
        <h2>Résultat de la recherche pour le pokemon : {userResearch}</h2>
        <div className="pokemon_list">
          {!errorName ? (
            dataName.map((result) => (
              <PokemonCard key={result.id} details={result} />
            ))
          ) : (
            <p>Aucun résultat</p>
          )}
        </div>
      </div>

      <div className="type_results">
        <h2>Résultat de la recherche pour le type : {userResearch}</h2>
        <div className="pokemon_list">
          {!errorType ? (
            dataType.map((result) => (
              <PokemonCard key={result.id} details={result} />
            ))
          ) : (
            <p>Aucun résultat</p>
          )}
        </div>
      </div>
    </>
  );
}
