const letraAhorcado = document.querySelector("#letra");
const palabraEntera = document.querySelector("#palabra");
const ahorcadoMuñeco = document.querySelectorAll("#hangman > *");
let i = 0;
let palabraSecreta;
const palabra = document.querySelector(".palabra");
const cajas = document.querySelectorAll(".letraPalabra");
const caja = document.querySelectorAll(".letraPalabra");

const palabraAleatoria = (array) => {
  palabraSecreta = array[Math.floor(Math.random() * array.length)];
  console.log(palabraSecreta);
  return palabraSecreta;
};
const obtenerPalabra = async () => {
  const promesaPalabras = await fetch("../palabras.json");
  const palabras = await promesaPalabras.json();
  const lista = palabras.palabras.lista;
  return palabraAleatoria(lista);
};
/* const comprobarLetra = (letra) => {
  if (letraAhorcado.value === letra && i > 0) {
    contenedorLetra.textContent = letra;
  } else if (letraAhorcado !== letra && i >= 0) {
    ahorcadoMuñeco[i].classList.remove("esconder");
    i--;
  } else if (i < 0) {
    alert("HAS PERDIDO");
  }
}; */
let stringComprobar = "";
(async () => {
  const palabraJuego = await obtenerPalabra();
  const palabraSeparada = palabraJuego.split("");
  for (const letra of palabraSeparada) {
    const moldeLetras = palabra.cloneNode(true);
    const contenedorLetra = document.createElement("span");
    contenedorLetra.classList.add("letraPalabra");
    palabra.append(contenedorLetra);
  }
})();

letraAhorcado.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const letra = e.target.value;

    e.target.value = "";
    comprobarLetra(letra);
  }
});

const comprobarLetra = (letra) => {
  letra = letra.toLowerCase();
  anyadirLetraUsada(letra);
  console.log(letra);
  if (palabraSecreta.includes(letra)) {
    acierto(letra);
  } else {
    fallo();
  }
};
const anyadirLetraUsada = (letraUsada) => {
  const letraMolde = document.createElement("span");
  const padreMolde = document.querySelector(".letraUsada");
  letraMolde.classList.add("letraUsadaCaja");
  letraMolde.classList.add("col-1");
  letraMolde.textContent = letraUsada;
  padreMolde.append(letraMolde);
};
const acierto = (letraAcertada) => {
  palabraSecreta.split("").forEach((letra, i) => {
    if (letra === letraAcertada) {
      const hueco = palabra.querySelector(`span:nth-child(${i + 1})`);
      hueco.textContent = letra;
    }
  });

  const letrasAcertadas = [...palabra.querySelectorAll(".letraPalabra")].map(
    (letra) => letra.textContent
  );

  if (letrasAcertadas.join("") === palabraSecreta) {
    alert("ganaste pendejo");
    letraAhorcado.disabled = true;
  }
  console.log(letraAcertada);
  console.log(letrasAcertadas);
};

const fallo = () => {
  document.querySelector(`.stage${++i}`).classList.remove("esconder");
  if (i === 10) {
    alert("Has perdido");
    letraAhorcado.disabled = true;
  }
};
