import {
  LocationContext,
  LocationContextType,
} from "@/contexts/LocationContext";
import { ThemeContext, ThemeContextType } from "@/contexts/ThemeContext";
import { ModeContext, ModeContextType } from "@/contexts/ModeContext";
import { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Button,
  Pressable,
  Modal,
} from "react-native";
import { DataTemplateType } from "@/enums/DataTemplateType.enum";
import { saveToAsyncStorage } from "@/utilities/saveToAsyncStorage";
import { generateMetaData } from "@/utilities/generateMetaData";

interface WaterSample {
  pH?: string;
  hardness?: string;
  hydrogenSulfide?: string;
  iron?: string;
  copper?: string;
  manganese?: string;
  totalChlorine?: string;
  mercury?: string;
  nitrate?: string;
  nitrite?: string;
  sulfate?: string;
  zinc?: string;
  flouride?: string;
  sodiumChloride?: string;
  totalAlkalynity?: string;
}

export default function WaterSample({ navigation }: any) {
  const { location } = useContext(LocationContext) as LocationContextType;
  const { theme } = useContext(ThemeContext) as ThemeContextType;
  const { mode } = useContext(ModeContext) as ModeContextType;

  const [waterData, setWaterData] = useState<WaterSample>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataToSave, setDataToSave] = useState<any>();
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  const processWaterDataInputChanges = (inputName: string, value: string) => {
    setWaterData((prev: WaterSample) => {
      const old = prev;
      old[inputName as keyof WaterSample] = value;
      return old;
    });
  };

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
  });

  const waterSampleInputs = [
    {
      label: "pH",
      inputName: "pH",
    },
    {
      label: "Hardness",
      inputName: "hardness",
    },
    {
      label: "Hydrogen Sulfide",
      inputName: "hydrogenSulfide",
    },
    {
      label: "Iron",
      inputName: "iron",
    },
    {
      label: "Copper",
      inputName: "copper",
    },
    {
      label: "Lead",
      inputName: "lead",
    },
    {
      label: "Manganese",
      inputName: "manganese",
    },
    {
      label: "Total Chlorine",
      inputName: "totalChlorine",
    },
    {
      label: "Mercury",
      inputName: "mercury",
    },
    {
      label: "Nitrate",
      inputName: "nitrate",
    },
    {
      label: "Nitrite",
      inputName: "nitrite",
    },
    {
      label: "Sulfate",
      inputName: "sulfate",
    },
    {
      label: "Zinc",
      inputName: "zinc",
    },
    {
      label: "Flouride",
      inputName: "flouride",
    },
    {
      label: "Sodium Chloride",
      inputName: "sodiumChloride",
    },
    {
      label: "Total Alkalynity",
      inputName: "totalAlkalynity",
    },
  ];

  return (
    <ScrollView style={styles.container} overScrollMode={"never"}>
      <View style={{ marginBottom: 20 }}>
        <Text>Current Location ID: {location.id}</Text>
        <Text>Current Mode: {mode}</Text>
      </View>
      <View style={{ marginBottom: 50 }}>
        <Text style={{ fontSize: 30 }}>Water Sample</Text>
        {waterSampleInputs.map((input) => {
          return (
            <View key={input.inputName}>
              <Text>{input.label}</Text>
              <TextInput
                style={styles.input}
                onChange={(e) => {
                  processWaterDataInputChanges(
                    input.inputName,
                    e.nativeEvent.text
                  );
                }}
                keyboardType="decimal-pad"
              />
            </View>
          );
        })}
        <View style={{ marginBottom: 20 }}>
          <Button
            color={theme.button}
            title="Add Picture(s)"
            onPress={() => {
              alert("Pictures coming soon...");
            }}
          />
        </View>
        <Button
          disabled={isLoading}
          color={theme.button}
          title="Record Data"
          onPress={() => {
            generateMetaData(
              waterData,
              location.id,
              DataTemplateType.WaterSample,
              setIsLoading,
              setDataToSave,
              setShowConfirmModal
            );
          }}
        />
        {dataToSave && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={showConfirmModal}
            onRequestClose={() => {
              setShowConfirmModal(false);
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                margin: 20,
                borderRadius: 20,
                padding: 35,
                elevation: 5,
              }}
            >
              <Text style={{ fontSize: 40, paddingBottom: 20 }}>
                Confirm Data
              </Text>
              <Text>
                Please double check the below data and hit confirm to save it.
              </Text>
              {Object.keys(JSON.parse(dataToSave.data)).map((key) => {
                return (
                  <Text>
                    {key}: {JSON.parse(dataToSave.data)[key]}
                  </Text>
                );
              })}
              <Text>
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  Location:
                </Text>{" "}
                [{dataToSave?.location?.latitude},{" "}
                {dataToSave?.location?.longitude}]
              </Text>
              <Text>
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  Timestamp:
                </Text>{" "}
                {new Date(dataToSave?.timestamp).toLocaleString()}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Pressable
                  style={{
                    marginTop: 20,
                    borderRadius: 20,
                    paddingVertical: 10,
                    paddingHorizontal: 30,
                    elevation: 2,
                    backgroundColor: "orange",
                  }}
                  onPress={async () => {
                    await saveToAsyncStorage(dataToSave, navigation);
                  }}
                >
                  <Text>Confirm</Text>
                </Pressable>
                <Pressable
                  style={{
                    marginTop: 20,
                    marginLeft: 20,
                    borderRadius: 20,
                    paddingVertical: 10,
                    paddingHorizontal: 30,
                    elevation: 2,
                    backgroundColor: "gray",
                  }}
                  onPress={() => {
                    setShowConfirmModal(false);
                  }}
                >
                  <Text>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </ScrollView>
  );
}

/* 
pH
hardness
hydrogen sulfide
iron
copper
lead
manganese
total chlorine
mercury
nitrate
nitrite
sulfate
zinc
flouride
sodium chloride
total alkalynity
*/
