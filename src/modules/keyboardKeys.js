import { useEffect } from "react";
import useStore from "../store";

const keyToMidi = {
  q: 60, // C4 (Do)
  z: 61, // C#4 (Do#)
  s: 62, // D4 (Ré)
  e: 63, // D#4 (Ré#)
  d: 64, // E4 (Mi)
  f: 65, // F4 (Fa)
  t: 66, // F#4 (Fa#)
  g: 67, // G4 (Sol)
  y: 68, // G#4 (Sol#)
  h: 69, // A4 (La)
  u: 70, // A#4 (La#)
  j: 71, // B4 (Si)
  k: 72, // C5 (Do, octave supérieure)
};

export default function KeyboardKeys() {
  const addNote = useStore((state) => state.addNote);
  const removeNote = useStore((state) => state.removeNote);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (keyToMidi[e.key]) {
        addNote(keyToMidi[e.key]);
      }
    };

    const handleKeyUp = (e) => {
      if (keyToMidi[e.key]) {
        removeNote(keyToMidi[e.key]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [addNote, removeNote]);

  return null;
}
