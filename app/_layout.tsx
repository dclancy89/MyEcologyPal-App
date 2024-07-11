import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Index from "./index";
import ChooseLocation from "./ChooseLocation";
import CollectData from "./CollectData";
import Settings from "./Settings";
import WaterSample from "./WaterSample";
import InvasiveSpecies from "./InvasiveSpecies";
import TrailDamage from "./TrailDamage";
import AtRiskSpecies from "./AtRiskSpecies";
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
            <Stack.Screen
              name="WaterSample"
              component={WaterSample}
              options={{ title: "Water Sample" }}
            />
            <Stack.Screen
              name="InvasiveSpecies"
              component={InvasiveSpecies}
              options={{ title: "Invasive Species" }}
            />
            <Stack.Screen
              name="TrailDamage"
              component={TrailDamage}
              options={{ title: "Trail Damage" }}
            />
            <Stack.Screen
              name="AtRiskSpecies"
              component={AtRiskSpecies}
              options={{ title: "At Risk Species" }}
            />
          </Stack.Navigator>
        </LocationProvider>
      </ModeProvider>
    </ThemeProvider>
  );
}
