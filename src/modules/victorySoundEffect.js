import useStore from "../store";
import { useEffect, useRef } from "react";
import * as Tone from "tone";

export default function VictorySoundEffect() {
  const score = useStore((state) => state.score);
  const pianoSound = useStore((state) => state.pianoSound);
  const victoryVolume = useStore((state) => state.victoryVolume);

  const synthRef = useRef(null);

  //console.log("victory sound module");

  useEffect(() => {
    synthRef.current = new Tone.PolySynth({
      envelope: {
        attack: 0.01,
        decay: 0.05,
        sustain: 0,
        release: 0,
      },
    }).toDestination();

    return () => {
      synthRef.current.dispose();
      synthRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (synthRef.current && score > 0) {
      synthRef.current.triggerAttackRelease("C7", "16n");
    }
  }, [score, pianoSound]);

  useEffect(() => {
    if (synthRef.current) {
      synthRef.current.volume.value = victoryVolume - 80;
    }
  }, [victoryVolume]);

  return null;
}
