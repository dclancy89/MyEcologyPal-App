import { localApiKey } from "@/constants/Storage";
import { getApiKeyFromAsyncStorage } from "@/utilities/getApiKeyFromAsyncStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Button, Text, TextInput, View, StyleSheet } from "react-native";

export default function Settings({ navigation }: any) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>("12345");

  useEffect(() => {
    getApiKeyFromAsyncStorage(setApiKey);
  }, []);

  const styles = StyleSheet.create({
    largeText: {
      fontSize: 18,
    },
  });

  const saveApiKeyToAsyncStorage = async () => {
    try {
      await AsyncStorage.setItem(
        localApiKey,
        JSON.stringify({ API_KEY: apiKey })
      );
      alert("Api Key Updated");
    } catch (e) {
      alert("There was an error saving the API Key. Please try again");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",

        flexWrap: "wrap",
        flexDirection: "column",
        gap: 8,
        marginLeft: 100,
      }}
    >
      <Text style={{ fontSize: 48, marginTop: 20 }}>Settings</Text>
      <View style={{ flexDirection: "row" }}>
        <Button
          title={isEditing ? "Save" : "Edit"}
          onPress={() => {
            if (isEditing) {
              saveApiKeyToAsyncStorage();
            }
            setIsEditing((prev) => !prev);
          }}
        />
        <Text style={{ marginLeft: 10 }}>
          Click the button to toggle edit mode on/off
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          marginTop: 20,
        }}
      >
        <Text style={{ ...styles.largeText, width: 100 }}>API Key: </Text>
        {isEditing ? (
          <TextInput
            style={{
              width: 400,
              height: 34,
              borderWidth: 1,
              borderColor: "red",
            }}
            value={apiKey}
            onChange={(e) => {
              setApiKey(e.nativeEvent.text);
            }}
          />
        ) : (
          <Text style={styles.largeText}>
            {apiKey.split("").map((char: any) => {
              return "*";
            })}
          </Text>
        )}
      </View>
    </View>
  );
}
