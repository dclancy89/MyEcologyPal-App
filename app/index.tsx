import { Button, StyleSheet, Pressable, Text, View } from "react-native";
import {
  LocationContext,
  LocationContextType,
} from "@/contexts/LocationContext";
import { useContext } from "react";
import { ThemeContext, ThemeContextType } from "@/contexts/ThemeContext";

interface HomePageButton {
  content: string;
  navigationLocation: string;
}

export default function Index({ navigation }: any) {
  const { location } = useContext(LocationContext) as LocationContextType;
  const { theme } = useContext(ThemeContext) as ThemeContextType;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.background,
      flex: 1,
    },
    buttonsContainer: {
      flex: 1,
      justifyContent: "space-around",
      alignItems: "center",
      alignContent: "space-around",
      flexWrap: "wrap",
      flexDirection: "row",
      gap: 8,
    },
    button: {
      width: "40%",
      height: "40%",
      // borderColor: "white",
      // borderWidth: 2,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.button,
      borderRadius: 10,
    },
    buttonText: {
      color: "#FFFFFF",
      fontSize: 48,
      textAlign: "center",
    },
  });

  const homePageButtons: HomePageButton[] = [
    {
      content: "Select Location",
      navigationLocation: "ChooseLocation",
    },
    {
      content: "Collect Data",
      navigationLocation: "CollectData",
    },
    {
      content: "Settings",
      navigationLocation: "Settings",
    },
  ];

  return (
    <View style={styles.container}>
      <View>
        <Text>Current Location ID: {location.id}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        {homePageButtons.map((button) => {
          return (
            <Pressable
              style={styles.button}
              onPress={() => {
                navigation.navigate(button.navigationLocation);
              }}
            >
              <Text style={styles.buttonText}>{button.content}</Text>
            </Pressable>
          );
        })}
      </View>
      <Button
        title="Switch to Offline Mode"
        onPress={() => {
          alert("toggle");
        }}
      />
    </View>
  );
}
