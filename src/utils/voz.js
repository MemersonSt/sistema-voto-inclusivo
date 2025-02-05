export default class Voz {
  constructor() {
    this.speechSynthesis = window.speechSynthesis;
  }

  // Función para dar instrucciones por voz
  speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-ES";
    utterance.rate = 1;
    this.speechSynthesis.speak(utterance);
  }
}
