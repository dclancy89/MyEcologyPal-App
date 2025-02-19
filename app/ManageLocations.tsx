import { Button, Pressable, Text, View } from "react-native";

export default function ManageLocations({ navigation }: any) {
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
      <Button title="Back" onPress={() => navigation.navigate("index")} />
      <Text>Manage Locations</Text>
    </View>
  );
}
