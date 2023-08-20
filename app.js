//
const bgJugador0 = document.querySelector(".jugador--0");
const bgJugador1 = document.querySelector(".jugador--1");
const puntaje0 = document.querySelector("#puntaje--0");
const puntaje1 = document.querySelector("#puntaje--1");
const actual0 = document.getElementById("actual--0");
const actual1 = document.getElementById("actual--1");

const dadoEl = document.querySelector(".dado");
const btnNuevo = document.querySelector(".btn--nuevo");
const btnRoll = document.querySelector(".btn--roll");
const btnMantener = document.querySelector(".btn--mantener");

let puntajes, puntajeActual, jugadorActivo, jugando;

// Inicializamos las condiciones
const init = function () {
  puntajes = [0, 0];
  puntajeActual = 0;
  jugadorActivo = 0;
  jugando = true;

  puntaje0.textContent = 0;
  puntaje1.textContent = 0;
  actual0.textContent = 0;
  actual1.textContent = 0;

  dadoEl.classList.add("hidden");
  bgJugador0.classList.remove("jugador--ganador");
  bgJugador1.classList.remove("jugador--ganador");
  bgJugador0.classList.add("jugador--activo");
  bgJugador1.classList.remove("jugador--activo");
};
init();

const cambiarJugador = function () {
  document.getElementById(`actual--${jugadorActivo}`).textContent = 0;
  puntajeActual = 0;
  jugadorActivo = jugadorActivo === 0 ? 1 : 0;
  bgJugador0.classList.toggle("jugador--activo");
  bgJugador1.classList.toggle("jugador--activo");
};

btnRoll.addEventListener("click", () => {
  if (jugando === true) {
    const dado = Math.floor(Math.random() * 6) + 1;
    console.log(dado);

    dadoEl.classList.remove("hidden");
    dadoEl.src = `dado-${dado}.png`;

    if (dado !== 1) {
      puntajeActual += dado;
      document.getElementById(`actual--${jugadorActivo}`).textContent =
        puntajeActual;
    } else {
      cambiarJugador();
    }
  }
});

btnMantener.addEventListener("click", () => {
  if (jugando === true) {
    puntajes[jugadorActivo] += puntajeActual;
    document.getElementById(`puntaje--${jugadorActivo}`).textContent =
      puntajes[jugadorActivo];
    // para ganar son 50 pts
    if (puntajes[jugadorActivo] >= 50) {
      jugando = false;
      dadoEl.classList.add("hidden");

      document
        .querySelector(`.jugador--${jugadorActivo}`)
        .classList.add("jugador--ganador");
      document
        .querySelector(`.jugador--${jugadorActivo}`)
        .classList.remove("jugador--activo");
    } else {
      cambiarJugador();
    }
  }
});

btnNuevo.addEventListener("click", init());
