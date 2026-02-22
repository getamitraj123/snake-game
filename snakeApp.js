import {
  createInitialState,
  restartState,
  setDirection,
  stepState,
  togglePause,
  cellKey,
} from "./snakeLogic.js";

const TICK_MS = 120;

const boardEl = document.getElementById("board");
const scoreEl = document.getElementById("score");
const statusEl = document.getElementById("status");
const pauseBtn = document.getElementById("pauseBtn");
const restartBtn = document.getElementById("restartBtn");
const mobileButtons = Array.from(document.querySelectorAll("[data-dir]"));

let state = createInitialState();
const cells = [];

function buildBoard(size) {
  boardEl.innerHTML = "";
  cells.length = 0;
  for (let i = 0; i < size * size; i += 1) {
    const cell = document.createElement("div");
    cell.className = "cell";
    boardEl.appendChild(cell);
    cells.push(cell);
  }
}

function idxFromCoord(x, y, size) {
  return y * size + x;
}

function render() {
  for (const cell of cells) {
    cell.className = "cell";
  }

  if (state.food) {
    const foodIdx = idxFromCoord(state.food.x, state.food.y, state.gridSize);
    cells[foodIdx].classList.add("food");
  }

  for (const segment of state.snake) {
    const idx = idxFromCoord(segment.x, segment.y, state.gridSize);
    cells[idx].classList.add("snake");
  }

  scoreEl.textContent = `Score: ${state.score}`;
  statusEl.textContent =
    state.status === "gameover"
      ? "Game Over"
      : state.status === "paused"
      ? "Paused"
      : "Running";

  pauseBtn.textContent = state.status === "paused" ? "Resume" : "Pause";
}

function directionFromKey(key) {
  switch (key) {
    case "ArrowUp":
    case "w":
    case "W":
      return "up";
    case "ArrowDown":
    case "s":
    case "S":
      return "down";
    case "ArrowLeft":
    case "a":
    case "A":
      return "left";
    case "ArrowRight":
    case "d":
    case "D":
      return "right";
    default:
      return null;
  }
}

document.addEventListener("keydown", (event) => {
  if (event.key === " ") {
    event.preventDefault();
    state = togglePause(state);
    render();
    return;
  }

  const dir = directionFromKey(event.key);
  if (dir) {
    event.preventDefault();
    state = setDirection(state, dir);
  }

  if (event.key === "Enter" && state.status === "gameover") {
    state = restartState();
    render();
  }
});

pauseBtn.addEventListener("click", () => {
  state = togglePause(state);
  render();
});

restartBtn.addEventListener("click", () => {
  state = restartState();
  render();
});

for (const button of mobileButtons) {
  button.addEventListener("click", () => {
    const dir = button.dataset.dir;
    state = setDirection(state, dir);
  });
}

buildBoard(state.gridSize);
render();

setInterval(() => {
  state = stepState(state);
  render();
}, TICK_MS);

// Expose read-only helpers for quick manual debugging from the browser console.
window.__snake = {
  getState: () => structuredClone(state),
  cellKey,
};
