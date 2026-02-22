export const GRID_SIZE = 20;

const DIRS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

const OPPOSITE = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
};

export function cellKey(cell) {
  return `${cell.x},${cell.y}`;
}

export function spawnFood(snake, gridSize = GRID_SIZE, randomFn = Math.random) {
  const occupied = new Set(snake.map(cellKey));
  const freeCells = [];

  for (let y = 0; y < gridSize; y += 1) {
    for (let x = 0; x < gridSize; x += 1) {
      const key = `${x},${y}`;
      if (!occupied.has(key)) {
        freeCells.push({ x, y });
      }
    }
  }

  if (freeCells.length === 0) {
    return null;
  }

  const idx = Math.floor(randomFn() * freeCells.length);
  return freeCells[idx];
}

export function createInitialState(randomFn = Math.random) {
  const snake = [{ x: Math.floor(GRID_SIZE / 2), y: Math.floor(GRID_SIZE / 2) }];
  return {
    gridSize: GRID_SIZE,
    snake,
    direction: "right",
    nextDirection: "right",
    food: spawnFood(snake, GRID_SIZE, randomFn),
    score: 0,
    status: "running",
  };
}

export function setDirection(state, direction) {
  if (!DIRS[direction]) {
    return state;
  }

  const currentHeading = state.nextDirection || state.direction;
  if (direction === OPPOSITE[currentHeading] && state.snake.length > 1) {
    return state;
  }

  return {
    ...state,
    nextDirection: direction,
  };
}

export function togglePause(state) {
  if (state.status === "gameover") {
    return state;
  }

  return {
    ...state,
    status: state.status === "paused" ? "running" : "paused",
  };
}

export function restartState(randomFn = Math.random) {
  return createInitialState(randomFn);
}

export function stepState(state, randomFn = Math.random) {
  if (state.status !== "running") {
    return state;
  }

  const direction = state.nextDirection;
  const delta = DIRS[direction];
  const head = state.snake[0];
  const nextHead = { x: head.x + delta.x, y: head.y + delta.y };

  if (
    nextHead.x < 0 ||
    nextHead.y < 0 ||
    nextHead.x >= state.gridSize ||
    nextHead.y >= state.gridSize
  ) {
    return {
      ...state,
      direction,
      status: "gameover",
    };
  }

  const grow = state.food && nextHead.x === state.food.x && nextHead.y === state.food.y;
  const bodyToCheck = grow ? state.snake : state.snake.slice(0, -1);
  const bodySet = new Set(bodyToCheck.map(cellKey));

  if (bodySet.has(cellKey(nextHead))) {
    return {
      ...state,
      direction,
      status: "gameover",
    };
  }

  const nextSnake = [nextHead, ...state.snake];
  if (!grow) {
    nextSnake.pop();
  }

  const nextFood = grow
    ? spawnFood(nextSnake, state.gridSize, randomFn)
    : state.food;

  return {
    ...state,
    snake: nextSnake,
    direction,
    food: nextFood,
    score: grow ? state.score + 1 : state.score,
  };
}
