import AsyncStorage from "@react-native-async-storage/async-storage";
import { dataKey } from "@/constants/Storage";

export const saveToAsyncStorage = async (data: any, navigation: any) => {
  const storageData = await AsyncStorage.getItem(dataKey);
  const parsedStorageData = storageData != null ? JSON.parse(storageData) : [];
  try {
    await AsyncStorage.setItem(
      dataKey,
      JSON.stringify([...parsedStorageData, data])
    );
    alert("Data saved!");
    navigation.navigate("index");
  } catch (e) {
    alert("There was an error saving data. Please try again");
  }
};
