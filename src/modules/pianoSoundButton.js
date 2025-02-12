import useStore from "../store";

export default function PianoSoundButton() {
  const { setPianoSound } = useStore();
  return <button onClick={() => setPianoSound(true)}>PianoSound?</button>;
}
