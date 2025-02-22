import useStore from "../store";
import { useEffect, useState } from "react";

export default function Reset() {
  const store = useStore();
  const [active, setActive] = useState(true);

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
      displayPartition,
      notesListStore,
      scalesListStore,
      notesMax,
      displayPiano,
    } = store;

    if (
      pianoVolume === 80 &&
      metronomeVolume === 80 &&
      suggestionVolume === 80 &&
      victoryVolume === 80 &&
      mode === 1 &&
      bpm === 100 &&
      signature === 4 &&
      scrollMode === false &&
      displayPartition === true &&
      JSON.stringify(notesListStore) ===
        JSON.stringify([0, 2, 4, 5, 7, 9, 11]) &&
      JSON.stringify(scalesListStore) === JSON.stringify([0, 1, 4, 5]) &&
      notesMax === 4 &&
      displayPiano === true
    ) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [store]);

  const handleClick = () => {
    const {
      setPianoVolume,
      setMetronomeVolume,
      setSuggestionVolume,
      setVictoryVolume,
      setBpm,
      setSignature,
      setScrollMode,
      setDisplayPartition,
      setNotesListStore,
      setMode,
      setNotesMax,
      setScalesListStore,
      setDisplayPiano,
    } = store;

    setPianoVolume(80);
    setMetronomeVolume(80);
    setSuggestionVolume(80);
    setVictoryVolume(80);
    setMode(1);
    setBpm(100);
    setSignature(4);
    setScrollMode(false);
    setDisplayPartition(true);
    setNotesListStore([0, 2, 4, 5, 7, 9, 11]);
    setScalesListStore([0, 1, 4, 5]);
    setNotesMax(4);
    setDisplayPiano(true);
  };

  return (
    <button onClick={handleClick} className={active ? "backGroundRed" : ""}>
      Default
    </button>
  );
}
