import { Dispatch, SetStateAction, createContext, useState } from "react";

export enum AppMode {
  Offline = "Offline",
  Online = "Online",
}

export type ModeContextType = {
  mode: AppMode;
  setMode: Dispatch<SetStateAction<AppMode>>;
};

export const ModeContext = createContext<ModeContextType | null>(null);

const ModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<AppMode>(AppMode.Online);
  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
};

export default ModeProvider;
