const letraAhorcado = document.querySelector("#letra");
const palabraEntera = document.querySelector("#palabra");
const ahorcadoMuñeco = document.querySelectorAll("#hangman > *");
let i = 9;
const palabra = document.querySelector(".palabra");
const cajas = document.querySelectorAll(".letraPalabra");

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
let stringComprobar = "";
const ahorcado = async () => {
  const palabraJuego = await obtenerPalabra();
  const palabraSeparada = palabraJuego.split("");
  for (const letra of palabraSeparada) {
    const moldeLetras = palabra.cloneNode(true);
    const contenedorLetra = moldeLetras.querySelector(".letraPalabra");
    contenedorLetra.classList.remove("molde");
    palabra.append(contenedorLetra);
  }
  const cajas = document.querySelectorAll(".letraPalabra");

  letraAhorcado.addEventListener("keypress", (e) => {
    const cajasComprobar = cajas[(1, cajas.length - 1)];
    if (palabraJuego.includes(letraAhorcado.value) && e.key === "Enter") {
      for (const valor of cajas) {
        stringComprobar += valor.textContent;
      }
      for (const [i, v] of palabraSeparada.entries()) {
        if (letraAhorcado.value === v) {
          cajas[i + 1].textContent = palabraSeparada[i];
        }
      }

      letraAhorcado.value = "";
    } else if (!palabraJuego.includes(letraAhorcado.value) && i >= 0) {
      ahorcadoMuñeco[i].classList.remove("esconder");
      letraAhorcado.value = "";
      i--;
      if (i < 0) {
        alert("LOSER");
      }
    }
    if (stringComprobar === palabraJuego) {
      alert("ganasteeee wiii");
    }
    stringComprobar = "";
  });
};
ahorcado();
