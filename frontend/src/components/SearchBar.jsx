import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SearchBar() {
  const [userResearch, setUserResearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/search/${userResearch}`);
  };

  const handleSearch = (event) => {
    setUserResearch(event.target.value);
  };

  return (
    <form className="search_bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Cherchez un pokémon..."
        onChange={handleSearch}
      />
      <input type="submit" value="Rechercher" />
    </form>
  );
}
