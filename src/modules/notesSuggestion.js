import { useEffect } from "react";
import useStore from "../store";
import setRandom from "./setRandom";

export default function NotesSuggestion() {
  const mode = useStore((state) => state.mode);
  const beat = useStore((state) => state.beat);
  const scrollMode = useStore((state) => state.scrollMode);
  const checked = useStore((state) => state.checked);
  const score = useStore((state) => state.score);
  const setSuggestion = useStore((state) => state.setSuggestion);
  const random = useStore((state) => state.random);
  const scale = useStore((state) => state.scale);
  const note = useStore((state) => state.note);
  //console.log("notesSuggestion module");

  useEffect(() => {
    for (let i = 0; i < 4; i++) {
      let rand;
      do {
        rand = setRandom(mode, random, scale, note);
      } while (!rand.nom);
      setSuggestion(rand);
    }
  }, [mode, random, scale, note]);

  useEffect(() => {
    if ((beat === 0 && !checked && !scrollMode) || (scrollMode && checked)) {
      let rand;
      do {
        rand = setRandom(mode, random, scale, note);
      } while (!rand.nom);
      setSuggestion(rand);
    }
  }, [beat, score, scrollMode, checked, mode, random, scale, note]); // L'effet se déclenche lorsque `beat` ou `score` changent.
  return null;
}
