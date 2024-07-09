import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Index from "./index";
import ChooseLocation from "./ChooseLocation";
import ManageLocations from "./ManageLocations";
import Settings from "./Settings";

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="index"
        component={Index}
        options={{ title: "Home" }}
      />
      <Stack.Screen
        name="ChooseLocation"
        component={ChooseLocation}
        options={{ title: "Choose Location" }}
      />
      <Stack.Screen
        name="ManageLocations"
        component={ManageLocations}
        options={{ title: "Manage Locations" }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ title: "Settings" }}
      />
    </Stack.Navigator>
  );
}
