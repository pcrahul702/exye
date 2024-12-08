import AsyncStorage from '@react-native-async-storage/async-storage';

async function getPhoneNo() {
  try {
    const phoneNo = await AsyncStorage.getItem('phoneNo');
    if (phoneNo !== null) {
      return phoneNo;
    }
    return null;
  } catch (error) {
    console.error("Error retrieving phoneNo:", error);
    return null;
  }
}

export { getPhoneNo };
