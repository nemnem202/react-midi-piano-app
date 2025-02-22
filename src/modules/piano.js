import "./piano.css";
import { useEffect, useState } from "react";
import useStore from "../store";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

export default function PianoComponent() {
  const noteOn = useStore((state) => state.noteOn);
  const noteOff = useStore((state) => state.noteOff);
  const addNote = useStore((state) => state.addNote);
  const removeNote = useStore((state) => state.removeNote);
  const activeSuggestion = useStore((state) => state.activeSuggestion);
  const pianoSound = useStore((state) => state.pianoSound);
  const setPianoSound = useStore((state) => state.setPianoSound);

  const nmbrOctaves = 4;

  //console.log("piano module");

  useEffect(() => {
    if (noteOn !== undefined) {
      const keyElement = document.querySelector(
        `.index-${noteOn % (12 * nmbrOctaves)}`
      );
      if (keyElement && activeSuggestion.intervalles.includes(noteOn % 12)) {
        keyElement.classList.add("correct");
      } else {
        keyElement.classList.add("error");
      }
    }
  }, [noteOn]);

  useEffect(() => {
    if (noteOff !== undefined) {
      const keyElement = document.querySelector(
        `.index-${noteOff % (12 * nmbrOctaves)}`
      );
      if (keyElement && activeSuggestion.intervalles.includes(noteOff % 12)) {
        keyElement.classList.remove("correct");
      } else {
        keyElement.classList.remove("error");
      }
    }
  }, [noteOff]);

  useEffect(() => {
    document
      .querySelectorAll(".active")
      .forEach((el) => el.classList.remove("active"));
    document
      .querySelectorAll(".root")
      .forEach((el) => el.classList.remove("root"));
    document
      .querySelectorAll(".correct")
      .forEach((el) => el.classList.remove("correct"));
    document
      .querySelectorAll(".error")
      .forEach((el) => el.classList.remove("error"));
    if (activeSuggestion.intervalles) {
      for (let i = 0; i <= nmbrOctaves; i++) {
        activeSuggestion.intervalles.forEach((key) => {
          const actives = document.querySelector(
            `.index-${(key % 12) + 12 * i}`
          );
          if (actives) {
            actives.classList.add("active");
          }
          const root = document.querySelector(
            `.index-${activeSuggestion.intervalles[0] + 12 * i}`
          );
          if (root) {
            root.classList.add("root");
          }
        });
      }
    }
  }, [activeSuggestion]);

  return (
    <div className="fullKeyboardContainer">
      {Array.from({ length: nmbrOctaves }).map((_, index) => (
        <div key={index} className="octaveContainer">
          <div className="whiteKeyContainer">
            {[0, 2, 4, 5, 7, 9, 11].map((note) => (
              <div
                key={note}
                className={`whiteKey key-${note} index-${note + 12 * index}`}
              ></div>
            ))}
          </div>

          <div className="blackKeyContainer">
            <div className="empty1"></div>
            {[1, 3].map((note) => (
              <div
                key={note}
                className={`blackKey key-${note} index-${note + 12 * index}`}
              ></div>
            ))}
            <div className="empty2"></div>
            {[6, 8, 10].map((note) => (
              <div
                key={note}
                className={`blackKey key-${note} index-${note + 12 * index}`}
              ></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
