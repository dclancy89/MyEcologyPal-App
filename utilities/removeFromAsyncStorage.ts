import { dataKey } from "@/constants/Storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const removeFromAsyncStorage = async () => {
  try {
    await AsyncStorage.removeItem(dataKey);
  } catch (e) {
    alert("There was an error clearing async storage.");
  }
};
