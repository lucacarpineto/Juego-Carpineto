const circle = document.getElementById("circle");
const player1ScoreElem = document.getElementById("player1-score");
const player2ScoreElem = document.getElementById("player2-score");
const player1Bar = document.getElementById("player1-bar");
const player2Bar = document.getElementById("player2-bar");

const maxScore = 10; // Puntuación máxima

// Recuperar de localStorage
let player1Score = 0;
let player2Score = 0;

function loadScores() {
  const savedScores = localStorage.getItem("gameScores");
  if (savedScores) {
    const scores = JSON.parse(savedScores);
    player1Score = scores.player1 || 0;
    player2Score = scores.player2 || 0;
  }
}

// Guardar en local
function saveScores() {
  const scores = {
    player1: player1Score,
    player2: player2Score,
  };
  localStorage.setItem("gameScores", JSON.stringify(scores));
}

function getRandomPosition() {
  const gameArea = document.querySelector(".game-area");
  const maxX = gameArea.offsetWidth - 50; 
  const maxY = gameArea.offsetHeight - 50;
  const x = Math.random() * maxX;
  const y = Math.random() * maxY;
  return { x, y };
}

function showCircle() {
  const { x, y } = getRandomPosition();
  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;
  circle.style.display = "block";
}

function hideCircle() {
  circle.style.display = "none";
}

function updateBars() {
  player1Bar.style.width = `${(player1Score / maxScore) * 100}%`;
  player2Bar.style.width = `${(player2Score / maxScore) * 100}%`;
}

function updateScores() {
  player1ScoreElem.textContent = player1Score;
  player2ScoreElem.textContent = player2Score;
  updateBars();
}

function startGame() {
  showCircle();
  setTimeout(() => {
    hideCircle();
    setTimeout(startGame, Math.random() * 2000 + 1000);
  }, 2000);
}

// Evento para los puntos
document.addEventListener("keydown", (event) => {
  if (circle.style.display === "block") {
    if (event.key === "a" || event.key === "A") {
      player1Score++;
      updateScores();
      saveScores(); // Save de puntos
      hideCircle();
    } else if (event.key === "l" || event.key === "L") {
      player2Score++;
      updateScores();
      saveScores(); 
      hideCircle();
    }
  }
});

// Iniciar el juego
loadScores(); // Cargar puntuaciones al inicio
updateScores(); // Refrescar las barras y puntuaciones
startGame();
