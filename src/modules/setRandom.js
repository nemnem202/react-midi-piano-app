import { chords, scales, chordDictionary } from "./arrays";

export default function setRandom(mode, notesList, scalesList) {
  let scaleOrChordArray;

  if (mode === 1) {
    scaleOrChordArray = chords;
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

const identifyChord = (notes) => {
  // Construire l'accord par rapport à la fondamentale (première note)
  const root = notes[0];
  const intervals = notes.map((note) => (note - root + 12) % 12);
  const intervalKey = intervals.join(",");

  // Vérifier si l'accord est dans le dictionnaire
  if (chordDictionary[intervalKey]) {
    return chordDictionary[intervalKey];
  }

  // Si l'accord n'est pas trouvé, retourner null
  return null;
};
