import { useEffect, useRef } from "react";
import useStore from "../store";
import * as Tone from "tone";

export default function MetronomeSound() {
  const beat = useStore((state) => state.beat);
  const play = useStore((state) => state.play);
  const metronomeVolume = useStore((state) => state.metronomeVolume);

  const synthRef = useRef(null);
  const gainRef = useRef(null);
  const isPlayingRef = useRef(false); // Mutex pour éviter les exécutions simultanées

  useEffect(() => {
    gainRef.current = new Tone.Gain(
      Tone.dbToGain(metronomeVolume - 80)
    ).toDestination();

    synthRef.current = new Tone.NoiseSynth({
      noise: { type: "white" },
      envelope: {
        attack: 0.01,
        decay: 0.2,
        sustain: 0,
        release: 0.1,
      },
    }).connect(gainRef.current);

    return () => {
      if (synthRef.current) {
        synthRef.current.dispose();
        synthRef.current = null;
      }
      if (gainRef.current) {
        gainRef.current.dispose();
        gainRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!play || isPlayingRef.current) return; // Empêche l'exécution simultanée

    isPlayingRef.current = true;

    if (beat === 0) {
      synthRef.current.noise.type = "white";
      gainRef.current.gain.value = Tone.dbToGain(metronomeVolume - 80);
    } else {
      synthRef.current.noise.type = "pink";
      gainRef.current.gain.value = Tone.dbToGain(metronomeVolume - 75);
    }

    synthRef.current.triggerAttackRelease("16n");

    setTimeout(() => {
      isPlayingRef.current = false; // Libère le verrou après l'exécution
    }, 50); // 50ms de délai pour éviter un déclenchement simultané
  }, [beat, play]);

  useEffect(() => {
    if (gainRef.current) {
      gainRef.current.gain.value = Tone.dbToGain(metronomeVolume - 80);
    }
  }, [metronomeVolume]);

  return null;
}
