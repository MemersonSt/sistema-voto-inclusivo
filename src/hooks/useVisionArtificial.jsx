import { useContext } from "react";
import { VisionArtificialContext } from "../context/visionArtificialContext";

export function useVisionArtificial() {
  return useContext(VisionArtificialContext);
}
