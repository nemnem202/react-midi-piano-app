import useStore from "../store";
import Switch from "./switch";

export default function ScrollMode() {
  const setScrollMode = useStore((state) => state.setScrollMode);
  const scrollMode = useStore((state) => state.scrollMode);
  const setPlay = useStore((state) => state.setPlay);

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
