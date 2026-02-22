# Snake (Classic)

Minimal, dependency-free Snake game.

## Run

1. From `/Users/amitraj/Documents/Codex`, start a static server:
   - `ruby -run -e httpd . -p 8000`
2. Open `http://localhost:8000`.

## Where to navigate

- Main game page: `/` (the root `index.html`).

## Manual verification checklist

- Controls:
  - Arrow keys and `W/A/S/D` move the snake.
  - Opposite-direction instant reversal is blocked.
  - On touch/mobile pointers, tap on-screen arrows to move.
- Pause/Restart:
  - Press `Space` or click `Pause`/`Resume` to toggle pause.
  - Click `Restart` to reset score and snake.
  - After game over, restart still works.
- Boundaries and game-over:
  - Hitting any wall ends the game.
  - Running into the snake body ends the game.
- Food/Growth/Score:
  - Eating food grows snake length by 1.
  - Score increments by 1 per food eaten.
  - New food never appears on the snake body.

## Notes

- No test runner/framework was present in the repo, so no automated test files were added.
- Core logic is kept pure and deterministic in `snakeLogic.js` for easy unit testing if a runner is added later.
