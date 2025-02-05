import { useEffect, useState, useRef } from "react";
import DetectorHands from "../utils/detector-hands";

export default function RealizarVoto() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [voto, setVoto] = useState(null);

  useEffect(() => {
    const initDetector = async () => {
      if (videoRef.current) {
        const detector = new DetectorHands(videoRef.current);
        await detector.initCamera();
        await detector.initHandDetection(); // Iniciar detección de manos
        setVoto(detector);
      }
    };

    initDetector().catch((error) => {
      console.error("Error initializing hand detector:", error);
    });
  }, []);

  return (
    <div className="p-4 text-center">
      <h1 className="text-xl font-bold mb-4">Sistema de Votación Accesible</h1>
      <div className="flex flex-col items-center relative">
        <video
          ref={videoRef}
          className="absolute"
          autoPlay
          playsInline
          width={640}
          height={480}
        />
        <canvas
          ref={canvasRef}
          width={640}
          height={480}
          className="absolute"
          style={{ backgroundColor: "transparent" }}
        />
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
        📢 Escuchar instrucciones
      </button>
    </div>
  );
}
