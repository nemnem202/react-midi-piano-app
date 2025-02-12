import React, { createContext, useState, useEffect, useContext } from "react";
import useStore from "./store";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("root-theme1"); // Valeur par défaut du thème
  const themeChoice = useStore((state) => state.themeChoice);

  // Appliquer les variables CSS lorsque le thème change
  useEffect(() => {
    // Applique la classe directement sur l'élément html (document.documentElement)
    document.documentElement.className = `root-theme${themeChoice}`;
    setTheme(`root-theme${themeChoice}`);
  }, [themeChoice]);

  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
};
