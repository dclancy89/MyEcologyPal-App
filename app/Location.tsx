import { useContext, useEffect, useState } from "react";
import {
  Button,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
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
import axios from "axios";
import { GET_LOCATION_WITH_DATA_BY_ID } from "@/constants/Api";
import { getApiKeyFromAsyncStorage } from "@/utilities/getApiKeyFromAsyncStorage";

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
  const [locationToViewFromApi, setLocationToViewFromApi] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [apiKey, setApiKey] = useState<string>();
  const [locationToView, setLocationToView] = useState<Location>(
    getLocationById(locationId)
  );

  useEffect(() => {
    getApiKeyFromAsyncStorage(setApiKey);
  }, []);

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
    button: {
      fontSize: 20,
      borderColor: "#000",
      borderWidth: 2,
      backgroundColor: theme.button,
      color: "white",
      padding: 10,
      textAlign: "center",
      minWidth: 300,
    },
    disabled: {
      backgroundColor: "gray",
    },
    map: {
      flex: 1,
    },
  });

  useEffect(() => {
    if (apiKey) {
      axios
        .get(GET_LOCATION_WITH_DATA_BY_ID, {
          headers: {
            "x-api-key": apiKey,
            Accept: "application/json",
            "content-type": "application/json",
          },
        })
        .then((res) => {
          setLocationToViewFromApi(res.data);
        });
      setIsLoading(false);
    }
  }, [apiKey]);

  const mappedDataPoints = locationToViewFromApi?.data?.map(
    (dataPoint: any) => {
      return [
        dataPoint.id,
        dataPoint.templateType,
        JSON.stringify(dataPoint.data),
        new Date(dataPoint.recordedAt).toLocaleString(),
        `${dataPoint.lat}, ${dataPoint.lon}`,
      ];
    }
  );

  const tableData = {
    tableHead: ["Id", "Type", "Data", "Date/Time", "Lat/Lon"],
    tableData: mappedDataPoints,
  };

  return (
    <ScrollView overScrollMode={"never"} style={styles.container}>
      <View>
        <Text>Current Location ID: {location.id}</Text>
        <Text>Current Mode: {mode}</Text>
      </View>
      {!isLoading && locationToViewFromApi && (
        <>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <Text style={{ fontSize: 24 }}>
                Name: {locationToViewFromApi.location.name}
              </Text>
              <Text>
                Location: {locationToViewFromApi.location.city},{" "}
                {locationToViewFromApi.location.state}
              </Text>
              <Text>ID: {locationToViewFromApi.location.id}</Text>

              <Text>Data Points: {locationToViewFromApi.data.length}</Text>
            </View>
            <View style={{ marginRight: 30 }}>
              <Pressable
                onPress={() => {
                  setLocation(locationToViewFromApi.location);
                  alert(
                    `Set ${locationToViewFromApi.location.name} as primary location`
                  );
                }}
              >
                <Text style={styles.button}>Make Primary Location</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  if (locationId !== location.id) {
                    alert(
                      "Please make this location the primary location first."
                    );
                  } else {
                    navigation.navigate("CollectData");
                  }
                }}
              >
                <Text style={styles.button}>Collect Data</Text>
              </Pressable>
            </View>
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
                centerCoordinate={[
                  locationToViewFromApi.location.lat,
                  locationToViewFromApi.location.lon,
                ]}
                animationMode="none"
              />
            </MapView>
          </View>
        </>
      )}

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
