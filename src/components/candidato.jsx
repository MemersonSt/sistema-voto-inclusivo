import styles from "../styles/style-resultados.module.css";
import PropTypes from "prop-types";

Candidato.propTypes = {
  candidato: PropTypes.shape({
    lista: PropTypes.string,
    nombre: PropTypes.string,
    presidente: PropTypes.string,
    vicepresidente: PropTypes.string,
  }),
  votos: PropTypes.number,
};

export default function Candidato({ candidato, votos }) {
  return (
    <div className={styles.card}>
      <div className={styles.candidato}>
        <h3>Candidato</h3>
        <p>
          <strong>Lista:</strong> {candidato.lista}
        </p>
        <p>
          <strong>Nombre:</strong> {candidato.nombre}
        </p>
        <p>
          <strong>Presidente:</strong> {candidato.presidente}
        </p>
        <p>
          <strong>Vicepresidente:</strong> {candidato.vicepresidente}
        </p>
      </div>
      <div className={styles.votacion}>
        <h3>Votación</h3>
        <p>{votos}</p>
      </div>
    </div>
  );
}
