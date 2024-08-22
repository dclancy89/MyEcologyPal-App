import {
  LocationContext,
  LocationContextType,
} from "@/contexts/LocationContext";
import { ThemeContext, ThemeContextType } from "@/contexts/ThemeContext";
import { ModeContext, ModeContextType, AppMode } from "@/contexts/ModeContext";
import { useContext, useEffect, useState } from "react";
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
import Geolocation from "react-native-geolocation-service";
import { TrailDamageCategory } from "@/enums/TrailDamageCategory.enum";
import { saveToAsyncStorage } from "@/utilities/saveToAsyncStorage";

export default function TrailDamage({ navigation }: any) {
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
    { label: "Overgrown Trail", value: "OT" },
    { label: "Blocked Trail", value: "BT" },
    { label: "Damaged Structure", value: "DS" },
    { label: "Ground Damage", value: "GD" },
  ];

  const recordData = async () => {
    setIsLoading(true);

    const data = {
      category: category,
      description: description,
      location: {},
      timestamp: Date.now(),
    };

    Geolocation.getCurrentPosition(
      async (position) => {
        data.location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        setDataToSave(data);
        setShowConfirmModal(true);

        setIsLoading(false);
      },
      (error) => {
        // See error code charts below.
        alert("Error determining Location. Please try again.");
        console.log(error.code, error.message);
        setIsLoading(false);
      },
      {
        accuracy: { android: "high" },
        enableHighAccuracy: true,
        timeout: 3000,
        maximumAge: 10000,
        forceRequestLocation: true,
      }
    );
  };

  return (
    <ScrollView style={styles.container} overScrollMode={"never"}>
      <View style={{ marginBottom: 20 }}>
        <Text>Current Location ID: {location.id}</Text>
        <Text>Current Mode: {mode}</Text>
      </View>
      <View style={{ marginBottom: 50 }}>
        <Text style={{ fontSize: 30 }}>Trail Damage</Text>
        <Text>Damage Type</Text>
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

        <Text>Description of Issue</Text>
        <TextInput
          multiline
          numberOfLines={5}
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
          onPress={async () => {
            recordData();
          }}
        />
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
                TrailDamageCategory[
                  dataToSave?.category as keyof typeof TrailDamageCategory
                ]
              }
            </Text>
            <Text>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                Description:
              </Text>{" "}
              {dataToSave?.description}
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
      </View>
    </ScrollView>
  );
}
