import { Button, Menu, MenuItem } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import useStore from "../store";
import { chords, scales, notesList } from "./arrays";
import Switch from "./switch";

export default function ChordScalesSetting() {
  const mode = useStore((state) => state.mode);
  const setMode = useStore((state) => state.setMode);
  const random = useStore((state) => state.random);

  const lastNotesListStore = useStore((state) => state.lastNotesListStore);
  const notesListStore = useStore((state) => state.notesListStore);
  const setNotesListStore = useStore((state) => state.setNotesListStore);
  const pushNoteListStore = useStore((state) => state.pushNoteListStore);
  const filterNoteListStore = useStore((state) => state.filterNoteListStore);

  const lastScalesListStore = useStore((state) => state.lastScalesListStore);
  const scalesListStore = useStore((state) => state.scalesListStore);
  const setScalesListStore = useStore((state) => state.setScalesListStore);
  const pushScalesListStore = useStore((state) => state.pushScalesListStore);
  const filterScalesListStore = useStore(
    (state) => state.filterScalesListStore
  );

  const handleNotesChange = (num) => {
    if (notesListStore.includes(num)) {
      filterNoteListStore(num);
    } else {
      pushNoteListStore(num);
    }
  };

  const handleScaleChange = (num) => {
    if (scalesListStore.includes(num)) {
      filterScalesListStore(num);
    } else {
      pushScalesListStore(num);
    }
  };
  return (
    <>
      {" "}
      <div className="modeButtons">
        Mode :
        <button
          className={mode === 1 ? "backGroundRed" : ""}
          onClick={() => {
            setMode(1);
          }}
        >
          Chord
        </button>
        <button
          className={mode === 2 ? "backGroundRed" : ""}
          onClick={() => {
            setMode(2);
          }}
        >
          Scale
        </button>
      </div>
      <div className="setNotes">
        Root note of the scale
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            className={notesListStoreIsComplete(notesListStore) ? "red" : ""}
          >
            Random Notes
          </span>{" "}
          <Switch
            onClick={() => {
              notesListStoreIsComplete(notesListStore)
                ? setNotesListStore(lastNotesListStore)
                : setNotesListStore([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
            }}
            bool={notesListStoreIsComplete(notesListStore)}
          />
        </div>
      </div>
      <div className="gridBlack">
        <button
          style={{ gridRow: "1", gridColumn: "1" }}
          onClick={() => handleNotesChange(1)}
          className={notesListStore.includes(1) ? "backGroundRed" : ""}
        >
          C#
        </button>{" "}
        <button
          style={{ gridRow: "1", gridColumn: "2" }}
          onClick={() => handleNotesChange(3)}
          className={notesListStore.includes(3) ? "backGroundRed" : ""}
        >
          D#
        </button>{" "}
        <button
          style={{ gridRow: "1", gridColumn: "4" }}
          onClick={() => handleNotesChange(6)}
          className={notesListStore.includes(6) ? "backGroundRed" : ""}
        >
          F#
        </button>{" "}
        <button
          style={{ gridRow: "1", gridColumn: "5" }}
          onClick={() => handleNotesChange(8)}
          className={notesListStore.includes(8) ? "backGroundRed" : ""}
        >
          G#
        </button>{" "}
        <button
          style={{ gridRow: "1", gridColumn: "6" }}
          onClick={() => handleNotesChange(10)}
          className={notesListStore.includes(10) ? "backGroundRed" : ""}
        >
          A#
        </button>{" "}
      </div>
      <div className="gridWhite">
        <button
          style={{ gridColumn: "1" }}
          onClick={() => handleNotesChange(0)}
          className={notesListStore.includes(0) ? "backGroundRed" : ""}
        >
          C
        </button>{" "}
        <button
          style={{ gridColumn: "2" }}
          onClick={() => handleNotesChange(2)}
          className={notesListStore.includes(2) ? "backGroundRed" : ""}
        >
          D
        </button>{" "}
        <button
          style={{ gridColumn: "3" }}
          onClick={() => handleNotesChange(4)}
          className={notesListStore.includes(4) ? "backGroundRed" : ""}
        >
          E
        </button>{" "}
        <button
          style={{ gridColumn: "4" }}
          onClick={() => handleNotesChange(5)}
          className={notesListStore.includes(5) ? "backGroundRed" : ""}
        >
          F
        </button>{" "}
        <button
          style={{ gridColumn: "5" }}
          onClick={() => handleNotesChange(7)}
          className={notesListStore.includes(7) ? "backGroundRed" : ""}
        >
          G
        </button>{" "}
        <button
          style={{ gridColumn: "6" }}
          onClick={() => handleNotesChange(9)}
          className={notesListStore.includes(9) ? "backGroundRed" : ""}
        >
          A
        </button>{" "}
        <button
          style={{ gridColumn: "7" }}
          onClick={() => handleNotesChange(11)}
          className={notesListStore.includes(11) ? "backGroundRed" : ""}
        >
          B
        </button>
      </div>
      <div className="setScales">
        Chords
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            className={scalesListStore.length === scales.length ? "red" : ""}
          >
            Random Scale/chord
          </span>{" "}
          <Switch
            onClick={() => {
              scalesListStore.length === scales.length
                ? setScalesListStore(lastScalesListStore)
                : setScalesListStore(
                    Array.from({ length: scales.length }, (_, i) => i)
                  );
            }}
            bool={scalesListStore.length === scales.length}
          />
        </div>
      </div>
      <div className="scalesButtons">
        {mode === 2
          ? scales.map((scale, index) => (
              <button
                key={index}
                onClick={() => handleScaleChange(index)}
                className={
                  scalesListStore.includes(index) ? "backGroundRed" : ""
                }
              >
                {scale.nom}
              </button>
            ))
          : mode === 1
          ? chords.map((chord, index) => (
              <button
                key={index}
                onClick={() => handleScaleChange(index)}
                className={
                  scalesListStore.includes(index) ? "backGroundRed" : ""
                }
              >
                {chord.nom}
              </button>
            ))
          : ""}
      </div>
    </>
  );
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
  const octave = Math.floor(midiValue / 12) - 1;
  const noteIndex = midiValue % 12;
  return `${notes[noteIndex]}${octave}`;
};

const notesToMidi = (note) => {
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

  // Supprimer tous les espaces
  note = note.replace(/\s+/g, "");

  // Convertir les variations d'écriture comme "do#" et "DO#" en "C#"
  note = note
    .toUpperCase()
    .replace(/^do#/i, "C#")
    .replace(/^do/i, "C")
    .replace(/^re#/i, "D#")
    .replace(/^re/i, "D")
    .replace(/^mi/i, "E")
    .replace(/^fa#/i, "F#")
    .replace(/^fa/i, "F")
    .replace(/^sol#/i, "G#")
    .replace(/^sol/i, "G")
    .replace(/^la#/i, "A#")
    .replace(/^la/i, "A")
    .replace(/^si/i, "B");

  // Récupérer l'octave et la note sans octave
  const octave = parseInt(note.slice(-1), 10); // Octave (ex: "C4" -> 4)
  const noteName = note.slice(0, -1); // Note sans l'octave (ex: "C" ou "C#" sans 4)

  // Trouver l'index de la note dans le tableau
  const noteIndex = notes.indexOf(noteName);
  if (noteIndex === -1) {
    throw new Error("Note invalide.");
  }

  // Calculer la valeur MIDI
  return noteIndex + (octave + 1) * 12;
};

const notesListStoreIsComplete = (array) => {
  if (
    JSON.stringify(array) ===
    JSON.stringify([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
  ) {
    return true;
  } else {
    return false;
  }
};
