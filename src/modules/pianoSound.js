import useStore from "../store";
import { useEffect, useRef } from "react";
import * as Tone from "tone";

export default function PianoSound() {
  const noteOn = useStore((state) => state.noteOn);
  const noteOff = useStore((state) => state.noteOff);
  const pianoSound = useStore((state) => state.pianoSound);
  const pianoVolume = useStore((state) => state.pianoVolume);

  //console.log("pianoSound module");

  const synthRef = useRef(null);
  useEffect(() => {
    if (pianoSound) {
      console.log("Audio context was allowed to start");

      synthRef.current = new Tone.PolySynth(Tone.Synth).toDestination();
      return () => {
        synthRef.current.dispose(); // Nettoyer à la destruction du composant
      };
    }
  }, [pianoSound]);
  useEffect(() => {
    if (noteOn && synthRef.current) {
      synthRef.current.triggerAttack(midiToNote(noteOn));
    }
  }, [noteOn, pianoSound]);
  useEffect(() => {
    if (noteOff && synthRef.current) {
      synthRef.current.triggerRelease(midiToNote(noteOff));
    }
  }, [noteOff, pianoSound]);
  useEffect(() => {
    if (synthRef.current) {
      synthRef.current.volume.value = pianoVolume - 80;
    }
  }, [pianoVolume]);
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
