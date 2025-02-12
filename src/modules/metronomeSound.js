import { useEffect, useRef } from "react";
import useStore from "../store";
import * as Tone from "tone";

export default function MetronomeSound() {
  const beat = useStore((state) => state.beat);
  const play = useStore((state) => state.play);
  const metronomeVolume = useStore((state) => state.metronomeVolume);

  const synthRef = useRef(null);

  //console.log("metronome sound module");

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
    if (beat === 0 && play) {
      synthRef.current.triggerAttackRelease("C5", "16n");
    } else if (play) {
      synthRef.current.triggerAttackRelease("C4", "16n");
    }
  }, [beat, play]);

  useEffect(() => {
    if (synthRef.current) {
      synthRef.current.volume.value = metronomeVolume - 80;
    }
  }, [metronomeVolume]);

  return null;
}
