import {
  LocationContext,
  LocationContextType,
} from "@/contexts/LocationContext";
import { ThemeContext, ThemeContextType } from "@/contexts/ThemeContext";
import { ModeContext, ModeContextType } from "@/contexts/ModeContext";
import { useContext, useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import { Row, Rows, Table } from "react-native-table-component";
import { getDataFromAsyncStorage } from "@/utilities/getFromAsyncStorage";
import axios from "axios";
import { API_KEY, POST_CREATE_DATA_POINTS } from "@/constants/Api";
import { removeFromAsyncStorage } from "@/utilities/removeFromAsyncStorage";
import { getApiKeyFromAsyncStorage } from "@/utilities/getApiKeyFromAsyncStorage";

export default function UploadData({ navigation }: any) {
  const { location } = useContext(LocationContext) as LocationContextType;
  const { theme } = useContext(ThemeContext) as ThemeContextType;
  const { mode } = useContext(ModeContext) as ModeContextType;

  const [apiKey, setApiKey] = useState<string>();

  const [dataPointsToSave, setDataPointsToSave] = useState([]);

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
      width: "80%",
      gap: 10,
      flexDirection: "column",
      justifyContent: "space-between",
      borderColor: "black",
      borderWidth: 2,
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      minHeight: 110,
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
    input: {
      borderWidth: 1,
      padding: 10,
    },
    inputLast: {
      borderWidth: 1,
      padding: 10,
      marginBottom: 20,
    },
    dropdown: {
      borderWidth: 1,
      padding: 10,
    },
  });

  useEffect(() => {
    getDataFromAsyncStorage(setDataPointsToSave);
  }, []);

  const mappedData = dataPointsToSave?.map((dataPoint: any) => {
    return [
      dataPoint.locationId,
      dataPoint.template,
      dataPoint.data,
      new Date(dataPoint.timestamp).toLocaleString(),
      `[${dataPoint.location.latitude} ${dataPoint.location.longitude}]`,
    ];
  });

  const tableData = {
    tableHead: ["LocationId", "Template", "Data", "Date/Time", "Lat/Lon"],
    tableData: mappedData,
  };

  const saveDataToApi = () => {
    const createDataPointDtos = dataPointsToSave.map((data: any) => {
      return {
        locationId: data.locationId || location.id,
        templateType: data.template,
        data: data.data,
        lat: data.location.latitude,
        lon: data.location.longitude,
        recordedAt: new Date(data.timestamp),
      };
    });

    axios
      .post(POST_CREATE_DATA_POINTS, createDataPointDtos, {
        headers: {
          "x-api-key": apiKey,
          Accept: "application/json",
          "content-type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 201) {
          alert("Successfully saved data to server.");
          removeFromAsyncStorage();
          navigation.navigate("index");
        }
      })
      .catch((e) => {
        console.log(e);
        alert("There was an error");
      });
  };

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 20 }}>
        <Text>Current Location ID: {location.id}</Text>
        <Text>Current Mode: {mode}</Text>
      </View>
      <View>
        <Table>
          <Row data={tableData.tableHead} />
          <Rows data={tableData.tableData} />
        </Table>
      </View>
      <Button
        disabled={!dataPointsToSave.length}
        title="Upload Data"
        onPress={() => {
          saveDataToApi();
        }}
      />
    </View>
  );
}
