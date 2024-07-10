import { useContext } from "react";
import { Text, View, StyleSheet, Pressable, ScrollView } from "react-native";
import Mapbox, { Camera, MapView } from "@rnmapbox/maps";
import {
  LocationContext,
  LocationContextType,
  Location,
} from "@/contexts/LocationContext";
import { ThemeContext, ThemeContextType } from "@/contexts/ThemeContext";

Mapbox.setAccessToken(
  "pk.eyJ1IjoiZGNsYW5jeTg5IiwiYSI6ImNsazE4Y2JqaDAzd2czbm54b2U5ZDVmMnAifQ.bjJQXqxuWeUVuRR1d2-aaw"
);

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
  const { theme } = useContext(ThemeContext) as ThemeContextType;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: theme.background,
    },
    locationCard: {
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
  });

  return (
    <ScrollView overScrollMode={"never"} style={styles.container}>
      <View>
        <Text>Current Location ID: {location.id}</Text>
      </View>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>
        Choose a Location for Data Collection
      </Text>
      {locations.map((loc) => {
        return (
          <View style={styles.locationCard}>
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
                <Text style={styles.locationCardButton}>Select Location</Text>
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
