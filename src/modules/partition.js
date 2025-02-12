import { useEffect } from "react";
import "./partition.css";
import useStore from "../store";

export default function Partition() {
  const activeSuggestion = useStore((state) => state.activeSuggestion);

  //console.log("partition module");

  const array = [
    1, 2, 2, 3, 3, 4, 5, 5, 6, 6, 7, 7, 8, 9, 9, 10, 10, 11, 12, 12, 13, 13, 14,
    14,
  ];
  useEffect(() => {
    if (activeSuggestion.intervalles) {
      document.querySelectorAll(".note").forEach((note) => note.remove());
      document.querySelectorAll(".diese").forEach((diese) => diese.remove());
      document.querySelectorAll(".doline").forEach((line) => line.remove());
      const container = document.querySelector(".partitionContainer");

      const sugInterv = activeSuggestion.intervalles;

      sugInterv.sort((a, b) => a - b);

      for (let i = 0; i < sugInterv.length; i++) {
        // Correction ici
        const newNote = document.createElement("div");
        const note = sugInterv[i] % 12;
        newNote.classList.add("note", `l${array[note]}`);
        let diese;
        let doline;
        const prevDiv = document.querySelector(`.note.l${array[note] - 1}`);
        if (prevDiv && !prevDiv?.classList.contains("decalleNote")) {
          newNote.classList.add("decalleNote");
        }
        if ([1, 3, 6, 8, 10].includes(note)) {
          diese = document.createElement("div");
          diese.classList.add("diese", `l${array[note]}`);
          diese.innerText = "#"; // Correction ici

          const prev = document.querySelector(`.diese.l${array[note] - 1}`);
          if (prev && !prev?.classList.contains("decalle")) {
            diese.classList.add("decalle");
          }
        }
        if (array[note] === 1) {
          doline = document.createElement("div");
          doline.classList.add("doline");
        }
        container.appendChild(newNote);
        if (diese) {
          container.appendChild(diese);
        }
        if (doline) {
          container.appendChild(doline);
        }
      }
    }
  }, [activeSuggestion]);

  return (
    <div className="partitionContainer">
      <div className="line l3"></div>
      <div className="line l5"></div>
      <div className="line l7"></div>
      <div className="line l9"></div>
      <div className="line l11"></div>
    </div>
  );
}
