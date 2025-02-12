import { useEffect } from "react";
import useStore from "../store";

// Composant MidiInterface pour l'intégration de la Web MIDI API
export default function MidiInterface() {
  const addNote = useStore((state) => state.addNote);
  const removeNote = useStore((state) => state.removeNote);

  //console.log("midi interface module");

  useEffect(() => {
    let midiAccess = null;
    let availableInputs = [];
    // Vérifier si la Web MIDI API est supportée
    if (navigator.requestMIDIAccess) {
      navigator
        .requestMIDIAccess()
        .then((access) => {
          midiAccess = access;
          // Obtenir les périphériques d'entrée MIDI disponibles
          availableInputs = Array.from(midiAccess.inputs.values());
          //console.log("voici les inputs midi détéctés: ");
          console.table(availableInputs);
          // Ajouter un écouteur pour chaque périphérique d'entrée
          availableInputs.forEach((input) => {
            input.onmidimessage = handleMIDIMessage;
          });
        })
        .catch((err) => {
          console.error("MIDI Access failed", err);
        });
    } else {
      console.error("Web MIDI API not supported in this browser.");
    }

    // Cleanup: retirer les écouteurs quand le composant est démonté
    return () => {
      // Supprimer les écouteurs MIDI lorsque le composant est démonté
      availableInputs.forEach((input) => {
        input.onmidimessage = null;
      });
      if (midiAccess) {
        midiAccess.inputs.forEach((input) => {
          input.onmidimessage = null;
        });
      }
      //console.log("Cleanup MIDI listeners");
    };
  }, []);

  // Fonction pour gérer les messages MIDI
  const handleMIDIMessage = (event) => {
    const [command, note, velocity] = event.data;
    if (command === 153) {
      addNote(note);
    } else if (command === 137) {
      removeNote(note);
    }
  };
  return null; // Aucun retour d'élément UI, uniquement les effets sont gérés
}
