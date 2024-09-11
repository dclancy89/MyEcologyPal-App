import { localApiKey } from "@/constants/Storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getApiKeyFromAsyncStorage = async (setStateCall: any) => {
  const storageData = await AsyncStorage.getItem(localApiKey);
  const parsedStorageData = storageData != null ? JSON.parse(storageData) : [];
  setStateCall(parsedStorageData.API_KEY);
};
