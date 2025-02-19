import { useEffect, useState } from "react";
import useStore from "../store";

export default function Score() {
  const noteOn = useStore((state) => state.noteOn);
  const activeSuggestion = useStore((state) => state.activeSuggestion);
  const score = useStore((state) => state.score);
  const setScore = useStore((state) => state.setScore);
  const checked = useStore((state) => state.checked);
  const setChecked = useStore((state) => state.setChecked);
  const numberOfPlayedNotes = useStore((state) => state.numberOfPlayedNotes);

  const [correct, setCorrect] = useState([]);
  const [wrong, setWrong] = useState(0);

  //console.log("score module");

  useEffect(() => {
    setCorrect([]);
    setWrong(0);
    setChecked(false);
  }, [activeSuggestion]);

  useEffect(() => {
    if (noteOn && activeSuggestion.intervalles.includes(noteOn % 12)) {
      if (!correct.includes(noteOn)) {
        setCorrect([...correct, noteOn]);
      }
    } else if (noteOn) {
      setWrong(wrong + 1);
    }
  }, [noteOn, activeSuggestion]);

  useEffect(() => {
    if (
      correct.length === activeSuggestion.intervalles?.length &&
      !checked &&
      numberOfPlayedNotes === 0
    ) {
      setScore(score + 1);
      setChecked(true);
    }
  }, [numberOfPlayedNotes, score]);

  return (
    <>
      <h3 className="green">correct</h3>
      <h2 className="green" style={{ display: "flex", gap: "5px" }}>
        <p>{correct.length}</p> <p>/</p>{" "}
        <p>{activeSuggestion.intervalles?.length}</p>
      </h2>
      <h3 className="red">wrong</h3>
      <h2 className="red">{wrong}</h2>
      <h2>score</h2>
      <h1>{score}</h1>
    </>
  );
}
