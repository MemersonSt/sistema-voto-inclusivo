import { useEffect, useRef, useState } from "react";
import { Camera } from "@mediapipe/camera_utils";
import { Hands } from "@mediapipe/hands";
import { useLocation, useNavigate } from "react-router-dom";
import PartidosPoliticos from "../json/paridos-politicos.json";
import Voz from "../utils/voz";

export default function VisionArtificialCamara() {
  const videoref = useRef(null);
  const canvasRef = useRef(null);
  const handsRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isHandDetected, setIsHandDetected] = useState(false);
  const [fingersUp, setFingersUp] = useState(0);
  const [candidatoSelect, setCandidatoSelect] = useState({});
  const [startVatation, setStartVatation] = useState(false);

  const rutas = {
    presentacion: "/",
    instrucciones: "/elecciones/instrucciones",
    candidatos: "/elecciones/candidatos",
    votacion: "/elecciones/votacion",
  };

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const countFingersUp = (landmarks) => {
    let fingersUp = 0;

    // Thumb (Pulgar)
    if (landmarks[4].x < landmarks[0].x) {
      if (landmarks[4].x < landmarks[2].x) fingersUp++;
    } else {
      if (landmarks[4].x > landmarks[2].x) fingersUp++;
    }

    // Otros dedos
    const fingerTips = [8, 12, 16, 20];
    fingerTips.forEach((tip) => {
      if (landmarks[tip].y < landmarks[tip - 2].y) fingersUp++;
    });

    return fingersUp;
  };

  useEffect(() => {
    const video = videoref.current;
    const canvas = canvasRef.current;

    if (!video || !canvas || dimensions.width === 0 || dimensions.height === 0)
      return;

    const hands = new Hands({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.8,
      minTrackingConfidence: 0.8,
    });

    hands.onResults((results) => {
      const canvasCtx = canvas.getContext("2d");
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

      if (results.multiHandLandmarks) {
        let fingerTotal = 0;
        results.multiHandLandmarks.forEach((landmarks) => {
          fingerTotal += countFingersUp(landmarks);
          if (fingerTotal > 0) setIsHandDetected(true);
          // Dibujar landmarks
          canvasCtx.save();
          canvasCtx.fillStyle = "red";
          landmarks.forEach((point) => {
            canvasCtx.beginPath();
            canvasCtx.arc(
              point.x * canvas.width,
              point.y * canvas.height,
              5,
              0,
              2 * Math.PI
            );
            canvasCtx.fill();
          });
          canvasCtx.restore();
        });

        setFingersUp(fingerTotal);

        // Mostrar la cantidad de dedos levantados en el canvas
        canvasCtx.save();
        canvasCtx.font = `bold ${
          Math.min(dimensions.width, dimensions.height) * 0.05
        }px Arial, sans-serif`;
        canvasCtx.fillStyle = "white";
        canvasCtx.textAlign = "center";
        canvasCtx.textBaseline = "middle";

        const text = `Fingers up: ${fingerTotal}`;
        const textX = canvas.width / 2;
        const textY = 40;
        const padding = 10;
        const textWidth = canvasCtx.measureText(text).width + padding * 2;
        const textHeight = Math.min(dimensions.width, dimensions.height) * 0.1;

        canvasCtx.fillStyle = "rgba(0, 0, 0, 0.6)";
        canvasCtx.fillRect(
          textX - textWidth / 2,
          textY - textHeight / 2,
          textWidth,
          textHeight
        );

        canvasCtx.fillStyle = "white";
        canvasCtx.shadowColor = "black";
        canvasCtx.shadowBlur = 5;
        canvasCtx.fillText(text, textX, textY);

        canvasCtx.restore();
      } else {
        setIsHandDetected(false);
      }
    });

    handsRef.current = hands;

    const camera = new Camera(video, {
      onFrame: async () => {
        await hands.send({ image: video });
      },
      width: dimensions.width,
      height: dimensions.height,
    });

    camera.start();

    return () => {
      hands.close();
      camera.stop();
    };
  }, [dimensions]);

  useEffect(() => {
    if (fingersUp === 10 && location.pathname === rutas.instrucciones) {
      console.log("Votación iniciada");
      setFingersUp(0);
      setIsHandDetected(false);
      setTimeout(() => {
        navigate(rutas.votacion);
      }, 3000);
    }
    if (location.pathname === rutas.votacion && startVatation === true) {
      console.log("Votación en curso");
      setTimeout(() => {
        const exists = PartidosPoliticos[fingersUp];
        if (!exists) return;
        setCandidatoSelect(PartidosPoliticos[fingersUp]);
        const voz = new Voz();
        voz.speak(`Usted ha seleccionado a ${candidatoSelect.nombre}`);
      }, 3000);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fingersUp]);

  useEffect(() => {
    if (isHandDetected && location.pathname === rutas.presentacion) {
      console.log("Mano detectada");
      setFingersUp(0);
      setIsHandDetected(false);
      setTimeout(() => {
        navigate(rutas.instrucciones);
      }, 3000);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHandDetected]);

  // useEffect(() => {
  //   const voz = new Voz();
  //   voz.speak(`Usted ha seleccionado a ${candidatoSelect.nombre}`);
  // }, [candidatoSelect]);

  useEffect(() => {
    if (location.pathname === rutas.votacion && fingersUp === 10) {
      setStartVatation(true);
    }
  }, [fingersUp]);

  return (
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
        style={{ top: 0, left: 0, backgroundColor: "transparent", zIndex: 10 }}
      />
    </div>
  );
}
