import { dataKey } from "@/constants/Storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getDataFromAsyncStorage = async (setStateCall: any) => {
  const storageData = await AsyncStorage.getItem(dataKey);
  const parsedStorageData = storageData != null ? JSON.parse(storageData) : [];
  setStateCall(parsedStorageData);
};
