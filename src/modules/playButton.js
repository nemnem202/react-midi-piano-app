import { useEffect } from "react";
import useStore from "../store";
import { FaPlay, FaStop } from "react-icons/fa";

export default function PlayButton() {
  const play = useStore((state) => state.play);
  const setPlay = useStore((state) => state.setPlay);
  const setBeat = useStore((state) => state.setBeat);

  //console.log("playButton module");

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (
        event.key === "Enter" ||
        event.key === " " ||
        event.key === "Spacebar"
      ) {
        setPlay(!play);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [play]);

  useEffect(() => {
    if (play) {
      setBeat(0);
    }
  }, [play]);
  return (
    <div
      onClick={() => setPlay(!play)}
      style={{
        display: "flex",
        alignItems: "center",
        height: "30px",
        width: "30px",
      }}
      className="cursorPointer"
    >
      {play ? <FaStop className="red" size={30} /> : <FaPlay size={30} />}
    </div>
  );
}
