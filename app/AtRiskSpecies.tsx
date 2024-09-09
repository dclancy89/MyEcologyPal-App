import {
  LocationContext,
  LocationContextType,
} from "@/contexts/LocationContext";
import { ThemeContext, ThemeContextType } from "@/contexts/ThemeContext";
import { ModeContext, ModeContextType, AppMode } from "@/contexts/ModeContext";
import { useContext, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Modal,
  Pressable,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { generateMetaData } from "@/utilities/generateMetaData";
import { DataTemplateType } from "@/enums/DataTemplateType.enum";
import { saveToAsyncStorage } from "@/utilities/saveToAsyncStorage";
import { InvasiveSpeciesCategory } from "@/enums/InvasiveSpeciesCategory.enum";

export default function AtRiskSpecies({ navigation }: any) {
  const { location } = useContext(LocationContext) as LocationContextType;
  const { theme } = useContext(ThemeContext) as ThemeContextType;
  const { mode } = useContext(ModeContext) as ModeContextType;

  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dataToSave, setDataToSave] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

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

  const dropdownOptions = [
    { label: "Plant", value: "plant" },
    { label: "Animal", value: "animal" },
  ];

  return (
    <ScrollView style={styles.container} overScrollMode={"never"}>
      <View style={{ marginBottom: 20 }}>
        <Text>Current Location ID: {location.id}</Text>
        <Text>Current Mode: {mode}</Text>
      </View>
      <View style={{ marginBottom: 50 }}>
        <Text style={{ fontSize: 30 }}>At Risk Species</Text>
        <Text>Category</Text>
        <Dropdown
          style={styles.dropdown}
          data={dropdownOptions}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select item"
          value={category}
          onChange={(item) => {
            setCategory(item.value);
          }}
        />

        <Text>Species (or common name)</Text>
        <TextInput
          style={styles.inputLast}
          onChange={(e) => {
            setDescription(e.nativeEvent.text);
          }}
        />
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
              { category: category, description: description },
              location.id,
              DataTemplateType.AtRiskSpecies,
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
              <Text>
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  Category:
                </Text>{" "}
                {
                  InvasiveSpeciesCategory[
                    JSON.parse(dataToSave?.data)
                      .category as keyof typeof InvasiveSpeciesCategory
                  ]
                }
              </Text>
              <Text>
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  Description:
                </Text>{" "}
                {JSON.parse(dataToSave?.data).description}
              </Text>
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
