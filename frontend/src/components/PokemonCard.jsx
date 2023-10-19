import PropTypes from "prop-types";

export default function PokemonCard({ details }) {
  return (
    details && (
      <div className="pokemon_card">
        <h2>{details.name}</h2>
        <img src={details.image} alt="" />
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
