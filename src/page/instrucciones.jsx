import { useEffect } from "react";
import { presentacionTexto } from "../TextAudios/text-instrucciones.js";
import styles from "../styles/style-instrucciones.module.css";
import VisionArtificialCamara from "../components/vision-artificial-camara";
import Voz from "../utils/voz";

export default function Instrucciones() {
//   const botAudio = () => {
//     const voz = new Voz();
//     voz.speak(presentacionTexto);
//     [];
//   };

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       botAudio();
//     }, 2000);
//     return () => clearTimeout(timer);
//   }, []);

  return (
    <>
      {/* <HeaderComp /> */}
      <div className={styles.mainContainer}>
        <div className={styles.innerContainer}>
          <div className={styles.infoBox}>
            <h2>Instrucciones</h2>
            <ol>
              <li>
                1. Antes de ejercer su voto, tendrá que realizar un gesto con
                las manos. Para ello, deberá juntar las palmas de las manos y
                separarlas con las palmas hacia el frente.
              </li>
              <li>
                2. Para confirmar su voto, deberá levantar la cantidad de dedos
                que corresponda al número del partido político que desea votar
                durante 5 segundos. Por ejemplo, si el partido político se
                encuentra en el número uno, deberá levantar solo un dedo.
              </li>
              <li>
                3. Luego de realizar el voto, deberá esperar la confirmación del
                asistente de voz.
              </li>
            </ol>
          </div>
        </div>
      </div>
      <div className={styles.videoHand}>
        <VisionArtificialCamara />
      </div>
    </>
  );
}
