import useStore from "../store";

export default function Points() {
  const play = useStore((state) => state.play);
  const beat = useStore((state) => state.beat);
  const scrollMode = useStore((state) => state.scrollMode);
  const numberOfPlayedNotes = useStore((state) => state.numberOfPlayedNotes);

  //console.log("points module");

  return (
    <>
      {scrollMode ? (
        <div className="metronomeContainer">
          {Array.from({ length: numberOfPlayedNotes }).map((_, index) => (
            <div key={index}></div>
          ))}
        </div>
      ) : (
        <div className="metronomeContainer">
          {play &&
            Array.from({ length: beat + 1 }).map((_, index) => (
              <div key={index}></div>
            ))}
        </div>
      )}
    </>
  );
}
