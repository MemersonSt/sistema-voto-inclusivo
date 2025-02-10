import stylesPre from "../styles/style-presentation.module.css";
import ButtonDir from "../design-component/button_dir";
import VisionArtificialCamara from "../components/vision-artificial-camara";

export default function Presentation() {
  return (
    <>
      {/* <HeaderComp /> */}
      <div className={stylesPre.mainContainer}>
        <div className={stylesPre.innerContainer}>
          <div className={stylesPre.infoBox}>
            <h2>Información del Proyecto</h2>
            <p>
              Este proyecto tiene como objetivo mejorar la accesibilidad en los
              procesos electorales en Ecuador, proporcionando una solución
              innovadora para personas con discapacidad visual. A través de la
              integración de tecnologías como la visión artificial y sistemas de
              audio, buscamos garantizar que todas las personas,
              independientemente de su discapacidad, puedan participar de manera
              equitativa en los procesos de votación. Nuestra aplicación está
              diseñada para ser intuitiva, segura y completamente inclusiva,
              promoviendo un entorno más accesible en la democracia.
            </p>
          </div>
          <div className={stylesPre.videoHand}>
            <VisionArtificialCamara />
          </div>
        </div>
      </div>

      {/* Margen superior para separación */}
      <div style={{ marginTop: "20px" }}>
        <ButtonDir texto="Ir a Candidatos" url="/instrucciones" />
      </div>
    </>
  );
}
