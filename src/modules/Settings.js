import "./settings.css";
import Switch from "./switch";
import useStore from "../store";
import Slider from "@mui/material/Slider";
import ScrollMode from "./scrollMode";
import ChordScalesSetting from "./chordScalesSetting";
import Reset from "./reset";

export default function Settings() {
  const displayPartition = useStore((state) => state.displayPartition);
  const setDisplayPartition = useStore((state) => state.setDisplayPartition);
  const displayPiano = useStore((state) => state.displayPiano);
  const setDisplayPiano = useStore((state) => state.setDisplayPiano);

  const pianoVolume = useStore((state) => state.pianoVolume);
  const metronomeVolume = useStore((state) => state.metronomeVolume);
  const suggestionVolume = useStore((state) => state.suggestionVolume);
  const victoryVolume = useStore((state) => state.victoryVolume);

  const scrollMode = useStore((state) => state.scrollMode);

  const setPianoVolume = useStore((state) => state.setPianoVolume);
  const setMetronomeVolume = useStore((state) => state.setMetronomeVolume);
  const setSuggestionVolume = useStore((state) => state.setSuggestionVolume);
  const setVictoryVolume = useStore((state) => state.setVictoryVolume);

  const setThemeChoice = useStore((state) => state.setThemeChoice);
  return (
    <div className="settingsContainer">
      <div style={{ display: "flex", alignItems: "center" }}>
        <h1>Settings</h1>
        <Reset />
      </div>

      <ChordScalesSetting />

      <div style={{ display: "flex", alignItems: "center" }}>
        <span className={scrollMode ? "red" : ""}>Scroll Mode</span>{" "}
        <ScrollMode />
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <span className={displayPartition ? "red" : ""}>Partition</span>{" "}
        <Switch
          onClick={() => setDisplayPartition(!displayPartition)}
          bool={displayPartition}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <span className={displayPiano ? "red" : ""}>Piano</span>{" "}
        <Switch
          onClick={() => setDisplayPiano(!displayPiano)}
          bool={displayPiano}
        />
      </div>

      <div>Mixer</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
        <SliderItem
          label="Synth"
          func={(e) => setPianoVolume(e)}
          val={pianoVolume}
        />
        <SliderItem
          label="Suggestion"
          func={(e) => setSuggestionVolume(e)}
          val={suggestionVolume}
        />
        <SliderItem
          label="Metronome"
          func={(e) => setMetronomeVolume(e)}
          val={metronomeVolume}
        />
        <SliderItem
          label="Victory"
          func={(e) => setVictoryVolume(e)}
          val={victoryVolume}
        />
      </div>

      <div style={{ display: "flex" }}>
        Theme :<div className="theme1" onClick={() => setThemeChoice(1)}></div>
        <div className="theme3" onClick={() => setThemeChoice(3)}></div>
        <div className="theme2" onClick={() => setThemeChoice(2)}></div>
      </div>
    </div>
  );
}

function SliderItem({ label, func, val }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {" "}
      <Slider
        value={val}
        orientation="vertical"
        onChange={(e, newValue) => func(newValue)}
        min={0}
        max={100}
        valueLabelDisplay="auto"
        sx={{
          height: 150,
          marginBottom: 1,
          "& .MuiSlider-thumb": {
            backgroundColor: "var(--foreground)",
            "&:hover, &.Mui-focusVisible": {
              boxShadow: "0px 0px 10px 5px var(--color9)", // Cercle rouge autour
            },
          },
          "& .MuiSlider-track": {
            backgroundColor: "var(--color5)",
            borderColor: "var(--color5)",
          },
          "& .MuiSlider-rail": {
            backgroundColor: "var(--background)",
          },
          "& .MuiSlider-valueLabel": {
            backgroundColor: "var(--color5)", // Change la couleur de fond
            color: "var(--foreground)", // Change la couleur du texte
            fontSize: "10px", // Change la taille du texte
            borderRadius: "2px", // Arrondi les bords
            padding: "0px 6px 0px 2px",
          },
        }}
      />
      <p>{label}</p>
    </div>
  );
}
