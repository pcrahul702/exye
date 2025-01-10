import { Image, Linking, StyleSheet, Text } from 'react-native';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from './HomeScreen';
import Profile from './ProfileScreen';
import Support from './SupportPage';

import CustomDrawer from '../components/CustomDrawer';
import Pavilion from './Pavilion';
import WalletPage from './WalletPage';



const Drawer = createDrawerNavigator();

export default function DrawerNavigator({navigation}) {

    const openTermsAndConditions = () => {

        Linking.openURL('https://www.exye.in/terms-and-conditions') // Replace with your actual URL
            .catch(err => console.error('An error occurred', err));

    };

    return (
        <Drawer.Navigator
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                headerShown: false,
                drawerActiveBackgroundColor: '#FFA952',
                drawerActiveTintColor: '#FEFFDF',
                drawerInactiveTintColor: 'black',
                drawerStyle: {
                    height: '100%',
                    width: '85%'
                },
                drawerLabelStyle: { marginLeft: -20, fontFamily: 'Poppins-Regular', fontSize: 15, fontWeight: '600' },

            }}
        >
            <Drawer.Screen
                name="Dashboard"
                component={HomeScreen}
                options={{
                    headerShown: false,
                    drawerIcon: ({ color }) => (
                        <Image
                            source={require('../assets/home_icon.png')}
                            style={{ width: 22, height: 22, tintColor: 'black', resizeMode: 'contain' }} // tintColor applies the color to the image
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name="Profile"
                component={Profile}
                options={{
                    headerShown: false,
                    drawerIcon: ({ color }) => (
                        <Image
                            source={require('../assets/user_icon.png')}
                            style={{ width: 22, height: 22, tintColor: 'black', resizeMode: 'contain' }} // tintColor applies the color to the image
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name="Pavilion"
                component={Pavilion}
                options={{
                    headerShown: false,
                    drawerIcon: ({ color }) => (
                        <Image
                            source={require('../assets/pavilion_icon.png')}
                            style={{ width: 22, height: 22, tintColor: 'black', resizeMode: 'contain' }} // tintColor applies the color to the image
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name="Wallet"
                component={WalletPage}
                options={{
                    headerShown: false,
                    drawerIcon: ({ color }) => (
                        <Image
                            source={require('../assets/wallet_icon.png')}
                            style={{ width: 22, height: 22, tintColor: 'black', resizeMode: 'contain' }} // tintColor applies the color to the image
                        />
                    ),
                }}
            />

            <Drawer.Screen
                name="Support"
                component={Support}
                options={{
                    headerShown: false,
                    drawerIcon: ({ color }) => (
                        <Image
                            source={require('../assets/support_icon.png')}
                            style={{ width: 22, height: 22, tintColor: 'black', resizeMode: 'contain' }} // tintColor applies the color to the image
                        />
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
                    headerShown: false,
                    drawerIcon: ({ color }) => (
                        <Image
                            source={require('../assets/tnc_icon.png')}
                            style={{ width: 22, height: 22, tintColor: 'black', resizeMode: 'contain' }} // tintColor applies the color to the image
                        />
                    ),
                }}
            />


        </Drawer.Navigator>

    );
}

const styles = StyleSheet.create({});