import "./App.css";
import React from "react";
import useStore from "./store";
import MidiInterface from "./modules/midi-Interface";
import PianoSound from "./modules/pianoSound";
import PianoComponent from "./modules/piano";
import NotesSuggestion from "./modules/notesSuggestion";
import Bpm from "./modules/bpm";
import PlayButton from "./modules/playButton";
import Metronome from "./modules/metronome";
import Signature from "./modules/signature";
import MetronomeSound from "./modules/metronomeSound";
import Score from "./modules/score";
import ScrollMode from "./modules/scrollMode";
import VictorySoundEffect from "./modules/victorySoundEffect";
import DisplayChordName from "./modules/displayChordName";
import Points from "./modules/points";
import Partition from "./modules/partition";
import Settings from "./modules/Settings";
import SuggestionSound from "./modules/suggestionSound";
import { FaCog } from "react-icons/fa";
import CursorFollower from "./modules/cursor";

function App() {
  const setSettingsMenu = useStore((state) => state.setSettingsMenu);
  const settingsMenu = useStore((state) => state.settingsMenu);
  const scrollMode = useStore((state) => state.scrollMode);
  const displayPartition = useStore((state) => state.displayPartition);
  const suggestionVolume = useStore((state) => state.suggestionVolume);

  // console.log("App render");
  return (
    <div className="AppSettings">
      <CursorFollower />
      <div className="App">
        <MidiInterface />
        <NotesSuggestion />
        <VictorySoundEffect />
        <MetronomeSound />
        <PianoSound />
        <Metronome />
        {suggestionVolume > 0 ? <SuggestionSound /> : ""}
        <FaCog
          className={`settingsIcon ${settingsMenu ? "open red" : ""}`}
          onClick={() => setSettingsMenu(!settingsMenu)}
        />
        {!scrollMode ? (
          <div className="PlayBpmSignature">
            <PlayButton />
            <div className="BpmSignature">
              <div>
                {" "}
                Bpm :
                <Bpm />
              </div>

              <div>
                {" "}
                Signature :
                <Signature />
              </div>
            </div>
          </div>
        ) : (
          <div className="PlayBpmSignature"> </div>
        )}
        <div className="scrollMode">
          <span className={scrollMode ? "red" : ""}> Scroll Mode</span>

          <ScrollMode />
        </div>
        <div className="partitionChordName">
          <Partition />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <DisplayChordName />
            <div className="metroScoreGrid">
              {" "}
              <div className="points">
                {" "}
                <Points />
              </div>
              <div className="scoreContainer">
                <Score />
              </div>
            </div>
          </div>
        </div>

        <PianoComponent />
      </div>
      <div className={`Settings ${settingsMenu ? "open" : ""}`}>
        {" "}
        <Settings />
      </div>
      {settingsMenu ? (
        <div
          className="AppSettings-box-shadow"
          onClick={() => setSettingsMenu(false)}
        ></div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
