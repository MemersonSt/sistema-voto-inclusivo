import { PropTypes } from "prop-types";
import { useNavigate } from "react-router-dom";

ButtonDir.propTypes = {
  texto: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

// Componente ButtonDir
export function ButtonDir({ texto, url }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(url); // Redirige a la URL proporcionada
  };

  return (
    <button style={style.button} onClick={handleClick}>
      {texto} {/* Texto que se pasa como prop */}
    </button>
  );
}

// Estilo del botón
const style = {
  button: {
    backgroundColor: "#3498db", // Color de fondo azul
    color: "white", // Color del texto
    padding: "10px 20px", // Espaciado interior (arriba/abajo, izquierda/derecha)
    border: "none", // Elimina el borde
    borderRadius: "5px", // Bordes redondeados
    cursor: "pointer", // Cambia el cursor cuando pasa sobre el botón
    fontSize: "16px", // Tamaño de la fuente
    fontWeight: "bold", // Negrita en el texto
    textAlign: "center", // Alineación del texto
    transition: "background-color 0.3s ease", // Efecto de transición cuando cambia el color
    margin: "10px", // Añadir espacio alrededor del botón
    display: "block", // Convertir el botón a un bloque
    marginLeft: "auto", // Asegura que se alinee automáticamente a la izquierda
    marginRight: "auto", // Asegura que se alinee automáticamente a la derecha
  },
};

export default ButtonDir;
