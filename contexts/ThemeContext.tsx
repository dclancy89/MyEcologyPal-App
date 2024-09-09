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
      background: "#e4f0da",
      primary: "#9CDBA6",
      secondary: "#91db6c",
      button: "#246848",
    },
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
