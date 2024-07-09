import { Dispatch, SetStateAction, createContext, useState } from "react";
import * as defaultLocation from "../assets/data/defaultLocation.json";

export interface Location {
  id: number;
  name: string;
  city: string;
  state: string;
  numDataPoints: number;
  lat: number;
  lon: number;
}

export type LocationContextType = {
  location: Location;
  setLocation: Dispatch<SetStateAction<Location>>;
};

export const LocationContext = createContext<LocationContextType | null>(null);

const LocationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [location, setLocation] = useState<Location>(defaultLocation);
  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;
