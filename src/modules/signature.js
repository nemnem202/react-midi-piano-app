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
        style={{ width: "23px" }}
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
