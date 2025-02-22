import { useEffect } from "react";
import useStore from "../store";
import setRandom from "./setRandom";

export default function NotesSuggestion() {
  const mode = useStore((state) => state.mode);
  const beat = useStore((state) => state.beat);
  const scrollMode = useStore((state) => state.scrollMode);
  const score = useStore((state) => state.score);
  const setSuggestion = useStore((state) => state.setSuggestion);
  const notesListStore = useStore((state) => state.notesListStore);
  const scalesListStore = useStore((state) => state.scalesListStore);
  const play = useStore((state) => state.play);
  const notesMax = useStore((state) => state.notesMax);

  useEffect(() => {
    for (let i = 0; i < 4; i++) {
      const rand = setRandom(mode, notesListStore, scalesListStore, notesMax);

      setSuggestion(rand);
    }
  }, [mode, notesListStore, scalesListStore, notesMax]);

  useEffect(() => {
    if (beat === 0 && play) {
      const rand = setRandom(mode, notesListStore, scalesListStore, notesMax);
      setSuggestion(rand);
    }
  }, [beat, scrollMode, mode, notesListStore, scalesListStore, notesMax]);

  useEffect(() => {
    if (scrollMode) {
      const rand = setRandom(mode, notesListStore, scalesListStore, notesMax);
      setSuggestion(rand);
    }
  }, [mode, notesListStore, scalesListStore, score, notesMax]);
  return null;
}
