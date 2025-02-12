import useStore from "../store";

export default function Bpm() {
  const bpm = useStore((state) => state.bpm);
  const setBpm = useStore((state) => state.setBpm);
  const setPlay = useStore((state) => state.setPlay);

  //console.log("bpm module");

  return (
    <input
      type="number"
      value={bpm}
      style={{ width: "30px" }}
      onFocus={(e) => e.target.select()}
      onClick={() => setPlay(false)}
      onChange={(e) => {
        setBpm(Number(e.target.value));
      }}
    />
  );
}
