import { chords, scales, notesList, chordDictionary } from "./arrays";

export default function setRandom(mode, random, scale, note) {
  if (random) {
    const a = Math.floor(Math.random() * notesList.length);
    if (mode === 1) {
      const i = Math.floor(Math.random() * chords.length);
      return {
        nom: midiToNote(a) + chords[i].nom,
        intervalles: chords[i].intervalles.map(
          (intervall) => (intervall + a) % 12
        ),
      };
    } else if (mode === 2) {
      const i = Math.floor(Math.random() * scales.length);
      return {
        nom: midiToNote(a) + scales[i].nom,
        intervalles: scales[i].intervalles.map(
          (intervall) => (intervall + a) % 12
        ),
      };
    }
  } else {
    if (mode === 1) {
      // Fonction pour obtenir une valeur aléatoire dans une liste

      const generateChord = () => {
        const getRandomValue = (list) =>
          list[Math.floor(Math.random() * list.length)];
        let chordName = null;
        let accord;

        // Tant que le nom de l'accord est null, on réexécute le processus
        do {
          const nombreDeNotesDansAccord =
            Math.floor(Math.random() * (scales[scale].intervalles.length - 2)) +
            3;
          const rootIndex = getRandomValue(
            [...Array(scales[scale].intervalles.length).keys()] // Sélectionne un index valide
          );
          const accordSansRoot = Array.from(
            { length: nombreDeNotesDansAccord },
            (_, i) => {
              const index =
                (rootIndex + i * 2) % scales[scale].intervalles.length;
              return scales[scale].intervalles[index];
            }
          );
          accord = accordSansRoot.map((n) => (n + note) % 12);
          // Appeler la fonction identifyChord
          chordName = identifyChord(accordSansRoot);
        } while (chordName === null); // Réexécute si l'accord est inconnu (null)

        return [chordName, accord]; // Une fois que identifyChord retourne un nom valide
      };

      const chord = generateChord();
      if (chord) {
        return {
          nom: notesList[chord[1][0]] + chord[0],
          intervalles: chord[1],
        };
      }
    } else if (mode === 2) {
      const i = Math.floor(Math.random() * notesList.length);
      return {
        nom: midiToNote(i) + scales[scale].nom,
        intervalles: scales[scale].intervalles.map(
          (intervall) => (intervall + i) % 12
        ),
      };
    }
  }

  return null;
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
