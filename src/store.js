// src/store/useStore.js
import { create } from "zustand";
import { chords, scales } from "./modules/arrays";

const LOCAL_STORAGE_KEY = "savedSuggestions";

const useStore = create((set) => {
  const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
  const initialState = savedState ? JSON.parse(savedState) : {};

  return {
    noteOn: undefined,
    noteOff: undefined,
    activeNotes: new Set(), // Utilisation d'un Set pour suivre les notes actives

    addNote: (note) =>
      set((state) => {
        if (state.activeNotes.has(note)) return state; // Évite les doublons
        const newActiveNotes = new Set(state.activeNotes);
        newActiveNotes.add(note);
        console.log("ee");
        return {
          activeNotes: newActiveNotes,
          noteOn: note,
          noteOff: undefined,
        };
      }),

    removeNote: (note) =>
      set((state) => {
        if (!state.activeNotes.has(note)) return state; // Ignore les notes déjà enlevées
        const newActiveNotes = new Set(state.activeNotes);
        newActiveNotes.delete(note);
        return {
          activeNotes: newActiveNotes,
          noteOff: note,
          noteOn: undefined,
        };
      }),

    activeSuggestion: [],
    nextSuggestion: [],
    suggestion: [],
    passedSuggestion: [],
    setSuggestion: (array) =>
      set((state) => {
        return {
          passedSuggestion: state.activeSuggestion,
          activeSuggestion: state.nextSuggestion,
          nextSuggestion: state.suggestion,
          suggestion: array,
        };
      }),

    play: false,
    setPlay: (bool) =>
      set((state) => {
        if (state.play === bool) return state;
        return { play: bool };
      }),

    beat: 0,
    setBeat: (num) =>
      set((state) => {
        if (state.beat === num) return state;
        return { beat: num };
      }),

    settingsMenu: false,
    setSettingsMenu: (bool) =>
      set((state) => {
        if (state.settingsMenu === bool) return state; // Corrigé ici
        return { settingsMenu: bool }; // Met à jour correctement l'état
      }),

    score: 0,
    setScore: (num) =>
      set((state) => {
        if (state.score === num) return state;
        return { score: num };
      }),

    ///////////////////////////////////////////////////////////////////////////////////////////

    pianoVolume: initialState.pianoVolume || 80,
    setPianoVolume: (num) =>
      set((state) => {
        if (state.pianoVolume === num) return state;
        if (num === 0) {
          return { pianoVolume: num };
        } else {
          return { pianoVolume: num };
        }
      }),
    metronomeVolume: initialState.metronomeVolume || 80,
    setMetronomeVolume: (num) =>
      set((state) => {
        if (state.metronomeVolume === num) return state;
        return { metronomeVolume: num };
      }),

    suggestionVolume: initialState.suggestionVolume || 80,
    setSuggestionVolume: (num) =>
      set((state) => {
        if (state.suggestionVolume === num) return state;
        return { suggestionVolume: num };
      }),

    victoryVolume: initialState.victoryVolume || 80,
    setVictoryVolume: (num) =>
      set((state) => {
        if (state.victoryVolume === num) return state;
        return { victoryVolume: num };
      }),

    mode: initialState.mode || 1,
    setMode: (num) =>
      set((state) => {
        if (state.mode === num) return state;
        return {
          mode: num,
        };
      }),

    bpm: initialState.bpm || 100,
    setBpm: (num) =>
      set((state) => {
        if (state.bpm === num) return state;
        return { bpm: num };
      }),

    signature: initialState.signature || 4,
    setSignature: (num) =>
      set((state) => {
        if (state.signature === num) return state;
        return { signature: num };
      }),

    scrollMode: initialState.scrollMode || false,
    setScrollMode: (bool) =>
      set((state) => {
        if (state.scrollMode === bool) return state;
        return { scrollMode: bool };
      }),

    displayPartition: initialState.displayPartition || true,
    setDisplayPartition: (bool) =>
      set((state) => {
        if (state.displayPartition === bool) return state; // Corrigé ici
        return { displayPartition: bool }; // Met à jour correctement l'état
      }),

    themeChoice: initialState.themeChoice || 1,
    setThemeChoice: (num) =>
      set((state) => {
        if (state.themeChoice === num) return state;
        console.log("theme choice:", num);
        return { themeChoice: num };
      }),

    lastNotesListStore: initialState.lastNotesListStore || [0],
    notesListStore: initialState.notesListStore || [0, 2, 4, 5, 7, 9, 11],

    setNotesListStore: (array) =>
      set((state) => {
        if (JSON.stringify(state.notesListStore) === JSON.stringify(array))
          return state;
        if (array.length <= 0) {
          return {
            lastNotesListStore: state.notesListStore,
            notesListStore: [0],
          };
        }
        return {
          lastNotesListStore: state.notesListStore,
          notesListStore: array,
        };
      }),

    pushNoteListStore: (string) =>
      set((state) => {
        if (state.notesListStore.includes(string)) return state;

        return { notesListStore: [...state.notesListStore, string] };
      }),

    filterNoteListStore: (string) =>
      set((state) => {
        if (!state.notesListStore.includes(string)) return state;
        if (state.notesListStore.length <= 1) {
          return {
            lastNotesListStore: state.notesListStore,
            notesListStore: [0],
          };
        }
        return {
          notesListStore: state.notesListStore.filter(
            (note) => note !== string
          ),
        };
      }),
    lastScalesListStore: initialState.lastScalesListStore || [0],
    scalesListStore: initialState.scalesListStore || [0, 1, 4, 5],
    notesMax: initialState.notesMax || 4,
    setNotesMax: (num) =>
      set((state) => {
        if (state.notesMax === num || num > 7) return state;
        let newArray = state.scalesListStore;
        if (state.mode === 1)
          newArray = state.scalesListStore.filter(
            (v) => chords[v].intervalles.length <= state.notesMax
          );
        return {
          notesMax: num,
          scalesListStore: newArray,
          lastScalesListStore: state.scalesListStore,
        };
      }),

    setScalesListStore: (array) =>
      set((state) => {
        if (JSON.stringify(state.scalesListStore) === JSON.stringify(array))
          return state;
        let newArray = array;
        if (state.mode === 1)
          newArray = array.filter(
            (v) => chords[v].intervalles.length <= state.notesMax
          );
        if (newArray.length <= 0) {
          return {
            lastScalesListStore: state.scalesListStore,
            scalesListStore: [0],
          };
        }
        return {
          lastScalesListStore: state.scalesListStore,
          scalesListStore: newArray,
        };
      }),

    pushScalesListStore: (num) =>
      set((state) => {
        if (state.scalesListStore.includes(num)) return state;
        if (
          state.mode === 1 &&
          chords[num].intervalles.length > state.notesMax
        ) {
          console.log("oeoe", chords[num].intervalles.length, state.notesMax);
          return state;
        }
        return { scalesListStore: [...state.scalesListStore, num] };
      }),

    filterScalesListStore: (num) =>
      set((state) => {
        if (!state.scalesListStore.includes(num)) return state;
        if (state.scalesListStore.length <= 1) {
          return {
            lastScalesListStore: state.scalesListStore,
            scalesListStore: [0],
          };
        }
        return {
          scalesListStore: state.scalesListStore.filter((note) => note !== num),
        };
      }),

    displayPiano: initialState.displayPiano || true,
    setDisplayPiano: (bool) =>
      set((state) => {
        if (state.displayPiano === bool) return state;
        return { displayPiano: bool };
      }),
  };
});

export default useStore;
