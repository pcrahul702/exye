import AsyncStorage from '@react-native-async-storage/async-storage';

async function getEmail() {
  try {
    const email = await AsyncStorage.getItem('email');
    if (email !== null) {
      return email;
    }
    return null;
  } catch (error) {
    console.error("Error retrieving email:", error);
    return null;
  }
}

export { getEmail };
