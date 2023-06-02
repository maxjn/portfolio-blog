"use client";

import { createContext, useState } from "react";
import { layoutProp, themeModeType, themeContextType } from "@/utils/types";

export const ThemeContext = createContext({} as themeContextType);

export const ThemeContextProvider = ({ children }: layoutProp) => {
  const [mode, setMode] = useState<themeModeType>("light");

  const toggle = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggle }}>
      <div className={`theme ${mode}`}>{children}</div>{" "}
    </ThemeContext.Provider>
  );
};
