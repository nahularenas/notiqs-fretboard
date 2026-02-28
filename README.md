# @notiqs/fretboard

A customizable, zero-dependency React fretboard component for guitar, bass, and string instruments. Dark-themed by default, fully styleable via CSS variables and class overrides.

## Quick Start

```bash
npm install @notiqs/fretboard
```

```tsx
import { Fretboard } from '@notiqs/fretboard'
import '@notiqs/fretboard/styles.css'

// C major scale on standard guitar (partial)
const positions = [
  { string: 0, fret: 0, note: 'E', isRoot: false },
  { string: 0, fret: 1, note: 'F', isRoot: false },
  { string: 0, fret: 3, note: 'G', isRoot: false },
  { string: 1, fret: 0, note: 'B', isRoot: false },
  { string: 1, fret: 1, note: 'C', isRoot: true },
  // ...
]

<Fretboard
  positions={positions}
  tuning={[64, 59, 55, 50, 45, 40]}  // Standard guitar E-e (MIDI)
  stringNames={['e', 'B', 'G', 'D', 'A', 'E']}
  rootNote="C"
/>
```

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `positions` | `FretPosition[]` | *required* | Notes to display on the fretboard |
| `tuning` | `number[]` | *required* | MIDI note numbers per string, top to bottom |
| `stringNames` | `string[]` | *required* | Labels for each string |
| `maxFrets` | `number` | `12` | Number of frets to render |
| `startFret` | `number` | `0` | First fret to render (useful for position practice) |
| `displayMode` | `'notes' \| 'intervals'` | `'notes'` | Show note names or interval labels |
| `rootNote` | `string` | — | Root note for interval calculation and root highlighting |
| `showFretNumbers` | `boolean` | `true` | Show fret number row below the fretboard |
| `onNoteClick` | `(info: NoteClickInfo) => void` | — | Callback when a note marker is clicked |
| `scrollToFret` | `number` | — | Auto-scroll to center this fret in the viewport |
| `classNames` | `Partial<FretboardClassNames>` | — | Override classes for each selector |
| `styles` | `Partial<FretboardStyles>` | — | Override inline styles for each selector |

### FretPosition

```ts
interface FretPosition {
  string: number        // String index (0 = highest pitch string)
  fret: number          // Fret number (0 = open string)
  note: string          // Note name, e.g. "C", "F#"
  isRoot?: boolean      // Highlight as root note
  category?: string     // Color category (see Categories)
  displayOverride?: string  // Custom label (overrides note/interval)
}
```

### NoteClickInfo

```ts
interface NoteClickInfo {
  note: string
  midi: number
  stringIndex: number
  fret: number
  category?: string
}
```

## Selectors

Every element has a static class for easy CSS targeting. Use the `classNames` prop to append additional classes.

| Selector | Static class | Description |
|----------|-------------|-------------|
| `root` | `.notiqs-fretboard-root` | Outermost scrollable container |
| `stringRow` | `.notiqs-fretboard-stringRow` | One horizontal string row |
| `stringName` | `.notiqs-fretboard-stringName` | String label (E, B, G...) |
| `fretCell` | `.notiqs-fretboard-fretCell` | Individual fret cell |
| `noteMarker` | `.notiqs-fretboard-noteMarker` | The note circle/pill |
| `fretNumbers` | `.notiqs-fretboard-fretNumbers` | Fret number row container |
| `fretNumber` | `.notiqs-fretboard-fretNumber` | Individual fret number |

Fret cells also expose data attributes: `data-fret`, `data-open`, `data-has-note`.

> **String wire:** The horizontal wire on each string is rendered as a CSS pseudo-element on `fretCell`. Customize it via the `--notiqs-wire-color` CSS variable rather than a `classNames` selector.
Note markers expose: `data-category`, `data-root`.

## CSS Variables

Override these on `.notiqs-fretboard-root` (or any ancestor) to theme the fretboard.

### Layout

| Variable | Default | Description |
|----------|---------|-------------|
| `--notiqs-cell-width` | `60px` | Width of each fret cell |
| `--notiqs-cell-height` | `44px` | Height of each fret cell |
| `--notiqs-cell-gap` | `2px` | Gap between cells |
| `--notiqs-string-label-width` | `30px` | Width of string name column |
| `--notiqs-note-size` | `34px` | Note marker width & height |
| `--notiqs-note-radius` | `10px` | Note marker border radius |
| `--notiqs-note-font-size` | `0.8rem` | Note marker font size |

### Colors

| Variable | Default | Description |
|----------|---------|-------------|
| `--notiqs-cell-bg` | `#16162a` | Fret cell background |
| `--notiqs-cell-bg-hover` | `#1e1e3a` | Fret cell hover background |
| `--notiqs-cell-bg-open` | `#0d0d12` | Open string cell background |
| `--notiqs-cell-border` | `#2a2a4a` | Fret line color |
| `--notiqs-cell-border-open` | `#3a3a5a` | Nut (open fret) border |
| `--notiqs-wire-color` | `linear-gradient(...)` | String wire gradient |
| `--notiqs-text` | `#e8e8f0` | Primary text color |
| `--notiqs-text-muted` | `#888` | Secondary text color |

### Category Colors

Each category has three tokens: base, dark (gradient end), and glow.

| Category | Base | Dark | Glow |
|----------|------|------|------|
| `root` | `--notiqs-color-root` | `--notiqs-color-root-dark` | `--notiqs-color-root-glow` |
| `third` | `--notiqs-color-third` | `--notiqs-color-third-dark` | `--notiqs-color-third-glow` |
| `fifth` | `--notiqs-color-fifth` | `--notiqs-color-fifth-dark` | `--notiqs-color-fifth-glow` |
| `seventh` | `--notiqs-color-seventh` | `--notiqs-color-seventh-dark` | `--notiqs-color-seventh-glow` |
| `extension` | `--notiqs-color-extension` | `--notiqs-color-extension-dark` | `--notiqs-color-extension-glow` |
| `other` | `--notiqs-color-other` | `--notiqs-color-other-dark` | `--notiqs-color-other-glow` |

## Theming

### Light Theme Override

```css
.notiqs-fretboard-root {
  --notiqs-cell-bg: #f5f5f5;
  --notiqs-cell-bg-hover: #e8e8e8;
  --notiqs-cell-bg-open: #ffffff;
  --notiqs-cell-border: #d0d0d0;
  --notiqs-cell-border-open: #b0b0b0;
  --notiqs-wire-color: linear-gradient(to right, #ccc 0%, #999 100%);
  --notiqs-text: #1a1a1a;
  --notiqs-text-muted: #666;
}
```

### classNames Usage

```tsx
<Fretboard
  positions={positions}
  tuning={tuning}
  stringNames={names}
  classNames={{
    root: 'my-fretboard',
    noteMarker: 'my-note',
    fretCell: 'my-cell',
  }}
/>
```

```css
.my-fretboard { border: 1px solid #333; border-radius: 8px; padding: 12px; }
.my-note { border-radius: 50%; }  /* circular markers */
```

### Inline Styles

```tsx
<Fretboard
  positions={positions}
  tuning={tuning}
  stringNames={names}
  styles={{
    root: { maxHeight: 300, overflow: 'hidden' },
    noteMarker: { borderRadius: '50%' },
  }}
/>
```

## Categories

The built-in stylesheet provides colors for these `category` values:

| Category | Color | Use case |
|----------|-------|----------|
| `root` | Violet | Root notes |
| `third` | Pink | Major/minor thirds |
| `fifth` | Teal | Perfect fifths |
| `seventh` | Gold | Sevenths |
| `extension` | Blue | 9ths, 11ths, 13ths |
| `other` | Gray | 2nds, 4ths, 6ths |
| `common` | Teal | Shared notes (scale comparison) |
| `scaleA` | Blue | Scale A unique notes |
| `scaleB` | Pink | Scale B unique notes |
| `chord` | Teal | Chord tones |
| `scale` | Blue | Non-chord scale notes |

### Custom Categories

Add your own categories via `data-category` CSS selectors:

```css
.notiqs-fretboard-noteMarker[data-category="myCustom"] {
  background: linear-gradient(135deg, #ff6600 0%, #cc5200 100%);
  box-shadow: 0 4px 12px rgba(255, 102, 0, 0.35);
}
```

Then pass `category: 'myCustom'` in your `FretPosition` objects.

## Recipes

### Interval Mode

```tsx
<Fretboard
  positions={positions}
  tuning={[64, 59, 55, 50, 45, 40]}
  stringNames={['e', 'B', 'G', 'D', 'A', 'E']}
  rootNote="C"
  displayMode="intervals"
/>
```

Notes display as `R`, `b3`, `5`, `7`, etc. instead of note names.

### Click Handling

```tsx
function MyApp() {
  const handleClick = (info: NoteClickInfo) => {
    console.log(`Clicked ${info.note} (MIDI ${info.midi}) on string ${info.stringIndex}, fret ${info.fret}`)
    // Play audio, check quiz answer, etc.
  }

  return (
    <Fretboard
      positions={positions}
      tuning={tuning}
      stringNames={names}
      onNoteClick={handleClick}
    />
  )
}
```

### Bass Tuning

```tsx
// 4-string bass: G D A E
<Fretboard positions={positions} tuning={[43, 38, 33, 28]} stringNames={['G', 'D', 'A', 'E']} rootNote="E" />

// 5-string bass: G D A E B
<Fretboard positions={positions} tuning={[43, 38, 33, 28, 23]} stringNames={['G', 'D', 'A', 'E', 'B']} rootNote="E" />
```

### Scroll to Fret / Position Practice

```tsx
<Fretboard positions={positions} tuning={tuning} stringNames={names} scrollToFret={7} />
<Fretboard positions={positions} tuning={tuning} stringNames={names} startFret={5} maxFrets={8} />
```

### Display Override (Quiz Mode)

```tsx
const quizPositions = [
  { string: 2, fret: 5, note: 'C', isRoot: true, displayOverride: '?', category: 'challenge' },
]
```

## Exports

```ts
// Component
export { Fretboard } from '@notiqs/fretboard'

// Types
export type {
  FretboardProps,
  FretPosition,
  NoteClickInfo,
  FretboardClassNames,
  FretboardStyles,
  FretboardSelector,
} from '@notiqs/fretboard'

// Utilities
export { getNoteAtFret, getIntervalLabel, normalizeNote, midiToNoteName } from '@notiqs/fretboard'
```

## License

MIT
