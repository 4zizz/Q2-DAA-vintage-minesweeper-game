# Minesweeper Vintage

A browser-based Minesweeper game with a vintage wooden-board look, built with React and TypeScript. The game's signature behavior, opening a whole empty region with one click, is powered by **Breadth-First Search (BFS)**.

> Course project for **EF234405 Design & Analysis of Algorithms (M)**, Quiz 2.

<!-- Add a screenshot or GIF here, for example:
![Gameplay screenshot](docs/screenshot.png)
-->

## Features

- Three difficulty levels: Easy, Medium and Hard
- Safe first click: the clicked cell and its eight neighbors never contain a mine
- Automatic reveal of connected empty areas using BFS
- Flagging with right click, plus a remaining-mines counter
- Timer that starts on the first move
- Win and loss detection, with a result dialog showing the final time
- Sound effects generated with the Web Audio API (no audio files needed), with a mute option
- Light and dark themes, saved between visits
- Keyboard shortcuts for quick control
- Vintage visual style: parchment tiles, wooden background and brass-framed panels

## Difficulty Levels

| Level  | Grid      | Mines |
|--------|-----------|-------|
| Easy   | 8 x 8     | 10    |
| Medium | 14 x 14   | 30    |
| Hard   | 20 x 20   | 70    |

## Controls

| Action              | Input                  |
|---------------------|------------------------|
| Reveal a cell       | Left click             |
| Place / remove flag | Right click            |
| Restart             | `R`                    |
| Mute / unmute       | `M`                    |
| Switch theme        | `T`                    |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer
- npm

### Installation

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
npm install
```

### Run locally

```bash
npm run dev
```

Then open the address shown in the terminal (by default `http://localhost:5173`).

### Production build

```bash
npm run build
```

## How It Works

### The board as a graph

The board is treated as an implicit graph. Each cell is a vertex, and each of the (up to) eight cells touching it, horizontally, vertically or diagonally, is a neighbor.

### Flood reveal with BFS

When the player opens a cell with no neighboring mines (value `0`):

1. Put the clicked cell in a queue.
2. Take the first cell out. If it is outside the board or already revealed, skip it. Otherwise mark it as revealed.
3. If its value is greater than `0`, stop. It is a border cell, so it is opened but not expanded.
4. If its value is `0`, add every unrevealed neighbor that is not a mine to the queue.
5. Repeat until the queue is empty.

The `revealed` matrix doubles as the visited set. A cell may be queued more than once, but it is processed only once, so the traversal stays linear in the number of cells. BFS was chosen over DFS because it opens the area in rings around the click and uses an explicit queue instead of deep recursion.

### Mine placement and first-click safety

Mines are not placed when the board is created. They are placed on the first click, avoiding the clicked cell and its neighbors, so the first move always opens an empty region. Random positions are drawn and rejected if they are already a mine or inside the protected zone. Neighbor numbers are then computed from the mine side: for each mine, every non-mine neighbor is incremented by one.

### Data model

The game state keeps three matrices of the same size:

- `grid`: `-1` for a mine, otherwise `0` to `8` (number of neighboring mines)
- `revealed`: whether the cell has been opened
- `flagged`: whether the player flagged the cell

The game moves through four statuses: `idle`, `playing`, `won` and `lost`.

### Complexity

Let `N` be the number of cells and `M` the number of mines.

| Operation                    | Time                          | Space    |
|------------------------------|-------------------------------|----------|
| Board initialization         | O(N)                          | O(N)     |
| Mine placement and counting  | O(N + M + R)                  | O(N + M) |
| BFS flood reveal (ideal)     | O(N)                          | O(N)     |
| Win check                    | O(N)                          | O(1)     |

`R` is the number of rejected random draws during mine placement. The current BFS uses `Array.shift()` to dequeue, which costs time proportional to the queue length, so its practical bound is slightly above O(N). On boards of at most 400 cells this is negligible, and a head-index queue would restore strict O(N).

## Project Structure

```
src/
  main.tsx, App.tsx
  types/              Type definitions
  utils/
    gameLogic.ts      Core algorithms: mine placement, BFS, win check
    helpers.ts        Difficulty config and grid helpers
    sound.ts          Web Audio sound effects
  hooks/
    useGame.ts        Game state and actions
    useTimer.ts       Timer
    useTheme.ts       Theme persistence
  components/         Home, Sidebar, Main, Board, Cell, Overlay
  styles/
    variabel.css      Colors, fonts and shadow tokens
    vintage.css       Vintage theme layer
    ...               Other stylesheets
```

The code is organized in three layers. The **logic layer** (`utils/`) is made of pure functions with no React dependency. The **state layer** (`hooks/`) connects user actions to that logic. The **interface layer** (`components/`, `styles/`) only displays the state and reports clicks. Thanks to this split, the interface was redesigned into the vintage style without changing the game logic.

## Tech Stack

- [React](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- Plain CSS with custom properties for theming
- Web Audio API for sound

## Possible Improvements

- Use a constant-time queue in the BFS flood reveal
- Skip flagged cells during flood reveal, as in the classic game
- Add a best-time leaderboard per difficulty
- Add a custom board size mode

## Authors

- Muchammad Naufal Aziz 5053251009
- Sulthan Zakinun Nasywa 5053251008
- Hafidz Nur Ikhsan Isnaeni 5053251015



