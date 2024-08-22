import { Button, StyleSheet, Pressable, Text, View } from "react-native";
import {
  LocationContext,
  LocationContextType,
} from "@/contexts/LocationContext";
import { useContext } from "react";
import { ThemeContext, ThemeContextType } from "@/contexts/ThemeContext";
import { ModeContext, ModeContextType, AppMode } from "@/contexts/ModeContext";

interface HomePageButton {
  content: string;
  navigationLocation: string;
  allowedOffline: boolean;
}

export default function Index({ navigation }: any) {
  const { location } = useContext(LocationContext) as LocationContextType;
  const { theme } = useContext(ThemeContext) as ThemeContextType;
  const { mode, setMode } = useContext(ModeContext) as ModeContextType;

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
      // borderColor: "black",
      // borderWidth: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.button,
      borderRadius: 10,
    },
    buttonText: {
      color: "#FFF",
      fontSize: 48,
      textAlign: "center",
    },
  });

  const homePageButtons: HomePageButton[] = [
    {
      content: "Select Location",
      navigationLocation: "ChooseLocation",
      allowedOffline: false,
    },
    {
      content: "Collect Data",
      navigationLocation: "CollectData",
      allowedOffline: true,
    },
    {
      content: "Settings",
      navigationLocation: "Settings",
      allowedOffline: true,
    },
    {
      content: "Upload Data",
      navigationLocation: "UploadData",
      allowedOffline: false,
    },
  ];

  return (
    <View style={styles.container}>
      <View>
        <Text>Current Location ID: {location.id}</Text>
        <Text>Current Mode: {mode}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        {homePageButtons.map((button) => {
          return (
            <Pressable
              key={button.navigationLocation}
              style={styles.button}
              onPress={() => {
                if (mode === AppMode.Online || button.allowedOffline) {
                  navigation.navigate(button.navigationLocation);
                } else {
                  alert("This feature is not allowed if offline mode");
                }
              }}
            >
              <Text style={styles.buttonText}>{button.content}</Text>
            </Pressable>
          );
        })}
      </View>
      <Button
        color={mode === AppMode.Online ? "green" : "red"}
        title={`Switch to ${
          mode === AppMode.Online ? "Offline" : "Online"
        } Mode`}
        onPress={() => {
          if (mode === AppMode.Online) {
            alert("Switching to Offline Mode");
            setMode(AppMode.Offline);
          } else {
            alert("Switching to Online Mode");
            setMode(AppMode.Online);
          }
        }}
      />
    </View>
  );
}
