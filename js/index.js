const letraAhorcado = document.querySelector("#letra");
const palabraEntera = document.querySelector("#palabra");
const ahorcadoMuñeco = document.querySelectorAll("#hangman > *");
let i = 9;
let letraContenedor = "";
const palabra = document.querySelector(".palabra");

const palabraAleatoria = (array) => {
  const palabra = array[Math.floor(Math.random() * array.length)];
  return palabra;
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
const ahorcado = async () => {
  const palabraJuego = await obtenerPalabra();
  console.log(palabraJuego);
  const palabraSeparada = palabraJuego.split("");
  for (const letra of palabraSeparada) {
    const moldeLetras = palabra.cloneNode(true);
    const contenedorLetra = moldeLetras.querySelector(".letraPalabra");
    contenedorLetra.classList.remove("molde");
    letraAhorcado.addEventListener("keypress", (e) => {});
    if (letraAhorcado.value === letra && e.key === "Enter") {
      contenedorLetra.textContent = letra;
    }
    palabra.append(contenedorLetra);
  }
};
ahorcado();
