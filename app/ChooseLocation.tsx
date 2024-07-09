import { useContext, useState } from "react";
import { Text, View, StyleSheet, Pressable, ScrollView } from "react-native";
import Mapbox, { Camera, MapView } from "@rnmapbox/maps";
import {
  LocationContext,
  LocationContextType,
  Location,
} from "@/contexts/LocationContext";

Mapbox.setAccessToken(
  "pk.eyJ1IjoiZGNsYW5jeTg5IiwiYSI6ImNsazE4Y2JqaDAzd2czbm54b2U5ZDVmMnAifQ.bjJQXqxuWeUVuRR1d2-aaw"
);
const data = {
  head: ["ID", "Name", "Location"],
  rows: [
    ["1", "Lemon Lake", "Crown Point, IN"],
    ["2", "Deep River", "Valparaiso, IN"],
    ["3", "Other Location", "Other, IN"],
  ],
};

const locations: Location[] = [
  {
    id: 123,
    name: "Lemon Lake",
    city: "Crown Point",
    state: "Indiana",
    numDataPoints: 123,
    lat: -87.40433434232925,
    lon: 41.38288884846694,
  },
  {
    id: 124,
    name: "Lemon Lake",
    city: "Crown Point",
    state: "Indiana",
    numDataPoints: 124,
    lat: -87.40433434232925,
    lon: 41.38288884846694,
  },
  {
    id: 125,
    name: "Lemon Lake",
    city: "Crown Point",
    state: "Indiana",
    numDataPoints: 125,
    lat: -87.40433434232925,
    lon: 41.38288884846694,
  },
  {
    id: 126,
    name: "Lemon Lake",
    city: "Crown Point",
    state: "Indiana",
    numDataPoints: 126,
    lat: -87.40433434232925,
    lon: 41.38288884846694,
  },
];

export default function ChooseLocation({ navigation }: any) {
  const { location, setLocation } = useContext(
    LocationContext
  ) as LocationContextType;
  return (
    <ScrollView
      overScrollMode={"never"}
      style={{
        flex: 1,
        padding: 10,
      }}
    >
      <View>
        <Text>Current Location ID: {location.id}</Text>
      </View>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>
        Choose a Location for Data Collection
      </Text>
      {locations.map((loc) => {
        return (
          <View
            style={{
              width: "100%",
              gap: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              borderColor: "black",
              borderWidth: 2,
              borderRadius: 5,
              padding: 10,
              marginBottom: 10,
              minHeight: 250,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 24 }}>Name: {loc.name}</Text>
              <Text>
                Location: {loc.city}, {loc.state}
              </Text>
              <Text>ID: {loc.id}</Text>

              <Text>Data Points: {loc.numDataPoints}</Text>
              <Pressable
                onPress={() => {
                  setLocation(loc);
                  alert(`${loc.id} set as primary location`);
                }}
              >
                <Text
                  style={{
                    fontSize: 30,
                    borderColor: "#000",
                    borderWidth: 2,
                    backgroundColor: "grey",
                    color: "white",
                    marginTop: 20,
                    padding: 5,
                    textAlign: "center",
                  }}
                >
                  Select Location
                </Text>
              </Pressable>
            </View>

            <View style={{ flex: 1 }}>
              <MapView style={styles.map}>
                <Camera
                  zoomLevel={14}
                  centerCoordinate={[loc.lat, loc.lon]}
                  animationMode="none"
                />
              </MapView>
            </View>
          </View>
        );
      })}
    </ScrollView>
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
