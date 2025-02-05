import PartidosPolitos from "../json/paridos-politicos.json";
import Voz from "../utils/voz";

export default function Candidatos() {
  const iniciarPresentacion = () => {
    const voz = new Voz();
    // voz.speak("A continuación se presentarán los candidatos.");
    const text = `
      Hola, soy una asistente de voz en la cual te presentaré los candidatos a la presidencia de la república y a la vecipresidencia de la república.
      Esta presentacion es solo informativa y no tiene fines de propaganda política.
      Pero antes indicaré las intrucciones para que puedas realizar el voto de manera correcta.
      Antes de ejercer su voto tendrá que realizar un gesto con las dos manos, en el cual deberá juntar las palmas de las manos y separarlas 
      con las palmas hacian al frente.
      Para confirmar su voto deberá leventar la cantidad de dedosn que corresponda al número del partido político que desea votar.
      Por ejemplo si el partido politico se encuentra en el numero uno deberá levantar un dedo.
      luego de realizar el voto deberá esperar la confirmación de la asistente de voz.
    `;
    voz.speak(text);
    voz.speak("A continuación se presentarán los candidatos.");
    PartidosPolitos.forEach((partido) => {
      voz.speak(
        `El partido ${partido.nombre} tiene como candidato a la presidencia a ${partido.presidente} y como candidato a la vicepresidencia a ${partido.vicepresidente}.`
      );
    });
  };

  const generateImgNmae = (partido) => {
    const siglas = partido
      .split(" ")
      .map((word) => word[0])
      .join("");
    return `${siglas}.png`;
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="font-bold text-2xl">Candidatos</h1>
      <p>En esta página se muestra la lista de candidatos.</p>
      <div className="grid grid-cols-3 gap-4 rounded-2xl p-4">
        {PartidosPolitos.map((partido) => (
          <div key={partido.nombre} className="flex flex-col items-center">
            <h3>{partido.posicion}</h3>
            <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center">
              {generateImgNmae(partido.nombre)}
            </div>
            <h2 className="font-bold text-lg text-center">{partido.nombre}</h2>
            <ul>
              <li>{partido.presidente}</li>
              <li>{partido.vicepresidente}</li>
            </ul>
          </div>
        ))}
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-4xl mt-4 font-bold"
        onClick={iniciarPresentacion}
      >
        Presentar candidatos
      </button>
    </div>
  );
}
