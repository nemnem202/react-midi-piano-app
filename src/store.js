// src/store/useStore.js
import { create } from "zustand";

const useStore = create((set) => ({
  noteOn: undefined,
  noteOff: undefined,
  activeNotes: new Set(), // Utilisation d'un Set pour suivre les notes actives
  numberOfPlayedNotes: 0,

  addNote: (note) =>
    set((state) => {
      if (state.activeNotes.has(note)) return state; // Évite les doublons
      const newActiveNotes = new Set(state.activeNotes);
      newActiveNotes.add(note);
      return {
        activeNotes: newActiveNotes,
        numberOfPlayedNotes: newActiveNotes.size, // Mise à jour du nombre
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
        numberOfPlayedNotes: newActiveNotes.size, // Mise à jour du nombre
        noteOff: note,
        noteOn: undefined,
      };
    }),
  pianoSound: false,
  pianoVolume: 0,
  setPianoVolume: (num) =>
    set((state) => {
      if (state.pianoVolume === num) return state;
      if (num === 0) {
        return { pianoVolume: num, pianoSound: false };
      } else {
        return { pianoVolume: num, pianoSound: true };
      }
    }),

  setPianoSound: (bool) =>
    set((state) => {
      if (state.pianoSound === bool) return state;
      if (bool && state.pianoVolume === 0) {
        return { pianoSound: bool };
      }
      return { pianoSound: bool };
    }),

  metronomeVolume: 80,
  setMetronomeVolume: (num) =>
    set((state) => {
      if (state.metronomeVolume === num) return state;
      return { metronomeVolume: num };
    }),

  suggestionVolume: 80,
  setSuggestionVolume: (num) =>
    set((state) => {
      if (state.suggestionVolume === num) return state;
      return { suggestionVolume: num };
    }),

  victoryVolume: 80,
  setVictoryVolume: (num) =>
    set((state) => {
      if (state.victoryVolume === num) return state;
      return { victoryVolume: num };
    }),

  mode: 1,
  setMode: (num) =>
    set((state) => {
      if (state.mode === num) return state;
      return {
        mode: num,
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

  bpm: 200,
  setBpm: (num) =>
    set((state) => {
      if (state.bpm === num) return state;
      return { bpm: num };
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

  signature: 4,
  setSignature: (num) =>
    set((state) => {
      if (state.signature === num) return state;
      return { signature: num };
    }),

  scrollMode: false,
  setScrollMode: (bool) =>
    set((state) => {
      if (state.scrollMode === bool) return state;
      return { scrollMode: bool };
    }),

  score: 0,
  setScore: (num) =>
    set((state) => {
      if (state.score === num) return state;
      return { score: num };
    }),

  checked: false,
  setChecked: (bool) =>
    set((state) => {
      if (state.checked === bool) return state;
      return { checked: bool };
    }),

  settingsMenu: false,
  setSettingsMenu: (bool) =>
    set((state) => {
      if (state.settingsMenu === bool) return state; // Corrigé ici
      return { settingsMenu: bool }; // Met à jour correctement l'état
    }),

  displayPartition: true,
  setDisplayPartition: (bool) =>
    set((state) => {
      if (state.displayPartition === bool) return state; // Corrigé ici
      return { displayPartition: bool }; // Met à jour correctement l'état
    }),

  themeChoice: 1,
  setThemeChoice: (num) =>
    set((state) => {
      if (state.themeChoice === num) return state;
      console.log("theme choice:", num);
      return { themeChoice: num };
    }),

  lastNotesListStore: [0],
  notesListStore: [0, 2, 4, 5, 7, 9, 11],

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
        notesListStore: state.notesListStore.filter((note) => note !== string),
      };
    }),

  lastScalesListStore: [0],
  scalesListStore: [0, 1, 4, 5],

  setScalesListStore: (array) =>
    set((state) => {
      if (JSON.stringify(state.scalesListStore) === JSON.stringify(array))
        return state;
      if (array.length <= 0) {
        return {
          lastScalesListStore: state.scalesListStore,
          scalesListStore: [0],
        };
      }
      return {
        lastScalesListStore: state.scalesListStore,
        scalesListStore: array,
      };
    }),

  pushScalesListStore: (string) =>
    set((state) => {
      if (state.scalesListStore.includes(string)) return state;
      return { scalesListStore: [...state.scalesListStore, string] };
    }),

  filterScalesListStore: (string) =>
    set((state) => {
      if (!state.scalesListStore.includes(string)) return state;
      if (state.scalesListStore.length <= 1) {
        return {
          lastScalesListStore: state.scalesListStore,
          scalesListStore: [0],
        };
      }
      return {
        scalesListStore: state.scalesListStore.filter(
          (note) => note !== string
        ),
      };
    }),
}));

export default useStore;
