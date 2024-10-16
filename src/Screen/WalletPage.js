import React from 'react';
import { View, SafeAreaView, StyleSheet, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import backgroundImage from '../assets/Group.png';
import uppershape from '../assets/uppershape.png';
import upperLog from '../assets/Upperlogo.png';
import addmoney from '../assets/addmoney.png';
import refericon from '../assets/refericon.png';
import withdrawicon from '../assets/withdrawicon.png';
import transitionhistory from '../assets/transitionhistory.png';

function WalletPage() {
    const navigation = useNavigation();

    const handleHomeNavigation = () => {
        navigation.navigate('Dashboard');
    };

    const handlePavilionNavigation = () => {
        navigation.navigate('Pavilion');
    };

    const handleAddMoneyNavigation = () => {
        navigation.navigate('AddMoney');
    };

    const handlePaymentNavigation = () => {
        navigation.navigate('Payment');
    };

    const handleTransactionHistoryNavigation = () => {
        navigation.navigate('TransactionHistory');
    };

    const handleReferNavigation = () => {
        navigation.navigate('Refer');
    };

    const handleWithdrawNavigation = () => {
        navigation.navigate('Withdraw');
    };

    return (
        <SafeAreaView style={styles.container}>
            <Image source={backgroundImage} style={styles.backgroundImage} />
            <Image source={uppershape} style={styles.uppershape} />
            <Image source={upperLog} style={styles.upperLog} />

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.miniContainer}>
                    <Text style={styles.miniText}>Current Balance:</Text>
                    <Text style={styles.miniTextRupp}>₹ 108</Text>
                </View>

                <View style={styles.customContainer}>
                    <TouchableOpacity onPress={handleAddMoneyNavigation} style={styles.touchableIcon}>
                        <Image source={addmoney} style={styles.smallIcon} />
                        <Text style={styles.iconText}>Add Money</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleTransactionHistoryNavigation} style={styles.touchableIcon}>
                        <Image source={transitionhistory} style={styles.smallIcon} />
                        <Text style={styles.iconText}>Transaction History</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleWithdrawNavigation} style={styles.touchableIcon}>
                        <Image source={withdrawicon} style={styles.smallIcon} />
                        <Text style={styles.iconText}>Withdraw</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleReferNavigation} style={styles.touchableIcon}>
                        <Image source={refericon} style={styles.smallIcon} />
                        <Text style={styles.iconText}>Refer and Earn</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <TouchableOpacity onPress={handleHomeNavigation} style={styles.xyz}>
                <Image source={require("../assets/unfilledHome.png")} style={styles.bottomNavIcons} />
            </TouchableOpacity>
            <TouchableOpacity  style={styles.WalletIcon}>
                <Image source={require("../assets/filledWallet.png")} style={styles.bottomNavIcons} />
            </TouchableOpacity>
            <TouchableOpacity  onPress={handlePavilionNavigation} style={styles.NotificationIcon}>
                <Image source={require("../assets/notification.png")} style={styles.bottomNavIcons} />
            </TouchableOpacity>
            <Image
                source={require('../assets/BottomNav.png')}
                style={styles.bottomNav} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        width: '100%',
        height: '80%',
        position: 'absolute',
        resizeMode: 'contain',
        top: 0,
        left: 0,
    },
    uppershape: {
        top: 0,
        width: '100%',
        resizeMode: 'stretch',
    },
    upperLog: {
        alignSelf: 'center',
        top: -50,
        height: 100,
        width: 100,
    },
    scrollContainer: {
        paddingBottom: 120, // Ensure space for the bottom navigation
    },
    miniContainer: {
        width: '60%',
        alignSelf: 'center',
        marginHorizontal: 20,
        padding: 15,
        borderWidth: 3.95,
        borderColor: 'rgba(239, 90, 90, 1)',
        borderRadius: 30,
        backgroundColor: 'rgba(255, 169, 82, 1)',
        alignItems: 'center',
    },
    miniText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 20,
        fontFamily: 'Poppins-Regular',
    },
    miniTextRupp: {
        color: 'white',
        fontWeight: '700',
        fontSize: 20,
        fontFamily: 'Poppins-Regular',
    },
    customContainer: {
        width: '90%',
        alignSelf: 'center',
        marginHorizontal: 20,
        marginTop: 40,
        padding: 10,
        backgroundColor: 'rgba(217, 217, 217, 1)',
        borderWidth: 2,
        borderColor: 'rgba(217, 217, 217, 1)',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    touchableIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    smallIcon: {
        width: 37,
        height: 35,
        marginRight: 20,
        resizeMode: 'contain',
    },
    iconText: {
        color: 'black',
        fontSize: 22,
        fontFamily: 'Poppins-Regular',
    },

    bottomNav: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: 90,
    },
    xyz: {
      position: 'absolute',
      bottom: 0,
      zIndex: 1,
      height: 70,
      width: 70,
      left: '35%',
    },
    WalletIcon: {
      position: 'absolute',
      bottom: 0,
      zIndex: 1,
      height: 70,
      width: 70,
      left: '1%',
    },
    NotificationIcon: {
      position: 'absolute',
      bottom: 0,
      zIndex: 1,
      height: 70,
      width: 70,
      right: '10%',
    },
    bottomNavIcons: {
      position: 'absolute',
      bottom: 0,
      zIndex: 1,
      height: 70,
      width: 70,
      left: '40%',
    },
});

export default WalletPage;
