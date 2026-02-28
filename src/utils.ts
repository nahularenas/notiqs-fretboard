const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

const ENHARMONIC_MAP: Record<string, string> = {
  'Cb': 'B', 'Db': 'C#', 'Eb': 'D#', 'Fb': 'E', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#',
  'E#': 'F', 'B#': 'C',
  'C##': 'D', 'D##': 'E', 'E##': 'F#', 'F##': 'G', 'G##': 'A', 'A##': 'B', 'B##': 'C#',
  'Cbb': 'A#', 'Dbb': 'C', 'Ebb': 'D', 'Fbb': 'D#', 'Gbb': 'F', 'Abb': 'G', 'Bbb': 'A',
}

const INTERVAL_LABELS = ['R', '\u266D2', '2', '\u266D3', '3', '4', '\u266D5', '5', '\u266D6', '6', '\u266D7', '7']

export function normalizeNote(note: string): string {
  const pitchClass = note.replace(/\d+$/, '')
  return ENHARMONIC_MAP[pitchClass] || pitchClass
}

export function midiToNoteName(midi: number): string {
  return NOTE_NAMES[midi % 12]
}

export function getNoteAtFret(stringMidi: number, fret: number): string {
  return midiToNoteName(stringMidi + fret)
}

export function getIntervalLabel(note: string, rootNote: string): string {
  const noteNorm = normalizeNote(note)
  const rootNorm = normalizeNote(rootNote)
  const noteIndex = NOTE_NAMES.indexOf(noteNorm)
  const rootIndex = NOTE_NAMES.indexOf(rootNorm)
  if (noteIndex === -1 || rootIndex === -1) return note
  const semitones = (noteIndex - rootIndex + 12) % 12
  return INTERVAL_LABELS[semitones]
}
