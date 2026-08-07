import type { CSSProperties } from "react";

export interface FretPosition {
  string: number;
  fret: number;
  note: string;
  isRoot?: boolean;
  category?: string;
  displayOverride?: string;
}

export interface NoteClickInfo {
  note: string;
  midi: number;
  stringIndex: number;
  fret: number;
  category?: string;
}

export type FretboardSelector =
  | "root"
  | "stringRow"
  | "stringName"
  | "fretCell"
  | "noteMarker"
  | "fretNumbers"
  | "fretNumber";

export type FretboardClassNames = Record<FretboardSelector, string>;
export type FretboardStyles = Record<FretboardSelector, CSSProperties>;

export interface FretboardProps {
  positions: FretPosition[];
  tuning: number[];
  stringNames: string[];
  maxFrets?: number;
  startFret?: number;
  displayMode?: "notes" | "intervals";
  rootNote?: string;
  showFretNumbers?: boolean;
  leftHanded?: boolean;
  onNoteClick?: (info: NoteClickInfo) => void;
  /**
   * Which cells respond to onNoteClick.
   * 'positions' (default) — only cells that carry a position, preserving pre-0.2.0 behaviour.
   * 'all' — every cell in range, so an empty fretboard can be used as a quiz surface.
   * When an empty cell is clicked, `category` in NoteClickInfo is undefined.
   */
  clickableCells?: "positions" | "all";
  scrollToFret?: number;
  highlightedPosition?: { string: number; fret: number };
  classNames?: Partial<FretboardClassNames>;
  styles?: Partial<FretboardStyles>;
}
