import {
  LocationContext,
  LocationContextType,
} from "@/contexts/LocationContext";
import { ThemeContext, ThemeContextType } from "@/contexts/ThemeContext";
import { ModeContext, ModeContextType, AppMode } from "@/contexts/ModeContext";
import { useContext, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Geolocation from "react-native-geolocation-service";

export default function TrailDamage({ navigation }: any) {
  const { location } = useContext(LocationContext) as LocationContextType;
  const { theme } = useContext(ThemeContext) as ThemeContextType;
  const { mode } = useContext(ModeContext) as ModeContextType;

  const [category, setCategory] = useState<string>("");

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: theme.background,
    },
    locationCard: {
      width: "80%",
      gap: 10,
      flexDirection: "column",
      justifyContent: "space-between",
      borderColor: "black",
      borderWidth: 2,
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      minHeight: 110,
      backgroundColor: theme.secondary,
    },
    locationCardButton: {
      fontSize: 30,
      borderColor: "#000",
      borderWidth: 2,
      backgroundColor: theme.button,
      color: "white",
      marginTop: 20,
      padding: 5,
      textAlign: "center",
    },
    map: {
      flex: 1,
    },
    input: {
      borderWidth: 1,
      padding: 10,
    },
    inputLast: {
      borderWidth: 1,
      padding: 10,
      marginBottom: 20,
    },
    dropdown: {
      borderWidth: 1,
      padding: 10,
    },
  });

  const dropdownOptions = [
    { label: "Overgrown Trail", value: "OT" },
    { label: "Blocked Trail", value: "BT" },
    { label: "Damaged Structure", value: "DS" },
    { label: "Ground Damage", value: "GD" },
  ];

  const getLocationData = async () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        alert(`[${position.coords.latitude}, ${position.coords.longitude}]`);
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 3000, maximumAge: 10000 }
    );
  };

  return (
    <ScrollView style={styles.container} overScrollMode={"never"}>
      <View style={{ marginBottom: 20 }}>
        <Text>Current Location ID: {location.id}</Text>
        <Text>Current Mode: {mode}</Text>
      </View>
      <View style={{ marginBottom: 50 }}>
        <Text style={{ fontSize: 30 }}>Trail Damage</Text>
        <Text>Damage Type</Text>
        <Dropdown
          style={styles.dropdown}
          data={dropdownOptions}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select item"
          value={category}
          onChange={(item) => {
            setCategory(item.value);
          }}
        />

        <Text>Description of Issue</Text>
        <TextInput multiline numberOfLines={5} style={styles.inputLast} />
        <View style={{ marginBottom: 20 }}>
          <Button
            color={theme.button}
            title="Add Picture(s)"
            onPress={() => {
              alert("Pictures coming soon...");
            }}
          />
        </View>
        <Button
          color={theme.button}
          title="Record Data"
          onPress={async () => {
            await getLocationData();
            alert("recording data...");
          }}
        />
      </View>
    </ScrollView>
  );
}
