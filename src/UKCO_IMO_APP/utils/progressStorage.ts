import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "QUIZ_PROGRESS";

export const saveProgress = async (data: any) => {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(data));
  } catch {}
};

export const loadProgress = async () => {
  try {
    const data = await AsyncStorage.getItem(KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};