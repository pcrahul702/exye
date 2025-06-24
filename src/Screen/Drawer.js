import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Linking,
} from 'react-native';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import {
    useFocusEffect,
    useNavigation,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from './HomeScreen';
import Profile from './ProfileScreen';
import Support from './SupportPage';
import Pavilion from './Pavilion';
import WalletPage from './WalletPage';
import { getData } from '../Utils/api';

const Drawer = createDrawerNavigator();

// 👇 CustomDrawer merged directly in this file
const CustomDrawer = (props) => {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(true);
    const [walletData, setWalletData] = useState([]);
     const [showPanModal, setShowPanModal] = useState(false);
      const [panCardUploaded, setPanCardUploaded] = useState(false);
    
    const navigation = useNavigation();

    useEffect(() => {
        const getNameFromStorage = async () => {
            try {
                let storedName = await AsyncStorage.getItem('name');
                while (storedName === null) {
                    storedName = await AsyncStorage.getItem('name');
                }
                setName(storedName || '');
                setLoading(false);
            } catch (error) {
                console.error('Error retrieving name:', error);
                setLoading(false);
            }
        };

        getNameFromStorage();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            getWalletData();
              getProfiledata();
        }, [])
    );

    const getWalletData = async () => {
        try {
            const res = await getData('/api/v1/profile/wallet');
            setWalletData(res?.data);
        } catch (error) {
            console.log('error', error);
            Alert.alert(error?.response?.data?.message || 'Error fetching wallet data');
        }
    };

    const getProfiledata = async () => {
        try {
          const response = await getData('/api/v1/profile');
    
          // Check if Pan Card is uploaded
          if (response.document?.panDetails?.panNumber) {
            setPanCardUploaded(true);
          } else {
            setPanCardUploaded(false);
          }
    
          console.log('response.data', response);
        } catch (error) {
          console.log('error', error);
          Alert.alert(error?.response?.data?.message);
        }
      };

    const handleWalletNavigation = () => {
        props.navigation.navigate('Wallet'); // 👈 NOT `useNavigation()`
      };

    const handleAddMoneyNavigation = () => {
        if (panCardUploaded) {
      navigation.navigate('AddMoneyLaunch');
    } else {
      setShowPanModal(true);
    }
    };

    const handleLogout = async () => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('name');
        console.log('Logged out');
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };



    if (loading) return null;

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: '#FFA952' }}>
                <ImageBackground backgroundColor="#FFA952" style={{ padding: 20 }}>
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
                            <Text style={styles.nameText}>
                                {name || 'User'}
                            </Text>
                            <Text style={styles.balanceText}>
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
                                style={styles.icon}
                            />
                            <Text style={styles.balanceButtonText}>My Balance</Text>
                            <Text style={styles.balanceButtonText2}>₹ {walletData.walletAmount || 0}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ zIndex: 0 }} onPress={handleAddMoneyNavigation}>
                        <View style={styles.addMoneyButton}>
                            <Text style={styles.addMoneyText}>Add Money</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10, paddingBottom: 80 }}>
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

              {showPanModal && (
                    <View
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 10,
                      }}>
                      <View
                        style={{
                          backgroundColor: 'white',
                          padding: 30,
                          borderRadius: 10,
                          alignItems: 'center',
                        }}>
                        <Text style={{fontSize: 18, color: 'black', marginBottom: 20}}>
                          Please Add your PAN Card
                        </Text>
                        <TouchableOpacity
                          onPress={() => setShowPanModal(false)}
                          style={{
                            backgroundColor: '#EF5A5A',
                            padding: 10,
                            borderRadius: 5,
                          }}>
                          <Text style={{color: 'white'}}>Close</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
        </View>
    );
};

// 👇 Main DrawerNavigator
export default function DrawerNavigator() {
    const openTermsAndConditions = () => {
        Linking.openURL('https://www.exye.in/terms-and-conditions').catch((err) =>
            console.error('An error occurred', err)
        );
    };

    const handleDeleteAccount = () => {
        Alert.alert(
            'Delete Account',
            'You will be redirected to the delete account page. Are you sure you want to continue?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Continue',
                    onPress: () => {
                        Linking.openURL('https://exye.in/delete-account').catch((err) =>
                            console.error('An error occurred', err)
                        );
                    },
                },
            ]
        );
    };

    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={{
                headerShown: false,
                drawerActiveBackgroundColor: '#FFA952',
                drawerActiveTintColor: '#FEFFDF',
                drawerInactiveTintColor: 'black',
                drawerStyle: {
                    height: '100%',
                    width: '85%',
                },
                drawerLabelStyle: {
                    marginLeft: -20,
                    fontFamily: 'Poppins-Regular',
                    fontSize: 15,
                    fontWeight: '600',
                },
            }}
        >
            <Drawer.Screen
                name="Dashboard"
                component={HomeScreen}
                options={{
                    drawerIcon: () => (
                        <Image source={require('../assets/home_icon.png')} style={styles.icon} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Profile"
                component={Profile}
                options={{
                    drawerIcon: () => (
                        <Image source={require('../assets/user_icon.png')} style={styles.icon} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Pavilion"
                component={Pavilion}
                options={{
                    drawerIcon: () => (
                        <Image source={require('../assets/pavilion_icon.png')} style={styles.icon} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Wallet"
                component={WalletPage}
                options={{
                    drawerIcon: () => (
                        <Image source={require('../assets/wallet_icon.png')} style={styles.icon} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Support"
                component={Support}
                options={{
                    drawerIcon: () => (
                        <Image source={require('../assets/support_icon.png')} style={styles.icon} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Delete Account"
                component={() => null}
                listeners={{
                    drawerItemPress: (e) => {
                        e.preventDefault();
                        handleDeleteAccount();
                    },
                }}
                options={{
                    drawerIcon: () => (
                        <Image source={require('../assets/logout_icon.png')} style={styles.icon} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Terms and Conditions"
                component={() => null}
                listeners={{
                    focus: openTermsAndConditions,
                }}
                options={{
                    drawerIcon: () => (
                        <Image source={require('../assets/tnc_icon.png')} style={styles.icon} />
                    ),
                }}
            />


            
        </Drawer.Navigator>
    );
}

// 👇 Shared styles
const styles = StyleSheet.create({
    nameText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Poppins-Regular',
        marginBottom: 5,
        fontWeight: '700',
    },
    balanceText: {
        fontSize: 16,
        color: '#fff',
        fontFamily: 'Poppins-Regular',
        marginRight: 5,
    },
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
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#FFA952',
        zIndex: 1000,
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
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
