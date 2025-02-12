import { Button, Menu, MenuItem } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import useStore from "../store";
import { chords, scales, notesList } from "./arrays";

export default function ChordScalesSetting() {
  const mode = useStore((state) => state.mode);
  const setMode = useStore((state) => state.setMode);
  const random = useStore((state) => state.random);
  const setScale = useStore((state) => state.setScale);
  const scale = useStore((state) => state.scale);
  const note = useStore((state) => state.note);
  const setNote = useStore((state) => state.setNote);

  const themeChoice = useStore((state) => state.themeChoice);

  const [anchorScale, setAnchorScale] = useState(null);
  const [anchorNote, setAnchorNote] = useState(null);

  const noteRef = useRef(null);
  const scaleRef = useRef(null);

  const inputRef = useRef(null);

  const handleCloseScale = (e) => {
    setAnchorScale(null); // Ferme le menu
    setScale(e.target.value);
  };

  const handleCloseNote = (e) => {
    setAnchorNote(null);
    setNote(e.target.value);
  };

  const handleClickScale = (event) => {
    setAnchorScale(event.currentTarget); // Ouvre le menu en utilisant l'élément cliqué
  };

  const handleClickNote = (event) => {
    setAnchorNote(event.currentTarget); // Ouvre le menu en utilisant l'élément cliqué
  };

  useEffect(() => {
    adjustWidth(noteRef, note);
  }, [note, mode]);

  useEffect(() => {
    adjustWidth(scaleRef, scale);
  }, [scale]);

  const adjustWidth = (ref) => {
    if (ref.current) {
      // Crée un span temporaire
      const tempSpan = document.createElement("span");
      tempSpan.style.visibility = "hidden";
      tempSpan.style.position = "absolute";
      tempSpan.style.display = "inline-block";
      tempSpan.style.whiteSpace = "pre";

      // Récupère les styles de l'input, incluant la police, la taille et autres propriétés
      const inputStyles = getComputedStyle(ref.current);
      tempSpan.style.font = inputStyles.font;
      tempSpan.style.fontSize = inputStyles.fontSize;
      tempSpan.style.fontWeight = inputStyles.fontWeight;
      tempSpan.style.fontFamily = inputStyles.fontFamily;
      tempSpan.style.letterSpacing = inputStyles.letterSpacing;

      // Applique le texte à mesurer
      tempSpan.textContent = ref.current.value || " ";
      document.body.appendChild(tempSpan);

      // Applique la largeur calculée plus un petit ajout
      ref.current.style.width = `${tempSpan.offsetWidth + 5}px`;
      ref.current.style.boxSizing = "content-box"; // Appliquer aussi à l'input

      // Nettoyer après le calcul
      document.body.removeChild(tempSpan);
    }
  };

  return (
    <>
      {" "}
      <div>
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
        Notes{" "}
        <div>
          {mode === 1 ? "In the scale of" : "All scales will be"}
          {mode === 1 ? (
            <input
              ref={noteRef}
              type="text"
              value={notesList[note]}
              onClick={handleClickNote}
              onChange={(e) => adjustWidth(inputRef)}
            />
          ) : (
            ""
          )}

          <Menu
            anchorEl={anchorNote}
            open={Boolean(anchorNote)}
            onClose={handleCloseNote}
            sx={{
              "& .MuiMenu-paper": {
                backgroundColor:
                  themeChoice === 1
                    ? "rgba(255, 56, 100, 0.5)"
                    : themeChoice === 2
                    ? "rgba(71, 155, 135, 0.5)"
                    : themeChoice === 3
                    ? "rgba(129, 151, 163, 0.5)"
                    : "",

                borderRadius: "2px", // Bords arrondis
                padding: "0px", // Padding interne du menu
                boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.5)", // Ombre portée
                color: "var(--foreground)",
              },
            }}
          >
            {notesList.map((note, index) => (
              <MenuItem key={index} onClick={handleCloseNote} value={index}>
                {note}
              </MenuItem>
            ))}
          </Menu>
          <input
            ref={scaleRef}
            type="text"
            value={scales[scale].nom}
            onClick={handleClickScale}
            onChange={(e) => adjustWidth(scaleRef)}
          />
          <Menu
            anchorEl={anchorScale}
            open={Boolean(anchorScale)}
            onClose={handleCloseScale}
            sx={{
              "& .MuiMenu-paper": {
                backgroundColor:
                  themeChoice === 1
                    ? "rgba(255, 56, 100, 0.5)"
                    : themeChoice === 2
                    ? "rgba(71, 155, 135, 0.5)"
                    : themeChoice === 3
                    ? "rgba(129, 151, 163, 0.5)"
                    : "",
                borderRadius: "2px", // Bords arrondis
                padding: "0px", // Padding interne du menu
                boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.5)", // Ombre portée
                color: "var(--foreground)",
              },
            }}
          >
            {scales.map((sc, index) => (
              <MenuItem key={index} onClick={handleCloseScale} value={index}>
                {sc.nom}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </div>
      <div className="gridBlack">
        <button
          className={
            scales[scale].intervalles.includes((1 + note) % 12)
              ? "backGroundRed"
              : ""
          }
          style={{ gridColumn: "1" }}
        >
          C#
        </button>{" "}
        <button
          className={
            scales[scale].intervalles.includes((3 + note) % 12)
              ? "backGroundRed"
              : ""
          }
          style={{ gridRow: "1", gridColumn: "2" }}
        >
          D#
        </button>{" "}
        <button
          className={
            scales[scale].intervalles.includes((6 + note) % 12)
              ? "backGroundRed"
              : ""
          }
          style={{ gridRow: "1", gridColumn: "4" }}
        >
          F#
        </button>{" "}
        <button
          className={
            scales[scale].intervalles.includes((8 + note) % 12)
              ? "backGroundRed"
              : ""
          }
          style={{ gridRow: "1", gridColumn: "5" }}
        >
          G#
        </button>{" "}
        <button
          className={
            scales[scale].intervalles.includes((10 + note) % 12)
              ? "backGroundRed"
              : ""
          }
          style={{ gridRow: "1", gridColumn: "6" }}
        >
          A#
        </button>{" "}
      </div>
      <div className="gridWhite">
        <button
          className={
            scales[scale].intervalles.includes((0 + note) % 12)
              ? "backGroundRed"
              : ""
          }
          style={{ gridColumn: "1" }}
        >
          C
        </button>{" "}
        <button
          className={
            scales[scale].intervalles.includes((2 + note) % 12)
              ? "backGroundRed"
              : ""
          }
          style={{ gridColumn: "2" }}
        >
          D
        </button>{" "}
        <button
          className={
            scales[scale].intervalles.includes((4 + note) % 12)
              ? "backGroundRed"
              : ""
          }
          style={{ gridColumn: "3" }}
        >
          E
        </button>{" "}
        <button
          className={
            scales[scale].intervalles.includes((5 + note) % 12)
              ? "backGroundRed"
              : ""
          }
          style={{ gridColumn: "4" }}
        >
          F
        </button>{" "}
        <button
          className={
            scales[scale].intervalles.includes((7 + note) % 12)
              ? "backGroundRed"
              : ""
          }
          style={{ gridColumn: "5" }}
        >
          G
        </button>{" "}
        <button
          className={
            scales[scale].intervalles.includes((9 + note) % 12)
              ? "backGroundRed"
              : ""
          }
          style={{ gridColumn: "6" }}
        >
          A
        </button>{" "}
        <button
          className={
            scales[scale].intervalles.includes((11 + note) % 12)
              ? "backGroundRed"
              : ""
          }
          style={{ gridColumn: "7" }}
        >
          B
        </button>
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
