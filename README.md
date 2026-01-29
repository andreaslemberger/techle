# Techle

A Wordle-like quiz game with a tech twist — integrable into any webapp as a web component.

## How to Play

1. A random tech/software engineering word (4–7 letters) is chosen each round.
2. You have **6 attempts** to guess the word.
3. Type your guess using the on-screen keyboard or your physical keyboard, then press **Enter**.
4. After each guess, tiles change color to show how close you are:
   - **Green** — correct letter in the correct position.
   - **Yellow** — correct letter but in the wrong position.
   - **Gray** — letter is not in the word.
5. The keyboard also updates with color hints to help track your guesses.
6. Win by guessing the word within 6 tries, or the answer is revealed.
7. Click **Play Again** to start a new round with a different word.

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

### Development

```bash
npm run dev
```

Opens a local dev server with a test harness at `http://localhost:5173`.

## Customization

Techle exposes CSS custom properties on the `:host` element. Override them on the `tech-wordle` selector or any ancestor:

```css
tech-wordle {
  --techle-correct-color: #6aaa64;  /* green tile */
  --techle-present-color: #c9b458;  /* yellow tile */
  --techle-absent-color: #787c7e;   /* gray tile */
  --techle-tile-size: 62px;
  --techle-font-size: 2rem;
  --techle-bg-color: #121213;       /* game background */
  --techle-text-color: #ffffff;     /* text and tile text */
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
