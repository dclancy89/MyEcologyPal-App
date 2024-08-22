import {
  LocationContext,
  LocationContextType,
} from "@/contexts/LocationContext";
import { ThemeContext, ThemeContextType } from "@/contexts/ThemeContext";
import { ModeContext, ModeContextType, AppMode } from "@/contexts/ModeContext";
import { useContext } from "react";
import { StyleSheet, Pressable, Text, View } from "react-native";

const dataTemplates = [
  {
    name: "Water Sample",
    description: "Collect data from a water sample with a test strip.",
    navigationLocation: "WaterSample",
  },
  {
    name: "Invasive Species",
    description:
      "Record and report the existance and location of an invasive species.",
    navigationLocation: "InvasiveSpecies",
  },
  {
    name: "Trail Damage",
    description: "Record and report damage to trail or a need for maintanance.",
    navigationLocation: "TrailDamage",
  },
  {
    name: "At Risk Species",
    description: "Record and report a rare or at risk species.",
    navigationLocation: "AtRiskSpecies",
  },
];

export default function CollectData({ navigation }: any) {
  const { location } = useContext(LocationContext) as LocationContextType;
  const { theme } = useContext(ThemeContext) as ThemeContextType;
  const { mode } = useContext(ModeContext) as ModeContextType;

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
  });

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 20 }}>
        <Text>Current Location ID: {location.id}</Text>
        <Text>Current Mode: {mode}</Text>
      </View>
      <View>
        <Text>Choose a type of data to collect</Text>
        <View
          style={{
            width: "100%",
            flex: 1,
            alignItems: "center",
            marginTop: 10,
          }}
        >
          {dataTemplates.map((template) => {
            return (
              <Pressable
                key={template.navigationLocation}
                style={styles.locationCard}
                onPress={() => {
                  navigation.navigate(template.navigationLocation);
                }}
              >
                <Text style={{ fontSize: 25 }}>{template.name}</Text>
                <Text>{template.description}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}
