import React, { createContext } from "react";

export type ThemeContextType = {
  theme: {
    background: string;
    primary: string;
    secondary: string;
    button: string;
  };
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const theme: ThemeContextType = {
    theme: {
      background: "#DEF9C4",
      primary: "#9CDBA6",
      secondary: "#50B498",
      button: "#468585",
    },
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
