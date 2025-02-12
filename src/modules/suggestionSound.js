import { useEffect, useRef } from "react";
import useStore from "../store";
import * as Tone from "tone";

export default function SuggestionSound() {
  const play = useStore((state) => state.play);
  const suggestionVolume = useStore((state) => state.suggestionVolume);
  const activeSuggestion = useStore((state) => state.activeSuggestion);
  const bpm = useStore((state) => state.bpm);

  const synthRef = useRef(null);

  useEffect(() => {
    console.log("SuggestionSound synth init");
    Tone.Transport.bpm.value = bpm;
    synthRef.current = new Tone.PolySynth(Tone.Synth).toDestination();
    return () => {
      console.log("SuggestionSound synth dispose");
      synthRef.current.dispose(); // Nettoyer à la destruction du composant
    };
  }, [bpm]);

  useEffect(() => {
    if (play && synthRef.current) {
      for (
        let i = 0;
        i < activeSuggestion.intervalles.length;
        i += 2 // On commence à partir de la deuxième note et on en prend 1/2
      ) {
        synthRef.current.triggerAttackRelease(
          midiToNote(activeSuggestion.intervalles[i] + 12 * 5),
          `2n`
        );
      }
    }
  }, [activeSuggestion, play, bpm]);

  useEffect(() => {
    if (synthRef.current) {
      synthRef.current.volume.value = suggestionVolume - 80;
    }
  }, [suggestionVolume]);

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
  const octave = Math.floor(midiValue / 12) - 1;
  const noteIndex = midiValue % 12;
  return `${notes[noteIndex]}${octave}`;
};
