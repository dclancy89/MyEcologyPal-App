import {
  LocationContext,
  LocationContextType,
} from "@/contexts/LocationContext";
import { ThemeContext, ThemeContextType } from "@/contexts/ThemeContext";
import { ModeContext, ModeContextType, AppMode } from "@/contexts/ModeContext";
import { useContext } from "react";
import { StyleSheet, Text, TextInput, View, ScrollView } from "react-native";

export default function WaterSample({ navigation }: any) {
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
    input: {
      borderWidth: 1,
      padding: 10,
    },
  });

  return (
    <ScrollView style={styles.container} overScrollMode={"never"}>
      <View style={{ marginBottom: 20 }}>
        <Text>Current Location ID: {location.id}</Text>
        <Text>Current Mode: {mode}</Text>
      </View>
      <View>
        <Text>Water Sample 2</Text>
        <Text>pH</Text>
        <TextInput style={styles.input} />
        <Text>Hardness</Text>
        <TextInput style={styles.input} />
        <Text>Hydrogen Sulfide</Text>
        <TextInput style={styles.input} />
        <Text>Iron</Text>
        <TextInput style={styles.input} />
        <Text>Copper</Text>
        <TextInput style={styles.input} />
        <Text>Lead</Text>
        <TextInput style={styles.input} />
        <Text>Manganese</Text>
        <TextInput style={styles.input} />
        <Text>Total Chlorine</Text>
        <TextInput style={styles.input} />
        <Text>Mercury</Text>
        <TextInput style={styles.input} />
        <Text>Nitrate</Text>
        <TextInput style={styles.input} />
        <Text>Nitrite</Text>
        <TextInput style={styles.input} />
        <Text>Sulfate</Text>
        <TextInput style={styles.input} />
        <Text>Zinc</Text>
        <TextInput style={styles.input} />
        <Text>Flouride</Text>
        <TextInput style={styles.input} />
        <Text>Sodium Chloride</Text>
        <TextInput style={styles.input} />
        <Text>Total Alkalynity</Text>
        <TextInput style={styles.input} />
        {/* <View
          style={{
            width: "100%",
            flex: 1,
            alignItems: "center",
            marginTop: 10,
          }}
        ></View> */}
      </View>
    </ScrollView>
  );
}

/* 
pH
hardness
hydrogen sulfide
iron
copper
lead
manganese
total chlorine
mercury
nitrate
nitrite
sulfate
zinc
flouride
sodium chloride
total alkalynity



*/
