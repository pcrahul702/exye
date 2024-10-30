import AsyncStorage from '@react-native-async-storage/async-storage';

async function getAccessToken() {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token !== null) {
      // Token exists
      return token;
    }
    // Token does not exist
    return null;
  } catch (error) {
    console.error("Error retrieving access token:", error);
    return null;
  }
}
export {getAccessToken}