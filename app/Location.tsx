import { useContext, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import Mapbox, { Camera, MapView } from "@rnmapbox/maps";
import {
  LocationContext,
  LocationContextType,
  Location,
} from "@/contexts/LocationContext";
import { ThemeContext, ThemeContextType } from "@/contexts/ThemeContext";
import { ModeContext, ModeContextType, AppMode } from "@/contexts/ModeContext";

import locationsList from "@/assets/data/locations.json";
import { Table, Row, Rows } from "react-native-table-component";

Mapbox.setAccessToken(
  "pk.eyJ1IjoiZGNsYW5jeTg5IiwiYSI6ImNsazE4Y2JqaDAzd2czbm54b2U5ZDVmMnAifQ.bjJQXqxuWeUVuRR1d2-aaw"
);

const getLocationById = (id: number) => {
  return locationsList.filter((location) => id === location.id)[0];
};

export default function LocationScreen({ route, navigation }: any) {
  const { locationId } = route.params;
  const { location, setLocation } = useContext(
    LocationContext
  ) as LocationContextType;
  const { theme } = useContext(ThemeContext) as ThemeContextType;
  const { mode } = useContext(ModeContext) as ModeContextType;

  const [locationToView, setLocationToView] = useState<Location>(
    getLocationById(locationId)
  );

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

  const tableData = {
    tableHead: ["Id", "Type", "Date/Time", "Lat/Lon"],
    tableData: [
      ["1", "Water Sample", "Oct 1, 2024", "10, 40"],
      ["2", "Water Sample", "Oct 1, 2024", "10, 40"],
      ["3", "Water Sample", "Oct 1, 2024", "10, 40"],
      ["4", "Water Sample", "Oct 1, 2024", "10, 40"],
      ["5", "Water Sample", "Oct 1, 2024", "10, 40"],
    ],
  };

  return (
    <ScrollView overScrollMode={"never"} style={styles.container}>
      <View>
        <Text>Current Location ID: {location.id}</Text>
        <Text>Current Mode: {mode}</Text>
      </View>
      <View>
        <Text style={{ fontSize: 24 }}>Name: {locationToView.name}</Text>
        <Text>
          Location: {locationToView.city}, {locationToView.state}
        </Text>
        <Text>ID: {locationToView.id}</Text>

        <Text>Data Points: {locationToView.numDataPoints}</Text>
      </View>
      <View
        style={{
          flex: 1,
          height: 400,
        }}
      >
        <MapView style={styles.map}>
          <Camera
            zoomLevel={14}
            centerCoordinate={[locationToView.lat, locationToView.lon]}
            animationMode="none"
          />
        </MapView>
      </View>
      <View style={{ flex: 1 }}>
        <Text>Data Collected</Text>
        <Table>
          <Row data={tableData.tableHead} />
          <Rows data={tableData.tableData} />
        </Table>
      </View>
    </ScrollView>
  );
}
