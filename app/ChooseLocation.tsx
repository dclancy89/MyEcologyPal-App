import { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, Pressable, ScrollView } from "react-native";
import Mapbox, { Camera, MapView } from "@rnmapbox/maps";
import {
  LocationContext,
  LocationContextType,
} from "@/contexts/LocationContext";
import { ThemeContext, ThemeContextType } from "@/contexts/ThemeContext";
import { ModeContext, ModeContextType, AppMode } from "@/contexts/ModeContext";

import { GET_LOCATIONS_API } from "@/constants/Api";
import axios from "axios";

import { getApiKeyFromAsyncStorage } from "@/utilities/getApiKeyFromAsyncStorage";

Mapbox.setAccessToken("PUT_TOKEN_HERE");

export default function ChooseLocation({ navigation }: any) {
  const { location, setLocation } = useContext(
    LocationContext
  ) as LocationContextType;
  const [apiKey, setApiKey] = useState<string>();
  const [locationsFromApi, setLocationsFromApi] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { theme } = useContext(ThemeContext) as ThemeContextType;
  const { mode } = useContext(ModeContext) as ModeContextType;
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

  useEffect(() => {
    getApiKeyFromAsyncStorage(setApiKey);
  }, []);

  useEffect(() => {
    if (apiKey) {
      axios
        .get(GET_LOCATIONS_API, {
          headers: {
            "x-api-key": apiKey,
            Accept: "application/json",
            "content-type": "application/json",
          },
        })
        .then((res) => {
          setLocationsFromApi(
            res.data.map((location: any) => {
              return {
                id: location.id,
                name: location.name,
                city: location.city,
                state: location.state,
                lat: location.lat,
                lon: location.lon,
              };
            })
          );
        });
      setIsLoading(false);
    }
  }, [apiKey]);

  return (
    <ScrollView overScrollMode={"never"} style={styles.container}>
      <View style={{ marginBottom: 20 }}>
        <Text>Current Location ID: {location.id}</Text>
        <Text>Current Mode: {mode}</Text>
      </View>
      {/* <Text style={{ fontSize: 20, marginBottom: 20 }}>
        Choose a Location for Data Collection
      </Text> */}
      {!isLoading &&
        locationsFromApi?.map((loc: any) => {
          return (
            <View style={styles.locationCard} key={loc.id}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 24 }}>Name: {loc.name}</Text>
                <Text>
                  Location: {loc.city}, {loc.state}
                </Text>
                <Text>ID: {loc.id}</Text>

                <Text>Data Points: {loc.numDataPoints}</Text>
                <Pressable
                  onPress={() => {
                    // setLocation(loc);
                    // alert(`${loc.id} set as primary location`);
                    navigation.navigate("Location", { locationId: loc.id });
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
