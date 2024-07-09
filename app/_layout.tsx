import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Index from "./index";
import ChooseLocation from "./ChooseLocation";
import CollectData from "./CollectData";
import Settings from "./Settings";
import LocationProvider, {
  LocationContext,
  LocationContextType,
} from "@/contexts/LocationContext";
import { useContext } from "react";

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  return (
    <LocationProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="index"
          component={Index}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="ChooseLocation"
          component={ChooseLocation}
          options={{
            title: "Choose Location",
          }}
        />
        <Stack.Screen
          name="CollectData"
          component={CollectData}
          options={{ title: "Collect Data" }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ title: "Settings" }}
        />
      </Stack.Navigator>
    </LocationProvider>
  );
}
