import { useEffect, useState } from "react";
import useStore from "../store";
import "./displayChordName.css";

export default function DisplayChordName() {
  const suggestion = useStore((state) => state.suggestion);
  const nextSuggestion = useStore((state) => state.nextSuggestion);
  const activeSuggestion = useStore((state) => state.activeSuggestion);
  const passedSuggestion = useStore((state) => state.passedSuggestion);
  const play = useStore((state) => state.play);
  useEffect(() => {
    if (!play) {
      setChordContainer(
        suggestion.nom,
        nextSuggestion.nom,
        activeSuggestion.nom,
        passedSuggestion.nom
      );
      return;
    }
    translateChords();
    setTimeout(() => {
      setChordContainer(
        suggestion.nom,
        nextSuggestion.nom,
        activeSuggestion.nom,
        passedSuggestion.nom
      );
    }, 300);
  }, [suggestion]);

  return (
    <div className="chordContainer">
      <div class="passedChord">{passedSuggestion.nom}</div>
      <div class="activeChord">{activeSuggestion.nom}</div>
      <div class="nextChord">{nextSuggestion.nom}</div>
      <div class="nextChord2">{nextSuggestion.nom}</div>
    </div>
  );
}

function setChordContainer(sug, next, active, passed) {
  const container = document.querySelector(".chordContainer");
  if (passed && active && next && sug) {
    container.innerHTML = `
      <div class="passedChord">${passed}</div>
      <div class="activeChord">${active}</div>
      <div class="nextChord">${next}</div>
      <div class="nextChord2">${sug}</div>
    `;
  }
}

const translateChords = () => {
  const passedChord = document.querySelector(".passedChord");
  const activeChord = document.querySelector(".activeChord");
  const nextChord = document.querySelector(".nextChord");
  const nextChord2 = document.querySelector(".nextChord2");

  passedChord.style.transform = "translateX(-110%)";
  passedChord.style.opacity = "0";
  passedChord.style.fontSize = "3vw";

  activeChord.style.transform = "translateX(-110%)";
  //activeChord.style.backgroundPosition = "0px 0";
  activeChord.style.fontSize = "3vw";
  activeChord.style.opacity = "0.5";

  nextChord.style.transform = "translateX(-110%)";
  //nextChord.style.backgroundPosition = "-420px 0";
  nextChord.style.fontSize = "4vw";
  nextChord.style.opacity = "1";

  nextChord2.style.transform = "translateX(-110%)";
  //nextChord2.style.backgroundPosition = "-840px 0";
  nextChord2.style.opacity = "0.5";
  activeChord.style.fontSize = "3vw";
};
