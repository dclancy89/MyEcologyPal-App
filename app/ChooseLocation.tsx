import { useState } from "react";
import { Button, Text, View, StyleSheet, Pressable } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import Mapbox, { MapView } from "@rnmapbox/maps";

Mapbox.setAccessToken(
  "pk.eyJ1IjoiZGNsYW5jeTg5IiwiYSI6ImNsazE4Y2JqaDAzd2czbm54b2U5ZDVmMnAifQ.bjJQXqxuWeUVuRR1d2-aaw"
);
Mapbox.setConnected(true);
const data = {
  head: ["ID", "Name", "Location"],
  rows: [
    ["1", "Lemon Lake", "Crown Point, IN"],
    ["2", "Deep River", "Valparaiso, IN"],
    ["3", "Other Location", "Other, IN"],
  ],
};

export default function ChooseLocation({ navigation }: any) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Button title="Back" onPress={() => navigation.navigate("index")} />
      <Text>Choose a Location</Text>
      <Pressable
        style={{
          width: "100%",
          gap: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          borderColor: "black",
          borderWidth: 2,
          borderRadius: 5,
          padding: 10,
          margin: 10,
          minHeight: 100,
        }}
      >
        <View>
          <Text>ID: 1234</Text>
          <Text>Name: Lemon Lake</Text>
        </View>
        <View>
          <Text>Location: Crown Point, IN</Text>
          <Text>Data Points: 123</Text>
        </View>
        <View>
          <MapView style={styles.map} />
        </View>
      </Pressable>
      {/* <Table
        style={{ width: "100%" }}
        borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}
      >
        <Row data={data.head} style={styles.head} textStyle={styles.text} />
        <Rows data={data.rows} textStyle={styles.text} />
      </Table> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  text: { margin: 6 },
  map: {
    flex: 1,
  },
});
