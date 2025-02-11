import partido from "../json/paridos-politicos.json";

export default function actualizarVoto(NumeroLista) {

  console.log("Esta usando esta funcion");

  const partidoEncontrado = partido.find(p => p.lista === NumeroLista);

  if (partidoEncontrado) {
    let votos = parseInt(localStorage.getItem(partidoEncontrado.lista)) || 0;

    console.log(`Votos actuales para ${partidoEncontrado.nombre}:`, votos); // Muestra votos actuales en consola

    votos++;

    localStorage.setItem(partidoEncontrado.lista, votos);

    console.log(`Voto actualizado para el partido: ${partidoEncontrado.nombre}. Total de votos: ${votos}`);
  } else {
    console.log("Partido no encontrado");
  }
}
