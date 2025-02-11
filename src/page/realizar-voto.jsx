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

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-1/2 h-1/2">
        <VisionArtificialCamara />
      </div>
    </div>
  );
}
