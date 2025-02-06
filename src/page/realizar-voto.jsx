import { useEffect, useRef } from "react";
import { Camera } from "@mediapipe/camera_utils";
import { Hands } from "@mediapipe/hands";

export default function RealizarVoto() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;

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
      const canvasCtx = canvasRef.current.getContext("2d");
      canvasCtx.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      if (results.multiHandLandmarks) {
        // console.log(results.multiHandLandmarks);
        let fingersUp = 0;
        results.multiHandLandmarks.forEach((landmarks) => {
          // Thumb
          if (landmarks[5].x < landmarks[4].x) fingersUp++;

          // Other fingers
          const fingerTips = [8, 12, 16, 20];
          fingerTips.forEach((tip) => {
            if (landmarks[tip].y < landmarks[tip - 2].y) fingersUp++;
          });

          // Draw landmarks
          landmarks.forEach((point) => {
            canvasCtx.beginPath();
            canvasCtx.arc(
              point.x * canvasRef.current.width,
              point.y * canvasRef.current.height,
              5,
              0,
              2 * Math.PI
            );
            canvasCtx.fillStyle = "red";
            canvasCtx.fill();
          });
        });
        // Draw number of fingers up
        canvasCtx.font = "30px Arial";
        canvasCtx.fillStyle = "red";
        canvasCtx.fillText(`Fingers up: ${fingersUp}`, 10, 50);
      }
    });

    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        await hands.send({ image: videoRef.current });
      },
      width: 640,
      height: 480,
    });
    camera.start();
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
