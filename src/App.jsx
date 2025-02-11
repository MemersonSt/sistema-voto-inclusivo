import { VisionArtificialProvider } from "./context/visionArtificialContext";
import Routes from "./routes";

export default function App() {
  return (
    <VisionArtificialProvider>
      <Routes />
    </VisionArtificialProvider>
  );
}
