import { Button, Pressable, Text, View } from "react-native";

export default function Index({ navigation }: any) {
  return (
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
        }}
        onPress={() => {
          navigation.navigate("ManageLocations");
        }}
      >
        <Text
          style={{
            color: "#FFFFFF",
            fontSize: 48,
            textAlign: "center",
          }}
        >
          Manage Locations
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
  );
}
