import "./piano.css";
import { useEffect, useState } from "react";
import useStore from "../store";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

export default function PianoComponent() {
  const noteOn = useStore((state) => state.noteOn);
  const noteOff = useStore((state) => state.noteOff);
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
    <div
      className="fullKeyboardContainer"
      onClick={() => {
        setPianoSound(!pianoSound);
      }}
    >
      <div className="boxShadow"></div>
      <div className="square">
        {pianoSound ? (
          <FaVolumeUp className="volumeUp" />
        ) : (
          <FaVolumeMute className="volumeDown" />
        )}
      </div>
      {Array.from({ length: nmbrOctaves }).map((_, index) => (
        <div key={index} className="octaveContainer">
          <div className="whiteKeyContainer">
            <div className={`whiteKey key-0 index-${0 + 12 * index}`}></div>

            <div className={`whiteKey key-2 index-${2 + 12 * index}`}></div>
            <div className={`whiteKey key-4 index-${4 + 12 * index}`}></div>
            <div className={`whiteKey key-5 index-${5 + 12 * index}`}></div>
            <div className={`whiteKey key-7 index-${7 + 12 * index}`}></div>
            <div className={`whiteKey key-9 index-${9 + 12 * index}`}></div>
            <div className={`whiteKey key-11 index-${11 + 12 * index}`}></div>
          </div>

          <div className="blackKeyContainer">
            <div className="empty1"></div>
            <div className={`blackKey key-1 index-${1 + 12 * index}`}></div>
            <div className={`blackKey key-3 index-${3 + 12 * index}`}></div>
            <div className="empty2"></div>
            <div className={`blackKey key-6 index-${6 + 12 * index}`}></div>
            <div className={`blackKey key-8 index-${8 + 12 * index}`}></div>
            <div className={`blackKey key-10 index-${10 + 12 * index}`}></div>
          </div>
        </div>
      ))}
    </div>
  );
}
