import { chords, scales, chordDictionary } from "./arrays";
import * as Tonal from "tonal";

export default function setRandom(mode, notesList, scalesList, max) {
  if (mode !== 3) {
    let scaleOrChordArray;

    if (mode === 1) {
      scaleOrChordArray = chords.filter(
        (chord) => chord.intervalles.length <= max
      );
    } else if (mode === 2) {
      scaleOrChordArray = scales;
    }

    const randVal1 = Math.floor(Math.random() * notesList.length);
    const randomNote = notesList[randVal1];
    const randVal2 = Math.floor(Math.random() * scalesList.length);
    const randomScaleOrChord = scaleOrChordArray[scalesList[randVal2]];
    return {
      nom: midiToNote(randomNote) + randomScaleOrChord.nom,
      intervalles: randomScaleOrChord.intervalles.map(
        (intervall) => (intervall + randomNote) % 12
      ),
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

    return {
      nom: chordName[0],
      intervalles: chord,
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

const findChordName = (accord) => {
  // Recherche dans le dictionnaire des accords
  for (let chord of chordDictionary) {
    // Trie les intervalles de l'accord pour comparaison
    const sortedIntervals = chord.intervalles;

    // Si les intervalles sont égaux, retourne le nom de l'accord
    if (JSON.stringify(sortedIntervals) === JSON.stringify(accord)) {
      return chord.nom;
    }
  }

  // Si l'accord n'est pas trouvé
  return null;
};
