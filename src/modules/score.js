import { useEffect, useState } from "react";
import useStore from "../store";

export default function Score() {
  const noteOn = useStore((state) => state.noteOn);
  const activeSuggestion = useStore((state) => state.activeSuggestion);
  const score = useStore((state) => state.score);
  const setScore = useStore((state) => state.setScore);
  const activeNotes = useStore((state) => state.activeNotes);
  const scrollMode = useStore((state) => state.scrollMode);
  const beat = useStore((state) => state.beat);

  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [checked, setChecked] = useState([]);
  const [lastSuggestionLength, setLastSuggestionLength] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setWrong(0);
    setChecked([]);
    setCorrect(0);
    setDone(false);
    if (activeSuggestion.intervalles) {
      setLastSuggestionLength(activeSuggestion.intervalles.length);
    }
  }, [activeSuggestion, scrollMode]);

  useEffect(() => {
    if (!activeSuggestion.intervalles) return;

    if (
      activeSuggestion.intervalles.includes(noteOn % 12) &&
      !checked.includes(noteOn % 12)
    ) {
      setCorrect(correct + 1);
      checked.push(noteOn % 12);
      console.log(checked);
    } else if (activeSuggestion.intervalles.includes(noteOn % 12)) {
    } else if (noteOn !== undefined) setWrong(wrong + 1);
  }, [noteOn]);

  useEffect(() => {
    if (
      checked.length === lastSuggestionLength &&
      checked.length > 0 &&
      activeNotes.size === 0 &&
      !done
    ) {
      setDone(true);
      setScore(score + 1);
    }
  }, [activeNotes]);

  return (
    <>
      <h3 className="green">correct</h3>
      <h2 className="green" style={{ display: "flex", gap: "5px" }}>
        <p>{correct}</p> <p>/</p> <p>{activeSuggestion.intervalles?.length}</p>
      </h2>
      <h3 className="red">wrong</h3>
      <h2 className="red">{wrong}</h2>
      <h2>score</h2>
      <h1>{score}</h1>
    </>
  );
}
