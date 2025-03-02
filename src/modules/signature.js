import useStore from "../store";

export default function Signature() {
  const signature = useStore((state) => state.signature);
  const setSignature = useStore((state) => state.setSignature);
  const setPlay = useStore((state) => state.setPlay);

  //console.log("signature module");

  return (
    <>
      <input
        type="number"
        value={signature}
        style={{
          width: `${signature.toString().length + 2}ch`, // Ajuste la largeur en fonction du texte
          textAlign: "center", // Centre le texte
          margin: "0% 5px",
        }}
        onFocus={(e) => e.target.select()}
        onClick={() => setPlay(false)}
        onChange={(e) => {
          setSignature(Number(e.target.value));
        }}
      ></input>
      <span>/4</span>
    </>
  );
}
