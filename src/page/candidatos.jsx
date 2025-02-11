import { useContext, useEffect } from "react"
import PartidosPolitos from "../json/paridos-politicos.json";
import Voz from "../utils/voz";
import { VisionArtificialContext } from "../context/visionArtificialContext";

export default function Candidatos() {
  const { videoref, canvasRef, containerRef, dimensions, candidatoSelect } =
    useContext(VisionArtificialContext);

  const generateImgNmae = (partido) => {
    const siglas = partido
      .split(" ")
      .map((word) => word[0])
      .join("");
    return `${siglas}`;
  };

  useEffect(() => {
    console.log("Candidatos", candidatoSelect);
  }, [candidatoSelect]);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-1 ">
      <div className="flex flex-row justify-between items-center gap-4 rounded-2xl p-4">
        {PartidosPolitos.map((partido) => (
          <div
            key={partido.nombre}
            className={`flex flex-col items-center rounded-2xl text-black p-2 ${
              candidatoSelect.posicion === partido.posicion
                ? "bg-blue-400 p-4 rounded-lg"
                : "bg-gray-400"
            }`}
          >
            <h3>{partido.posicion}</h3>
            <div className="w-30 h-30 rounded-full bg-gray-300 flex items-center justify-center">
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
        <div
          ref={containerRef}
          className="relative flex justify-center items-center w-full h-full"
        >
          <video
            ref={videoref}
            className="absolute w-full h-full object-cover"
            autoPlay
            playsInline
            muted
          />
          <canvas
            ref={canvasRef}
            width={dimensions.width}
            height={dimensions.height}
            className="absolute"
            style={{
              top: 0,
              left: 0,
              backgroundColor: "transparent",
              zIndex: 10,
            }}
          />
        </div>
      </div>
    </div>
  );
}
