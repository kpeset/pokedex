import PropTypes from "prop-types";

export default function PokemonCard({ details }) {
  const imageUrl = `${import.meta.env.VITE_BACKEND_URL}/uploads/${
    details.image
  }`;

  return (
    details && (
      <div className="pokemon_card">
        <h2>{details.name}</h2>
        <img src={imageUrl} alt="" />
      </div>
    )
  );
}

PokemonCard.propTypes = {
  details: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};
