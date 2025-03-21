import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, TextInput, Alert, Modal } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';



function PaymentSummaryScreen() {

    const route = useRoute();
    const { addAmount } = route.params;
    const serviceCharge = parseFloat((addAmount * 0.02).toFixed(2));
    const gst = parseFloat((addAmount * 0.18).toFixed(2));


    const netPayable = addAmount + serviceCharge + gst;


    const navigation = useNavigation();

    const handleConfirmPress = () => {
        navigation.navigate('UPI', { netPayable });
    };


    return (
        <View style={styles.container}>
            <Image source={require('../assets/uppershape2.png')} style={styles.uppershape} />
            <Image source={require('../assets/Group.png')} style={styles.backgroundImage} />
            <Image source={require('../assets/cardsLogo.png')} style={styles.upperLog} />

            <Image
                source={require('../assets/BottomNav3.png')}
                resizeMode="contain"
                style={styles.bottomNav} />

            <ScrollView style={styles.scrollContainer}>
                {/* Total amount section */}
                <View style={styles.amountSummaryContainer}>

                    <Text style={styles.headingText}>Total amount:</Text>

                    {/* Tabular details (Wallet top-up, service charge, GST) */}
                    <View style={styles.amountRow}>
                        <Text style={styles.amountLabel}>Wallet Top-Up</Text>
                        <Text style={styles.amountValue}>₹ {addAmount}</Text>
                    </View>
                    <View style={styles.amountRow}>
                        <Text style={styles.amountLabel}>Service Charge 2%</Text>
                        <Text style={styles.amountValue}>₹ {serviceCharge}</Text>
                    </View>
                    <View style={styles.amountRow}>
                        <Text style={styles.amountLabel}>GST 18%</Text>
                        <Text style={styles.amountValue}>₹ {gst}</Text>
                    </View>


                    <Text style={styles.headingText}>You are paying :</Text>
                    <Text style={styles.netPayableStyle}>₹ {netPayable}</Text>

                    <TouchableOpacity style={styles.confirmButton}
                        onPress={handleConfirmPress}>
                        <Text style={styles.confirmText}>Confirm</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>



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
    scrollContainer: {
        marginTop: 20,
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
        marginTop: '15%',
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
    amountSummaryContainer: {
        backgroundColor: '#3DC467',
        borderRadius: 18,
        padding: 15,
        marginTop: 20,
        marginHorizontal: 20,
    },
    headingText: {
        fontSize: 20,
        fontWeight: '700',
        alignSelf: 'center',
        color: '#FFFFFF',
        marginBottom: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    amountRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    amountLabel: {
        fontSize: 15,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    amountValue: {
        fontSize: 16,
        color: '#FFFFFF',
        marginRight: 16,
        backgroundColor: '#FEE79933',
        borderRadius: 20,
        padding: 5,
        paddingHorizontal: 10,
    },
    netPayableStyle: {
        fontSize: 20,
        color: 'white',
        fontWeight: '700',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
        backgroundColor: '#FEE79933',
        width: 'auto',
        alignSelf: 'center',
        padding: 8,
        borderRadius: 20,
        marginTop: 12,
        borderWidth: 0.25,
        borderColor: 'black',
    },
    confirmButton: {
        backgroundColor: '#3dc467',
        alignSelf: 'center',
        borderRadius: 40,
        margin: 20,
        borderColor: '#FEE799',
        borderWidth: 2,
        alignItems: 'center',
        paddingHorizontal: 8,
        shadowColor: 'black',
        shadowOffset: { width: 3, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 5,
    },
    confirmText: {
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: '900',
        fontFamily: 'Poppins-Regular',
        padding: 10,
    },
});


export default PaymentSummaryScreen;
