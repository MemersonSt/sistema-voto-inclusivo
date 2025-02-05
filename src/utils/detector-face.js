export class DetectorFace {
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

  // Función para dar instrucciones por voz
  speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-ES";
    utterance.rate = 1;
    this.speechSynthesis.speak(utterance);
  }

  // Función para verificar si hay más de un rostro en cámara
  async initFaceDetection() {
    const { FaceDetector } = await import("@mediapipe/face_detection");
    const faceDetector = new FaceDetector({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
    });

    faceDetector.setOptions({
      minDetectionConfidence: 0.5,
    });

    faceDetector.onResults((results) => {
      if (results.detections.length > 1) {
        console.warn("⚠️ Múltiples personas detectadas");
        this.speak(
          "Múltiples personas detectadas. Solo una persona debe estar en la cámara."
        );
      }
    });

    const { Camera } = await import("@mediapipe/camera_utils");
    new Camera(this.videoElement, {
      onFrame: async () => {
        await faceDetector.send({ image: this.videoElement });
      },
    }).start();
  }
}
