import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to store a reflection in AsyncStorage
export const storeReflection = async (reflection) => {
  try {
    const jsonValue = JSON.stringify(reflection);
    await AsyncStorage.setItem(`reflection_${reflection.id}`, jsonValue);
  } catch (e) {
    console.error("Error storing reflection:", e);
  }
};

// Function to retrieve a reflection from AsyncStorage by ID
export const getReflection = async (id) => {
  try {
    const jsonValue = await AsyncStorage.getItem(`reflection_${id}`);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Error reading reflection:", e);
  }
};

// Function to update an existing reflection in AsyncStorage
export const updateReflection = async (reflection) => {
  await storeReflection(reflection);
};

// Function to delete a reflection from AsyncStorage by ID
export const deleteReflection = async (id) => {
  try {
    await AsyncStorage.removeItem(`reflection_${id}`);
  } catch (e) {
    console.error("Error deleting reflection:", e);
  }
};

// Function to retrieve all reflections stored in AsyncStorage
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
