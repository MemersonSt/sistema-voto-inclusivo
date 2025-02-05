export default class DetectorHands {
  constructor(videoElement) {
    this.videoElement = videoElement;
    this.speechSynthesis = window.speechSynthesis;
    this.initCamera();
  }

  // Inicializar la cámara
  async initCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.videoElement.srcObject = stream;
    } catch (error) {
      console.error("Error al acceder a la cámara:", error);
      this.speak(
        "Error al acceder a la cámara. Por favor, verifique los permisos."
      );
    }
  }

  // Función para inicializar la detección de manos con MediaPipe
  async initHandDetection() {
    const { Hands } = await import("@mediapipe/hands");
    const hands = new Hands({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    hands.setOptions({
      maxNumHands: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    hands.onResults((results) => {
      if (results.multiHandLandmarks.length > 0) {
        console.log("Mano detectada");
        this.speak("Mano detectada. Realice su gesto para votar.");
      }
    });

    const { Camera } = await import("@mediapipe/camera_utils");
    new Camera(this.videoElement, {
      onFrame: async () => {
        await hands.send({ image: this.videoElement });
      },
    }).start();
  }
}
