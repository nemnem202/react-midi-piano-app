import { chords, scales, chordDictionary } from "./arrays";
import * as Tonal from "tonal";

export default function setRandom(mode, notesList, scalesList, max) {
  if (mode !== 3) {
    let scaleOrChordArray;

    if (mode === 1) {
      scaleOrChordArray = chords.filter((_, index) =>
        scalesList.includes(index)
      );
    } else if (mode === 2) {
      scaleOrChordArray = scales.filter((_, index) =>
        scalesList.includes(index)
      );
    }

    const randVal1 = Math.floor(Math.random() * notesList.length);
    const randomNote = notesList[randVal1];
    const randVal2 = Math.floor(Math.random() * scaleOrChordArray.length);

    const randomScaleOrChord = scaleOrChordArray[randVal2];
    return {
      nom: midiToNote(randomNote) + randomScaleOrChord.nom,
      intervalles: randomScaleOrChord.intervalles.map(
        (intervall) => (intervall + randomNote) % 12
      ),
      root: randomNote,
    };
  } else {
    let chordName = [];
    let chord = [];

    do {
      const scaleRoot = notesList[0];
      const scale = scales[scalesList[0]].intervalles.map(
        (interv) => (interv + scaleRoot) % 12
      );
      const rand1 = Math.floor(Math.random() * scale.length);
      const nbrNotesDansAccord = Math.min(
        Math.floor(Math.random() * (scale.length - 3 + 1)) + 3,
        max
      );
      chord = Array.from(
        { length: nbrNotesDansAccord },
        (_, index) => scale[(rand1 + index * 2) % scale.length]
      );
      const chordNotes = chord.map((e) => midiToNote(e));

      chordName = Tonal.Chord.detect(chordNotes);
    } while (chordName.length === 0);
    const root = Tonal.Chord.get(chordName[0]).tonic;
    const midiRoot = Tonal.Midi.toMidi(`${root}0`) % 12;
    return {
      nom: chordName[0],
      intervalles: chord,
      root: midiRoot,
    };
  }
}

const midiToNote = (midiValue) => {
  const notes = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];
  return notes[midiValue % 12];
};
