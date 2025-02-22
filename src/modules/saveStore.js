import { useEffect } from "react";
import useStore from "../store";

const LOCAL_STORAGE_KEY = "savedSuggestions";

export default function SaveStore() {
  const store = useStore();

  useEffect(() => {
    const {
      pianoVolume,
      metronomeVolume,
      suggestionVolume,
      victoryVolume,
      mode,
      bpm,
      signature,
      scrollMode,
      score,
      displayPartition,
      themeChoice,
      lastNotesListStore,
      notesListStore,
      lastScalesListStore,
      scalesListStore,
      notesMax,
      displayPiano,
    } = store;

    const state = JSON.stringify({
      pianoVolume,
      metronomeVolume,
      suggestionVolume,
      victoryVolume,
      mode,
      bpm,
      signature,
      scrollMode,
      score,
      displayPartition,
      themeChoice,
      lastNotesListStore,
      notesListStore,
      lastScalesListStore,
      scalesListStore,
      notesMax,
      displayPiano,
    });

    localStorage.setItem(LOCAL_STORAGE_KEY, state);
  }, [store]);

  return null;
}
