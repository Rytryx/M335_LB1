import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeReflection = async (reflection) => {
  try {
    const jsonValue = JSON.stringify(reflection);
    await AsyncStorage.setItem(`reflection_${reflection.id}`, jsonValue);
  } catch (e) {
    console.error("Error storing reflection:", e);
  }
};

export const getReflection = async (id) => {
  try {
    const jsonValue = await AsyncStorage.getItem(`reflection_${id}`);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Error reading reflection:", e);
  }
};

export const updateReflection = async (reflection) => {
  await storeReflection(reflection);
};

export const deleteReflection = async (id) => {
  try {
    await AsyncStorage.removeItem(`reflection_${id}`);
  } catch (e) {
    console.error("Error deleting reflection:", e);
  }
};

export const getAllReflections = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const reflectionKeys = keys.filter(key => key.startsWith('reflection_'));
    const reflectionValues = await AsyncStorage.multiGet(reflectionKeys);
    return reflectionValues.map(([key, value]) => JSON.parse(value));
  } catch (e) {
    console.error("Error retrieving all reflections:", e);
  }
};
