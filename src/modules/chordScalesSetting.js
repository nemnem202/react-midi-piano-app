import { Button, Menu, MenuItem } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import useStore from "../store";
import { chords, scales, notesList } from "./arrays";
import Switch from "./switch";

export default function ChordScalesSetting() {
  const mode = useStore((state) => state.mode);
  const setMode = useStore((state) => state.setMode);
  const random = useStore((state) => state.random);

  const lastNotesListStore = useStore((state) => state.lastNotesListStore);
  const notesListStore = useStore((state) => state.notesListStore);
  const setNotesListStore = useStore((state) => state.setNotesListStore);
  const pushNoteListStore = useStore((state) => state.pushNoteListStore);
  const filterNoteListStore = useStore((state) => state.filterNoteListStore);
  const notesMax = useStore((state) => state.notesMax);
  const setNotesMax = useStore((state) => state.setNotesMax);

  const lastScalesListStore = useStore((state) => state.lastScalesListStore);
  const scalesListStore = useStore((state) => state.scalesListStore);
  const setScalesListStore = useStore((state) => state.setScalesListStore);
  const pushScalesListStore = useStore((state) => state.pushScalesListStore);
  const filterScalesListStore = useStore(
    (state) => state.filterScalesListStore
  );

  const [anchorElNotes, setAnchorElNotes] = useState(null);

  const [anchorElScales, setAnchorElScales] = useState(null);

  const [anchorElMax, setAnchorElMax] = useState(null);

  const handleNotesChange = (num) => {
    if (notesListStore.includes(num)) {
      filterNoteListStore(num);
    } else {
      pushNoteListStore(num);
    }
  };

  const handleScaleChange = (num) => {
    if (scalesListStore.includes(num)) {
      filterScalesListStore(num);
    } else {
      pushScalesListStore(num);
    }
  };

  const handleClickNotes = (event) => {
    setAnchorElNotes(event.currentTarget);
  };

  const handleCloseNotes = () => {
    setAnchorElNotes(null);
  };

  const handleClickScales = (event) => {
    setAnchorElScales(event.currentTarget);
  };

  const handleCloseScales = () => {
    setAnchorElScales(null);
  };

  const handleClickMax = (event) => {
    setAnchorElMax(event.currentTarget);
  };

  const handleCloseMax = () => {
    setAnchorElMax(null);
  };

  useEffect(() => {
    console.log(notesListStore);
  }, [notesListStore]);

  return (
    <>
      {" "}
      <div className="modeButtons">
        Mode :
        <button
          className={mode === 1 ? "backGroundRed" : ""}
          onClick={() => {
            setMode(1);
          }}
        >
          Chord
        </button>
        <button
          className={mode === 2 ? "backGroundRed" : ""}
          onClick={() => {
            setMode(2);
          }}
        >
          Scale
        </button>
        <button
          className={mode === 3 ? "backGroundRed" : ""}
          onClick={() => {
            setMode(3);
          }}
        >
          Diatonic
        </button>
        {mode === 3 ? (
          <>
            <button onClick={handleClickNotes}>
              {notesList[notesListStore[0]]}
            </button>
            <Menu
              anchorEl={anchorElNotes}
              open={Boolean(anchorElNotes)}
              onClose={handleCloseNotes}
            >
              {notesList.map((n, index) => (
                <MenuItem
                  value={index}
                  key={index}
                  onClick={() => {
                    setNotesListStore([index]);
                    handleCloseNotes();
                  }}
                >
                  {n}
                </MenuItem>
              ))}
            </Menu>

            <button onClick={handleClickScales}>
              {scales[scalesListStore[0]].nom}
            </button>
            <Menu
              anchorEl={anchorElScales}
              open={Boolean(anchorElScales)}
              onClose={handleCloseScales}
            >
              {Array.from({ length: scales.length }).map((_, index) => (
                <MenuItem
                  value={index}
                  key={index}
                  onClick={() => {
                    setScalesListStore([index]);
                    handleCloseScales();
                  }}
                >
                  {scales[index].nom}
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : (
          ""
        )}
      </div>
      <div className="notesScalesContainer">
        <div className={mode === 3 ? "disab setNotes" : " setNotes"}>
          Root note of the scale
          <div style={{ display: "flex", alignItems: "center" }}>
            <span className={notesListStore.length === 12 ? "red" : ""}>
              All
            </span>{" "}
            <Switch
              onClick={() => {
                notesListStore.length === 12 && lastNotesListStore.length !== 12
                  ? setNotesListStore(lastNotesListStore)
                  : notesListStore.length === 12
                  ? setNotesListStore([0])
                  : setNotesListStore([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
              }}
              bool={notesListStore.length === 12}
            />
          </div>
        </div>
        <div className={mode === 3 ? "disab gridBlack" : " gridBlack"}>
          <button
            style={{ gridRow: "1", gridColumn: "1" }}
            onClick={() => handleNotesChange(1)}
            className={
              notesListStore.includes(1) && mode !== 3 ? "backGroundRed" : ""
            }
          >
            C#
          </button>{" "}
          <button
            style={{ gridRow: "1", gridColumn: "2" }}
            onClick={() => handleNotesChange(3)}
            className={
              notesListStore.includes(3) && mode !== 3 ? "backGroundRed" : ""
            }
          >
            D#
          </button>{" "}
          <button
            style={{ gridRow: "1", gridColumn: "4" }}
            onClick={() => handleNotesChange(6)}
            className={
              notesListStore.includes(6) && mode !== 3 ? "backGroundRed" : ""
            }
          >
            F#
          </button>{" "}
          <button
            style={{ gridRow: "1", gridColumn: "5" }}
            onClick={() => handleNotesChange(8)}
            className={
              notesListStore.includes(8) && mode !== 3 ? "backGroundRed" : ""
            }
          >
            G#
          </button>{" "}
          <button
            style={{ gridRow: "1", gridColumn: "6" }}
            onClick={() => handleNotesChange(10)}
            className={
              notesListStore.includes(10) && mode !== 3 ? "backGroundRed" : ""
            }
          >
            A#
          </button>{" "}
        </div>
        <div className={mode === 3 ? "disab gridWhite" : " gridWhite"}>
          <button
            style={{ gridColumn: "1" }}
            onClick={() => handleNotesChange(0)}
            className={
              notesListStore.includes(0) && mode !== 3 ? "backGroundRed" : ""
            }
          >
            C
          </button>{" "}
          <button
            style={{ gridColumn: "2" }}
            onClick={() => handleNotesChange(2)}
            className={
              notesListStore.includes(2) && mode !== 3 ? "backGroundRed" : ""
            }
          >
            D
          </button>{" "}
          <button
            style={{ gridColumn: "3" }}
            onClick={() => handleNotesChange(4)}
            className={
              notesListStore.includes(4) && mode !== 3 ? "backGroundRed" : ""
            }
          >
            E
          </button>{" "}
          <button
            style={{ gridColumn: "4" }}
            onClick={() => handleNotesChange(5)}
            className={
              notesListStore.includes(5) && mode !== 3 ? "backGroundRed" : ""
            }
          >
            F
          </button>{" "}
          <button
            style={{ gridColumn: "5" }}
            onClick={() => handleNotesChange(7)}
            className={
              notesListStore.includes(7) && mode !== 3 ? "backGroundRed" : ""
            }
          >
            G
          </button>{" "}
          <button
            style={{ gridColumn: "6" }}
            onClick={() => handleNotesChange(9)}
            className={
              notesListStore.includes(9) && mode !== 3 ? "backGroundRed" : ""
            }
          >
            A
          </button>{" "}
          <button
            style={{ gridColumn: "7" }}
            onClick={() => handleNotesChange(11)}
            className={
              notesListStore.includes(11) && mode !== 3 ? "backGroundRed" : ""
            }
          >
            B
          </button>
        </div>
        <div className={mode === 3 ? "disab setScales" : " setScales"}>
          Chords
          <div className={mode !== 2 ? "maxNotes" : "maxNotes disab"}>
            Max notes:
            <button onClick={handleClickMax}>
              {mode !== 2 ? notesMax : "Ø"}
            </button>
            <Menu
              anchorEl={anchorElMax}
              open={Boolean(anchorElMax)}
              onClose={handleCloseMax}
            >
              {Array.from({ length: 5 }, (_, index) => index + 3).map(
                (index) => (
                  <MenuItem
                    value={index}
                    key={index}
                    onClick={() => {
                      setNotesMax(index);
                      handleCloseMax();
                    }}
                  >
                    {index}
                  </MenuItem>
                )
              )}
            </Menu>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              className={
                scalesListStore.length === scales.length && mode !== 3
                  ? "red"
                  : ""
              }
            >
              All
            </span>{" "}
            <Switch
              onClick={() => {
                if (mode === 1) {
                  const filteredChordsLen = chords.filter(
                    (v) => v.intervalles.length <= notesMax
                  ).length;
                  const scalesLen = scales.length;
                  const currentLen = scalesListStore.length;
                  const lastLen = lastScalesListStore.length;

                  if (
                    currentLen === filteredChordsLen &&
                    lastLen !== filteredChordsLen
                  ) {
                    setScalesListStore(lastScalesListStore);
                  } else if (
                    currentLen === filteredChordsLen &&
                    lastLen === filteredChordsLen
                  ) {
                    setScalesListStore([0]);
                  } else {
                    setScalesListStore(
                      Array.from({ length: scalesLen }, (_, i) => i)
                    );
                  }
                } else if (mode === 2) {
                  const lastLen = lastScalesListStore.length;
                  const currentLen = scalesListStore.length;
                  const totalLen = scales.length;

                  if (lastLen !== totalLen && currentLen === totalLen) {
                    setScalesListStore(lastScalesListStore);
                  } else if (lastLen === totalLen && currentLen === totalLen) {
                    setScalesListStore([0]);
                  } else {
                    setScalesListStore(
                      Array.from({ length: totalLen }, (_, i) => i)
                    );
                  }
                }
              }}
              bool={
                (scalesListStore.length ===
                  chords.filter((v) => v.intervalles.length <= notesMax)
                    .length &&
                  mode === 1) ||
                (mode === 2 && scalesListStore.length === scales.length)
              }
            />
          </div>
        </div>
        <div className={mode === 3 ? "disab scalesButtons" : " scalesButtons"}>
          {mode === 1
            ? chords.map((chord, index) => (
                <button
                  key={index}
                  onClick={() => handleScaleChange(index)}
                  className={`${
                    scalesListStore.includes(index) && mode !== 3
                      ? "backGroundRed"
                      : ""
                  } ${
                    chords[index].intervalles.length > notesMax ? "disab" : ""
                  }`}
                >
                  {chord.nom}
                </button>
              ))
            : scales.map((scale, index) => (
                <button
                  key={index}
                  onClick={() => handleScaleChange(index)}
                  className={
                    scalesListStore.includes(index) && mode !== 3
                      ? "backGroundRed"
                      : ""
                  }
                >
                  {scale.nom}
                </button>
              ))}
        </div>
      </div>
    </>
  );
}
