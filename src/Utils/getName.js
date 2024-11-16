import AsyncStorage from '@react-native-async-storage/async-storage';

async function getName() {
  try {
    const name = await AsyncStorage.getItem('name');
    if (name !== null) {
      // Name exists
      return name;
    }
    // Name does not exist
    return null;
  } catch (error) {
    console.error("Error retrieving name:", error);
    return null;
  }
}

export { getName };
