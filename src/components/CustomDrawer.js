import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getData } from '../Utils/api';

const CustomDrawer = (props) => {
  const [name, setName] = useState('');  // State to store the name
  const [loading, setLoading] = useState(true);
  const [walletData, setWalletData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const getNameFromStorage = async () => {
      try {
        let storedName = await AsyncStorage.getItem('name');

        while (storedName === null) {
          storedName = await AsyncStorage.getItem('name');
        }

        setName(storedName || '');  // Set the name from storage (or default to empty)
        setLoading(false);  // Set loading to false once the name is fetched
      } catch (error) {
        console.error('Error retrieving name:', error);
        setLoading(false);  // Set loading to false if there is an error
      }
    };

    getNameFromStorage();
  }, []);  // Empty dependency array to run once when the component mounts

  useFocusEffect(
    React.useCallback(() => {
      getWalletData();
    }, [])
  );

  const getWalletData = async () => {
    try {
      const res = await getData('/api/v1/profile/wallet');

      setWalletData(res?.data);

    } catch (error) {
      console.log('error', error);
      Alert.alert(error?.response?.data?.message);
    }
  };

  const handleWalletNavigation = () => {
    navigation.navigate('Wallet');  // Navigate to the Wallet screen
  };

  const handleAddMoneyNavigation = () => {
    navigation.navigate('AddMoney');
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('name');
    console.log("Logged out");
    // Navigate to Login screen
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  if (loading) {
    return null;  // Don't render the drawer until the name is fetched
  }

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: '#FFA952' }}>
        <ImageBackground
          backgroundColor='#FFA952'
          style={{ padding: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={require('../assets/profile_icon.png')}
              style={{
                height: 80,
                width: 80,
                borderRadius: 40,
                marginBottom: 10,
              }}
            />
            <View style={{ marginLeft: 12 }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 18,
                  fontFamily: 'Poppins-Regular',
                  marginBottom: 5,
                  fontWeight: '700',
                }}>
                {name || 'User'}  {/* Display name or fallback to 'User' */}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: '#fff',
                  fontFamily: 'Poppins-Regular',
                  marginRight: 5,
                }}>
                Balance: ₹ {walletData.walletAmount || 0}
              </Text>
            </View>
          </View>
        </ImageBackground>

        <View style={{ paddingHorizontal: 18, marginBottom: 18 }}>
          <TouchableOpacity style={{ zIndex: 1 }} onPress={handleWalletNavigation}>
            <View style={styles.balanceButton}>
              <Image
                source={require('../assets/wallet_icon.png')}
                style={{
                  width: 22,
                  height: 22,
                  tintColor: 'black',
                  resizeMode: 'contain',
                }}
              />
              <Text style={styles.balanceButtonText}>My Balance</Text>
              <Text style={styles.balanceButtonText2}>₹ {walletData.walletAmount || 0}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginTop: 0, zIndex: 0 }}
            onPress={handleAddMoneyNavigation}>
            <View style={styles.addMoneyButton}>
              <Text style={styles.addMoneyText}>Add Money</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Image
          source={require('../assets/logout_icon.png')}
          style={styles.icon}
        />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  balanceButton: {
    alignSelf: 'center',
    width: '100%',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Poppins-Regular',
    marginLeft: 10,
    flex: 1,
  },
  balanceButtonText2: {
    color: 'black',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Poppins-Regular',
  },
  addMoneyButton: {
    alignSelf: 'center',
    width: '96%',
    backgroundColor: '#f0ffe2',
    padding: 10,
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5,
    borderTopWidth: 0,
    borderWidth: 1,
    borderColor: 'gray',
    alignItems: 'center',
  },
  addMoneyText: {
    color: '#164928',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Poppins-Regular',
    alignSelf: 'center',
  },
  logoutButton: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFA952',
  },
  logoutText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
    marginLeft: 10,
  },
  icon: {
    width: 22,
    height: 22,
    tintColor: 'black',
    resizeMode: 'contain',
  },
});

export default CustomDrawer;
