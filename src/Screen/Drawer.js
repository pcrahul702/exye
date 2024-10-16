import { Image, StyleSheet, Text } from 'react-native';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from './HomeScreen';
import Pavilion from './Pavilion';
import Profile from './Profile1Screen';
import Wallet from './WalletPage';
import Login from './LoginScreen';
import CustomDrawer from '../components/CustomDrawer';
import LinearGradient from 'react-native-linear-gradient';
const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
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
                component={Wallet}
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
                name="Log Out"
                component={Login}
                options={{
                    headerShown: false,
                    drawerIcon: ({ color }) => (
                        <Image
                            source={require('../assets/logout_icon.png')}
                            style={{ width: 22, height: 22, tintColor: 'black', resizeMode: 'contain' }} // tintColor applies the color to the image
                        />
                    ),
                }}
            />
        </Drawer.Navigator>

    );
}

const styles = StyleSheet.create({});