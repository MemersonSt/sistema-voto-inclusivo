import PropTypes from "prop-types";

function CardCandidation({ candidato }) {
  return (
    <div className="bg-yellow-50 rounded-md p-4">
      <h2>{candidato.nome}</h2>
      <p>{candidato.cargo}</p>
    </div>
  );
}

CardCandidation.propTypes = {
  candidato: PropTypes.shape({
    nome: PropTypes.string.isRequired,
    cargo: PropTypes.string.isRequired,
  }).isRequired,
};
