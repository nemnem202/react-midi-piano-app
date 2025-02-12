import { useEffect, useRef } from "react";
import useStore from "../store";

export default function Metronome() {
  const play = useStore((state) => state.play);
  const bpm = useStore((state) => state.bpm);
  const beat = useStore((state) => state.beat);
  const setBeat = useStore((state) => state.setBeat);
  const signature = useStore((state) => state.signature);

  const intervalRef1 = useRef(null);
  const synthRef = useRef(null);
  const beatRef = useRef(beat);

  //console.log("metronome module");

  useEffect(() => {
    clearInterval(intervalRef1.current);

    if (play) {
      intervalRef1.current = setInterval(() => {
        setBeat((beatRef.current + 1) % signature);
      }, 60000 / bpm);
    } else {
      clearInterval(intervalRef1.current);
      intervalRef1.current = null;
    }

    return () => {
      clearInterval(intervalRef1.current);
    };
  }, [play, bpm, signature]); // Ajout de `signature` comme dépendance

  // Nettoyage du synthétiseur au démontage du composant

  useEffect(() => {
    beatRef.current = beat;
  }, [beat]);

  return null;
}
