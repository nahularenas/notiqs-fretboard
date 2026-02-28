import type { CSSProperties } from 'react'

export interface FretPosition {
  string: number
  fret: number
  note: string
  isRoot?: boolean
  category?: string
  displayOverride?: string
}

export interface NoteClickInfo {
  note: string
  midi: number
  stringIndex: number
  fret: number
  category?: string
}

export type FretboardSelector =
  | 'root'
  | 'stringRow'
  | 'stringName'
  | 'fretCell'
  | 'noteMarker'
  | 'fretNumbers'
  | 'fretNumber'

export type FretboardClassNames = Record<FretboardSelector, string>
export type FretboardStyles = Record<FretboardSelector, CSSProperties>

export interface FretboardProps {
  positions: FretPosition[]
  tuning: number[]
  stringNames: string[]
  maxFrets?: number
  startFret?: number
  displayMode?: 'notes' | 'intervals'
  rootNote?: string
  showFretNumbers?: boolean
  onNoteClick?: (info: NoteClickInfo) => void
  scrollToFret?: number
  classNames?: Partial<FretboardClassNames>
  styles?: Partial<FretboardStyles>
}
