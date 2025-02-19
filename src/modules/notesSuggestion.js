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
  const notesListStore = useStore((state) => state.notesListStore);
  const scalesListStore = useStore((state) => state.scalesListStore);
  //console.log("notesSuggestion module");

  useEffect(() => {
    console.log("scalesListStore: ", scalesListStore);
  }, [scalesListStore]);

  useEffect(() => {
    for (let i = 0; i < 4; i++) {
      let rand;
      do {
        rand = setRandom(mode, notesListStore, scalesListStore);
      } while (!rand.nom);
      setSuggestion(rand);
    }
  }, [mode, notesListStore, scalesListStore]);

  useEffect(() => {
    if ((beat === 0 && !checked && !scrollMode) || (scrollMode && checked)) {
      let rand;
      do {
        rand = setRandom(mode, notesListStore, scalesListStore);
      } while (!rand.nom);
      setSuggestion(rand);
    }
  }, [beat, score, scrollMode, checked, mode, notesListStore, scalesListStore]); // L'effet se déclenche lorsque `beat` ou `score` changent.
  return null;
}
