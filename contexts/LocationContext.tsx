import { Dispatch, SetStateAction, createContext, useState } from "react";

export type LocationContextType = {
  location: number;
  setLocation: Dispatch<SetStateAction<number>>;
};

export const LocationContext = createContext<LocationContextType | null>(null);

const LocationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [location, setLocation] = useState<number>(1234);
  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;
