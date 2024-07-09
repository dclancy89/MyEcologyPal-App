import {
  LocationContext,
  LocationContextType,
} from "@/contexts/LocationContext";
import { useContext } from "react";
import { Button, Pressable, Text, View } from "react-native";

const dataTemplates = [
  {
    name: "Water Sample",
    description: "Collect data from a water sample with a test strip.",
  },
  {
    name: "Invasive Species",
    description:
      "Record and report the existance and location of an invasive species.",
  },
  {
    name: "Trail Damage",
    description: "Record and report damage to trail or a need for maintanance.",
  },
];

export default function CollectData({ navigation }: any) {
  const { location } = useContext(LocationContext) as LocationContextType;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        alignContent: "space-around",
        flexWrap: "wrap",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <View>
        <Text>Current Location ID: {location.id}</Text>
      </View>
      <Text>Choose a type of data to collect</Text>
      <View style={{ width: "100%", flex: 1, alignItems: "center" }}>
        {dataTemplates.map((template) => {
          return (
            <Pressable
              style={{
                width: "80%",
                height: 100,
                borderWidth: 2,
                borderColor: "#000",
                marginBottom: 10,
                padding: 5,
              }}
            >
              <Text style={{ fontSize: 25 }}>{template.name}</Text>
              <Text>{template.description}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
