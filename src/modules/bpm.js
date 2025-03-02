import useStore from "../store";

export default function Bpm() {
  const bpm = useStore((state) => state.bpm);
  const setBpm = useStore((state) => state.setBpm);
  const setPlay = useStore((state) => state.setPlay);

  return (
    <input
      type="number"
      value={bpm}
      style={{
        width: `${bpm.toString().length + 2}ch`, // Ajuste la largeur en fonction du texte
        textAlign: "center", // Centre le texte
        margin: "0% 5px",
      }}
      onFocus={(e) => e.target.select()}
      onClick={() => setPlay(false)}
      onChange={(e) => {
        setBpm(Number(e.target.value));
      }}
    />
  );
}
