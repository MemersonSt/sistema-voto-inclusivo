import VisionArtificialCamara from "../components/vision-artificial-camara";
import Voz from "../utils/voz";
import PartidosPolitos from "../json/paridos-politicos.json";
import { useEffect, useState } from "react";

export default function RealizarVoto() {
  // const [candidatos, setCandidatos] = useState(PartidosPolitos || []);
  // const 

  const iniciarPresentacion = () => {
    const voz = new Voz();
    voz.speak("A continuación se presentarán los candidatos.");
    PartidosPolitos.forEach((partido) => {
      voz.speak(
        `El partido ${partido.nombre} tiene como candidato a la presidencia a ${partido.presidente} y como candidato a la vicepresidencia a ${partido.vicepresidente}.`
      );
    });
  };

  useEffect(() => {
    setTimeout(() => {
      iniciarPresentacion();
    }, 1000);
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-1/2 h-1/2">
        <VisionArtificialCamara />
      </div>
    </div>
  );
}
