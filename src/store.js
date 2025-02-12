// src/store/useStore.js
import { create } from "zustand";
import setRandom from "./modules/setRandom";

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
      if (JSON.stringify(state.suggestion) === JSON.stringify(array))
        return state;
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

  random: true,
  setRandom: (bool) =>
    set((state) => {
      if (state.random === bool) return state; // Corrigé ici
      return { random: bool }; // Met à jour correctement l'état
    }),

  scale: 0,
  setScale: (num) =>
    set((state) => {
      if (state.scale === num) return state;
      return { scale: num };
    }),

  note: 0,
  setNote: (num) =>
    set((state) => {
      if (state.note === num) return state;
      console.log("noteChanged", num);
      return { note: num };
    }),
}));

export default useStore;
