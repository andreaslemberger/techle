# Techle

A Wordle-like quiz game with a tech twist — integrable into any webapp as a web component.

## How to Play

1. A tech/software engineering word (4–7 letters) is chosen each round. When connected to a backend via the `api-url` attribute, the same daily word is shared by all players.
2. You have **6 attempts** to guess the word.
3. Type your guess using the on-screen keyboard or your physical keyboard, then press **Enter**.
4. After each guess, tiles change color to show how close you are:
   - **Green** — correct letter in the correct position.
   - **Yellow** — correct letter but in the wrong position.
   - **Gray** — letter is not in the word.
5. The keyboard also updates with color hints to help track your guesses.
6. If the `hint-enabled` attribute is set, a **Hint** button is available during the game. Clicking it displays the word's description as a clue.
7. Win by guessing the word within 6 tries, or the answer is revealed.
8. In random word mode, click **Play Again** to start a new round with a different word.

## Integration

### Install

```bash
npm install
npm run build
```

This produces `dist/techle.js`.

### Use the Web Component

Include the built script and use the `<tech-wordle>` custom element:

```html
<script type="module" src="path/to/techle.js"></script>

<tech-wordle></tech-wordle>
```

The component uses Shadow DOM, so its styles are encapsulated and won't conflict with your page.

### Attributes

| Attribute | Type | Description |
|---|---|---|
| `api-url` | `string` | Backend URL for daily word mode. Omit for random word mode. |
| `hint-enabled` | `boolean` | When present, shows a **Hint** button that displays the word's description. |

### Game Modes

The `api-url` attribute determines how Techle picks its word:

| `api-url` | Mode | Behavior |
|---|---|---|
| **Provided** | Daily word | Fetches the word from `GET {api-url}/daily-word`. All players sharing the same backend see the same word. The word persists until the backend rotates it. |
| **Omitted** | Random word | Picks a random word from the built-in word list on every mount / "Play Again" press. Each player (and each page load) gets a different word. |

#### Daily word mode

```html
<tech-wordle api-url="https://your-api.example.com" hint-enabled></tech-wordle>
```

The `GET /daily-word` endpoint should return:

```json
{ "word": "react", "description": "A JavaScript library...", "date": "2026-02-07" }
```

If the request fails, the component falls back to random word mode and shows a toast notification.

#### Random word mode

```html
<tech-wordle></tech-wordle>
```

No backend required. A word is randomly selected from the built-in list each time the component mounts or the player clicks "Play Again".

### Development

```bash
npm run dev
```

Opens a local dev server with a test harness at `http://localhost:5173`.

## Customization

### CSS Custom Properties

Techle exposes CSS custom properties on the `:host` element. Override them on the `tech-wordle` selector or any ancestor:

```css
tech-wordle {
  --techle-correct-color: #6aaa64;           /* green tile */
  --techle-present-color: #c9b458;           /* yellow tile */
  --techle-absent-color: #787c7e;            /* gray tile */
  --techle-tile-size: 62px;
  --techle-font-size: 2rem;
  --techle-bg-color: #121213;                /* game background */
  --techle-text-color: #ffffff;              /* text and tile text */
  --techle-guess-color: var(--techle-text-color);           /* submitted/revealed tile text */
  --techle-unsubmitted-guess-color: var(--techle-text-color); /* current guess tile text */
  --techle-toast-bg: var(--techle-text-color);              /* toast notification background */
  --techle-toast-color: var(--techle-bg-color);             /* toast notification text */
  --techle-tile-radius: 0px;                 /* tile border radius */
}
```

### Example: Light Theme

```css
tech-wordle {
  --techle-bg-color: #ffffff;
  --techle-text-color: #1a1a1b;
  --techle-correct-color: #6aaa64;
  --techle-present-color: #c9b458;
  --techle-absent-color: #787c7e;
}
```

### Example: Custom Sizing

```css
tech-wordle {
  --techle-tile-size: 48px;
  --techle-font-size: 1.5rem;
}
```

### Example: Rounded Tiles with Custom Toast

```css
tech-wordle {
  --techle-tile-radius: 8px;
  --techle-toast-bg: #333;
  --techle-toast-color: #fff;
  --techle-guess-color: #e0e0e0;
  --techle-unsubmitted-guess-color: #aaaaaa;
}
```

### CSS Parts

Techle exposes shadow DOM elements via the `part` attribute, allowing fine-grained styling with the `::part()` selector:

| Part | Element | Description |
|---|---|---|
| `board` | `<div>` | The grid container holding all guess rows |
| `row` | `<div>` | A single row of tiles (one per guess) |
| `tile` | `<div>` | An individual letter tile |
| `keyboard` | `<div>` | The on-screen keyboard container |
| `key` | `<button>` | An individual keyboard key |
| `toast` | `<div>` | The toast notification message |
| `hint-button` | `<button>` | The hint button (when `hint-enabled` is set) |
| `play-again-button` | `<button>` | The play again button (random word mode, after game over) |

#### Example: Styling via CSS Parts

```css
tech-wordle::part(tile) {
  border-radius: 8px;
  font-family: "Courier New", monospace;
}

tech-wordle::part(key) {
  border-radius: 8px;
  font-family: inherit;
}

tech-wordle::part(toast) {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

tech-wordle::part(hint-button),
tech-wordle::part(play-again-button) {
  border-radius: 8px;
  text-transform: uppercase;
}
```
