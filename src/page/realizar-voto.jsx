import VisionArtificialCamara from "../components/vision-artificial-camara";
import Voz from "../utils/voz";
import PartidosPolitos from "../json/paridos-politicos.json";
import { useEffect, useState } from "react";

export default function RealizarVoto() {
  const [presentacionIniciada, setPresentacionIniciada] = useState(false);

  const iniciarPresentacion = () => {
    if (presentacionIniciada) return; // Verificación adicional

    setPresentacionIniciada(true);
    const voz = new Voz();
    voz.speak("A continuación se presentarán los candidatos.");
    PartidosPolitos.forEach((partido) => {
      voz.speak(
        `El partido ${partido.nombre} tiene como candidato a la presidencia a ${partido.presidente} y como candidato a la vicepresidencia a ${partido.vicepresidente}.`
      );
    });
  };

  useEffect(() => {
    if (presentacionIniciada) return; // Verificación adicional
    const timer = setTimeout(() => {
      iniciarPresentacion();
    }, 2000);

    return () => clearTimeout(timer); // Limpiar el temporizador en el desmontaje
  }, [presentacionIniciada]);

  const generateImgNmae = (partido) => {
    const siglas = partido
      .split(" ")
      .map((word) => word[0])
      .join("");
    return `${siglas}`;
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-1 ">
      <div className="flex flex-row justify-between items-center gap-4 rounded-2xl p-4">
        {PartidosPolitos.map((partido) => (
          <div key={partido.nombre} className="flex flex-col items-center">
            <h3>{partido.posicion}</h3>
            <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center">
              {generateImgNmae(partido.nombre)}
            </div>
            <h2 className="font-bold text-lg text-center">{partido.nombre}</h2>
            <ul>
              <li>{partido.presidente}</li>
              <li>{partido.vicepresidente}</li>
            </ul>
          </div>
        ))}
      </div>
      <div className="w-1/2 h-1/2 rounded-2xl p-4">
        <VisionArtificialCamara />
      </div>
    </div>
  );
}
