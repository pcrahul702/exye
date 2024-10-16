import React from 'react';
import { View, SafeAreaView, StyleSheet, Image, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';



import failedIcon from '../assets/failedIcon.png';
import successIcon from '../assets/successIcon.png';

const transactions = [
    { id: '1', status: 0, date: '01/09/2024' },
    { id: '2', status: 1, date: '02/09/2024' },
    { id: '3', status: 1, date: '03/09/2024' },
    { id: '4', status: 0, date: '04/09/2024' },
    { id: '5', status: 0, date: '01/09/2024' },
    { id: '6', status: 1, date: '02/09/2024' },
    { id: '7', status: 1, date: '03/09/2024' },
    { id: '8', status: 0, date: '04/09/2024' },
    { id: '9', status: 0, date: '01/09/2024' },
    { id: '10', status: 1, date: '02/09/2024' },
    { id: '11', status: 1, date: '03/09/2024' },
    { id: '12', status: 0, date: '04/09/2024' },
];


function TransactionHistoryScreen() {
    const navigation = useNavigation();



    return (
        <View style={styles.container}>
            <Image source={require('../assets/uppershape2.png')} style={styles.uppershape} />
            <Image source={require('../assets/Group.png')} style={styles.backgroundImage} />
            <Image source={require('../assets/cardsLogo.png')} style={styles.upperLog} />

            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                {transactions.map((item) => {
                    const isSuccess = item.status === 1;
                    const textColor = isSuccess ? '#FFFFFF' : '#FF0000'; // White for success, Red for failure
                    const text = isSuccess ? 'transaction successful' : 'transaction failed';
                    const icon = isSuccess ? successIcon : failedIcon;

                    return (
                        <View key={item.id} style={styles.listItemContainer}>
                            <Image source={icon} style={styles.statusIcon} />
                            <View style={styles.transactionDetails}>
                                <Text style={[styles.statusText, { color: textColor }]}>
                                    {text}
                                </Text>
                                <Text style={styles.dateText}>
                                    {item.date}
                                </Text>
                            </View>
                        </View>
                    );
                })}
            </ScrollView>

            <Image
                source={require('../assets/BottomNav4.png')}
                resizeMode="contain"
                style={styles.bottomNav} />


            <View style={styles.bottomContainer}>
                <Image
                    source={require('../assets/leftArrowWhite.png')}
                    style={styles.arrowIcon}
                />
                <Text style={styles.bottomText}>Swipe to go back</Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    backgroundImage: {
        width: '100%',
        height: '80%',
        position: 'absolute',
        resizeMode: 'contain',
        top: 90,
        left: 0,
    },
    upperLog: {
        alignSelf: 'center',
        height: 120,
        width: 120,
        marginTop: 40,
    },
    uppershape: {
        position: 'absolute',
        top: 0,
        width: '100%',
        resizeMode: 'stretch',
    },
    bottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        bottom: 10,
        alignSelf: 'center'
    },
    arrowIcon: {
        width: 36,
        height: 36,
        marginRight: 10
    },
    bottomText: {
        fontSize: 31,
        fontWeight: '275',
        color: '#FFFFFF',
        textAlign: 'center',
        fontFamily: 'Poppins-Regular'
    },
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        resizeMode: 'stretch',
    },
    scrollViewContainer: {
        marginTop:20,
        width: '85%',
        borderRadius: 18,
        alignSelf: 'center',
        backgroundColor: '#D9D9D9',

        paddingVertical: 20,
        paddingHorizontal: 15,
        paddingBottom: 100,
    },
    listItemContainer: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    statusIcon: {
        width: 36,
        height: 36,
        marginRight: 15,
    },
    transactionDetails: {
        flex: 1,
    },
    statusText: {
        fontSize: 19,
        fontWeight: '275',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: -0.5, height: 0.5 },
        textShadowRadius: 3,
        fontFamily: 'Poppins-Regular'
    },
    dateText: {
        fontSize: 19,
        fontWeight: '275',
        color: '#FFFFFF',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: -0.5, height: 0.5 },
        textShadowRadius: 3,
        fontFamily: 'Poppins-Regular'
    },
});


export default TransactionHistoryScreen;
