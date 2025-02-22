import { useEffect, useState } from "react";
import useStore from "../store";
import "./displayChordName.css";

export default function DisplayChordName() {
  const suggestion = useStore((state) => state.suggestion);
  const nextSuggestion = useStore((state) => state.nextSuggestion);
  const activeSuggestion = useStore((state) => state.activeSuggestion);
  const passedSuggestion = useStore((state) => state.passedSuggestion);
  const play = useStore((state) => state.play);
  //console.log("displayChord module");

  useEffect(() => {
    const container = document.querySelector(".chordContainer");
    if (!play) {
      return;
    }
    translateChords();
    let chord = container.querySelectorAll("div");
    chord.forEach((c) => {
      adaptTextSize(c);
    });
    setTimeout(() => {
      setChordContainer(
        container,
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
      <div class="nextChord2">{suggestion.nom}</div>
    </div>
  );
}

function setChordContainer(container, sug, next, active, passed) {
  if (passed && active && next && sug) {
    container.innerHTML = `
      <div class="passedChord">${passed}</div>
      <div class="activeChord">${active}</div>
      <div class="nextChord">${next}</div>
      <div class="nextChord2">${sug}</div>
    `;
    let chord = container.querySelectorAll("div");
    chord.forEach((c) => {
      adaptTextSize(c);
    });
  }
}

const translateChords = () => {
  const passedChord = document.querySelector(".passedChord");
  const activeChord = document.querySelector(".activeChord");
  const nextChord = document.querySelector(".nextChord");
  const nextChord2 = document.querySelector(".nextChord2");

  passedChord.style.transform = "translateX(-110%)";
  passedChord.style.opacity = "0";
  passedChord.style.fontSize = "100%";
  adaptTextSize(passedChord);

  activeChord.style.transform = "translateX(-110%)";
  //activeChord.style.backgroundPosition = "0px 0";
  activeChord.style.fontSize = "300%";
  activeChord.style.opacity = "0.5";
  adaptTextSize(activeChord);

  nextChord.style.transform = "translateX(-110%)";
  //nextChord.style.backgroundPosition = "-420px 0";
  nextChord.style.fontSize = "500%";
  nextChord.style.opacity = "1";
  adaptTextSize(nextChord);

  nextChord2.style.transform = "translateX(-110%)";
  //nextChord2.style.backgroundPosition = "-840px 0";
  nextChord2.style.opacity = "0.5";
  activeChord.style.fontSize = "300%";
  adaptTextSize(nextChord2);
};

function adaptTextSize(e) {
  let textLength = e.textContent.length;

  if (textLength < 5) {
    e.style.fontSize = "500%"; // Texte court => plus grand
  } else if (textLength < 10) {
    e.style.fontSize = "300%"; // Taille moyenne
  } else {
    e.style.fontSize = "100%"; // Texte long => plus petit
  }
}
