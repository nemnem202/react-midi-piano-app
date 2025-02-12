import "./App.css";
import React, { useEffect } from "react";
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

function App() {
  const setSettingsMenu = useStore((state) => state.setSettingsMenu);
  const settingsMenu = useStore((state) => state.settingsMenu);
  const scrollMode = useStore((state) => state.scrollMode);
  const displayPartition = useStore((state) => state.displayPartition);
  const suggestionVolume = useStore((state) => state.suggestionVolume);

  // console.log("App render");
  return (
    <div className="AppSettings">
      <div className="App" onClick={() => setSettingsMenu(true)}>
        <MidiInterface />
        <NotesSuggestion />
        <VictorySoundEffect />
        <MetronomeSound />
        <PianoSound />
        <Metronome />
        {suggestionVolume > 0 ? <SuggestionSound /> : ""}

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
          {displayPartition ? <Partition /> : ""}

          <DisplayChordName />
        </div>

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
