import { useRef, useEffect } from 'react'
import type { FretboardProps } from './types'
import { getNoteAtFret, getIntervalLabel } from './utils'

const GLOW_COLORS: Record<string, string> = {
  root: 'var(--notiqs-color-root-glow)',
  third: 'var(--notiqs-color-third-glow)',
  fifth: 'var(--notiqs-color-fifth-glow)',
  seventh: 'var(--notiqs-color-seventh-glow)',
  extension: 'var(--notiqs-color-extension-glow)',
  other: 'var(--notiqs-color-other-glow)',
  chord: 'var(--notiqs-color-fifth-glow)',
  common: 'var(--notiqs-color-fifth-glow)',
  scale: 'var(--notiqs-color-extension-glow)',
  scaleA: 'var(--notiqs-color-extension-glow)',
  scaleB: 'var(--notiqs-color-third-glow)',
}

function getGlowColor(category?: string, isRoot?: boolean): string {
  if (isRoot) return GLOW_COLORS.root
  if (category && category in GLOW_COLORS) return GLOW_COLORS[category]
  return GLOW_COLORS.root
}

function cx(staticClass: string, consumerClass?: string): string {
  return consumerClass ? `${staticClass} ${consumerClass}` : staticClass
}

export function Fretboard({
  positions,
  tuning,
  stringNames,
  maxFrets = 12,
  startFret = 0,
  displayMode = 'notes',
  rootNote,
  showFretNumbers = true,
  onNoteClick,
  scrollToFret,
  classNames,
  styles,
}: FretboardProps) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollToFret === undefined || !rootRef.current) return
    const container = rootRef.current
    const cell = container.querySelector(
      `.notiqs-fretboard-fretCell[data-fret="${scrollToFret}"]`
    ) as HTMLElement
    if (cell) {
      const cellCenter = cell.offsetLeft + cell.offsetWidth / 2
      const containerWidth = container.clientWidth
      requestAnimationFrame(() => {
        container.scrollTo({
          left: Math.max(0, cellCenter - containerWidth / 2),
          behavior: 'smooth',
        })
      })
    }
  }, [scrollToFret])

  const getPositionAt = (stringIndex: number, fret: number) => {
    return positions.find(p => p.string === stringIndex && p.fret === fret)
  }

  return (
    <div
      ref={rootRef}
      className={cx('notiqs-fretboard-root', classNames?.root)}
      style={styles?.root}
    >
      {tuning.map((_, stringIndex) => (
        <div
          key={stringIndex}
          className={cx('notiqs-fretboard-stringRow', classNames?.stringRow)}
          style={styles?.stringRow}
        >
          <span
            className={cx('notiqs-fretboard-stringName', classNames?.stringName)}
            style={styles?.stringName}
          >
            {stringNames[stringIndex]}
          </span>
          {Array.from({ length: maxFrets - startFret + 1 }, (_, i) => {
            const fret = startFret + i
            const stringMidi = tuning[stringIndex]
            const note = getNoteAtFret(stringMidi, fret)
            const position = getPositionAt(stringIndex, fret)
            const hasNote = !!position
            const isRoot = position?.isRoot ?? (!!rootNote && note === rootNote)
            const midi = stringMidi + fret

            return (
              <div
                key={fret}
                data-fret={fret}
                data-open={fret === 0 || undefined}
                data-has-note={hasNote || undefined}
                className={cx('notiqs-fretboard-fretCell', classNames?.fretCell)}
                style={{
                  cursor: hasNote && onNoteClick ? 'pointer' : 'default',
                  ...styles?.fretCell,
                }}
                onClick={() => {
                  if (hasNote && onNoteClick) {
                    onNoteClick({ note, midi, stringIndex, fret, category: position?.category })
                  }
                }}
              >
                {hasNote && (
                  <span
                    data-category={position?.category || undefined}
                    data-root={isRoot || undefined}
                    className={cx('notiqs-fretboard-noteMarker', classNames?.noteMarker)}
                    style={{
                      '--note-glow-color': getGlowColor(position?.category, isRoot),
                      ...styles?.noteMarker,
                    } as React.CSSProperties}
                  >
                    {position?.displayOverride ??
                      (displayMode === 'intervals' && rootNote
                        ? getIntervalLabel(note, rootNote)
                        : note)}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      ))}

      {showFretNumbers && (
        <div
          className={cx('notiqs-fretboard-fretNumbers', classNames?.fretNumbers)}
          style={styles?.fretNumbers}
        >
          <span></span>
          {Array.from({ length: maxFrets - startFret + 1 }, (_, i) => {
            const fret = startFret + i
            return (
              <span
                key={fret}
                className={cx('notiqs-fretboard-fretNumber', classNames?.fretNumber)}
                style={styles?.fretNumber}
              >
                {fret}
              </span>
            )
          })}
        </div>
      )}
    </div>
  )
}
