import useStore from "../store";
import { useEffect, useState } from "react";
import Switch from "./switch";

export default function ScrollMode() {
  const setScrollMode = useStore((state) => state.setScrollMode);
  const scrollMode = useStore((state) => state.scrollMode);
  const setPlay = useStore((state) => state.setPlay);
  const numberOfPlayedNotes = useStore((state) => state.numberOfPlayedNotes);
  const checked = useStore((state) => state.checked);
  const setChecked = useStore((state) => state.setChecked);

  //console.log("scrollMode module")

  useEffect(() => {
    if (checked && numberOfPlayedNotes === 0) {
      setChecked(false);
    }
  }, [numberOfPlayedNotes]);

  return (
    <Switch
      onClick={() => {
        setScrollMode(!scrollMode);
        setPlay(false);
      }}
      bool={scrollMode}
    />
  );
}
