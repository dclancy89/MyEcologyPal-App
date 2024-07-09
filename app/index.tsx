import { Button, Pressable, Text, View } from "react-native";
import {
  LocationContext,
  LocationContextType,
} from "@/contexts/LocationContext";
import { useContext, useState } from "react";

export default function Index({ navigation }: any) {
  const { location } = useContext(LocationContext) as LocationContextType;
  return (
    <>
      <View>
        <Text>Current Location ID: {location.id}</Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "space-around",
          alignItems: "center",
          alignContent: "space-around",
          flexWrap: "wrap",
          flexDirection: "row",
          gap: 8,
        }}
      >
        <Pressable
          style={{
            width: "40%",
            height: "40%",
            borderColor: "black",
            borderWidth: 2,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#787878",
            borderRadius: 10,
          }}
          onPress={() => {
            navigation.navigate("ChooseLocation");
          }}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 48,
              textAlign: "center",
            }}
          >
            Select Location
          </Text>
        </Pressable>
        <Pressable
          style={{
            width: "40%",
            height: "40%",
            borderColor: "black",
            borderWidth: 2,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#787878",
            borderRadius: 10,
          }}
          onPress={() => {
            navigation.navigate("CollectData");
          }}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 48,
              textAlign: "center",
            }}
          >
            Collect Data
          </Text>
        </Pressable>
        <Pressable
          style={{
            width: "40%",
            height: "40%",
            borderColor: "black",
            borderWidth: 2,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#787878",
            borderRadius: 10,
          }}
          onPress={() => {
            navigation.navigate("Settings");
          }}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 48,
              textAlign: "center",
            }}
          >
            Settings
          </Text>
        </Pressable>
      </View>
    </>
  );
}
