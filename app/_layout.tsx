import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Index from "./index";
import ChooseLocation from "./ChooseLocation";
import CollectData from "./CollectData";
import Settings from "./Settings";
import LocationScreen from "./Location";
import LocationProvider from "@/contexts/LocationContext";
import ThemeProvider from "@/contexts/ThemeContext";
import ModeProvider from "@/contexts/ModeContext";

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  return (
    <ThemeProvider>
      <ModeProvider>
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
            <Stack.Screen
              name="Location"
              component={LocationScreen}
              options={{ title: "Location" }}
            />
          </Stack.Navigator>
        </LocationProvider>
      </ModeProvider>
    </ThemeProvider>
  );
}
