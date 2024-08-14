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
import UploadData from "./UploadData";

import LocationProvider from "@/contexts/LocationContext";
import ThemeProvider from "@/contexts/ThemeContext";
import ModeProvider from "@/contexts/ModeContext";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const HomeButton: React.FC = () => {
  const navigation = useNavigation();
  const homeScreen = "index" as never;
  return (
    <Button
      onPress={() => {
        navigation.navigate(homeScreen);
      }}
      title="Home"
    />
  );
};

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
                headerRight: () => <HomeButton />,
              }}
            />
            <Stack.Screen
              name="CollectData"
              component={CollectData}
              options={{
                title: "Collect Data",
                headerRight: () => <HomeButton />,
              }}
            />
            <Stack.Screen
              name="Settings"
              component={Settings}
              options={{ title: "Settings", headerRight: () => <HomeButton /> }}
            />
            <Stack.Screen
              name="Location"
              component={LocationScreen}
              options={{ title: "Location", headerRight: () => <HomeButton /> }}
            />
            <Stack.Screen
              name="WaterSample"
              component={WaterSample}
              options={{
                title: "Water Sample",
                headerRight: () => <HomeButton />,
              }}
            />
            <Stack.Screen
              name="InvasiveSpecies"
              component={InvasiveSpecies}
              options={{
                title: "Invasive Species",
                headerRight: () => <HomeButton />,
              }}
            />
            <Stack.Screen
              name="TrailDamage"
              component={TrailDamage}
              options={{
                title: "Trail Damage",
                headerRight: () => <HomeButton />,
              }}
            />
            <Stack.Screen
              name="AtRiskSpecies"
              component={AtRiskSpecies}
              options={{
                title: "At Risk Species",
                headerRight: () => <HomeButton />,
              }}
            />
            <Stack.Screen
              name="UploadData"
              component={UploadData}
              options={{
                title: "Upload Data",
                headerRight: () => <HomeButton />,
              }}
            />
          </Stack.Navigator>
        </LocationProvider>
      </ModeProvider>
    </ThemeProvider>
  );
}
