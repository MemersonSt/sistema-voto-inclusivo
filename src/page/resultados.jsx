import { useState, useEffect } from "react";
import styles from "../styles/style-resultados.module.css";
import Candidato from "../components/candidato";
import partidosPoliticos from "../json/paridos-politicos.json";

export default function Resultados() {
  const [votos, setVotos] = useState(partidosPoliticos.map(() => 0));

  useEffect(() => {
    // Mostrar todos los elementos guardados en el localStorage
    console.log("Elementos guardados en localStorage:");
    if (localStorage.length == 0) {
      console.log("No hay elementos guardados en localStorage");
    } else {
      for (let i = 0; i < localStorage.length; i++) {
        console.log(`Elemento ${i + 1}`);
        const key = localStorage.key(i); // Obtener la clave
        const value = localStorage.getItem(key); // Obtener el valor
        console.log(`Clave: ${key}, Valor: ${value}`);
      }
    }

    const votosActualizados = partidosPoliticos.map((candidato) => {
      // Obtener los votos guardados en localStorage para cada partido
      const votosGuardados = localStorage.getItem(candidato.lista);

      // Mostrar los votos guardados en la consola
      console.log(
        `Votos para el partido ${candidato.nombre}: ${votosGuardados}`
      );

      // Si no hay votos guardados, se pone 0, si los hay se parsean a número
      return votosGuardados ? parseInt(votosGuardados) : 0;
    });

    setVotos(votosActualizados);
  }, []);

  return (
    <div className={styles.bodycontainer}>
      <h2 className={styles.title}>Resultados de las votaciones</h2>
      <div className={styles.gridContainer}>
        {partidosPoliticos.map((candidato) => (
          <Candidato
            key={candidato.posicion}
            candidato={candidato}
            votos={votos.votos}
          />
        ))}
      </div>
    </div>
  );
}
