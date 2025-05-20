import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, Linking, ToastAndroid } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';
import { ScrollView } from 'react-native-gesture-handler';
import { postData } from '../Utils/api';
import Toast from 'react-native-toast-message';



function PaymentSummaryScreen() {

    const route = useRoute();
    const { addAmount } = route.params;
    const serviceCharge = parseFloat((addAmount * 0.02).toFixed(2));
    const gst = parseFloat((addAmount * 0.18).toFixed(2));


    const netPayable = addAmount + serviceCharge + gst;


    const navigation = useNavigation();

    const handleConfirmPress = async () => {

        const payload = {
            amount: netPayable,
            note: "Game play",
            upiId: "rishabh@ybl"
        };

        console.log("payload data", payload);

        try {
            const data = await postData('/api/v1/payment/manual', payload);
            console.log(data);

            const paymentUrl = data.paymentUrl;

            console.log(paymentUrl);
            Linking.openURL(paymentUrl).catch(err => console.error("Failed to open URL:", err));

            navigation.navigate('TransactionID', { paymentId: data.paymentId });

        } catch (error) {
            console.error('Error during payment initiation:', error);
            showToast('error', 'Payment could not be initiated. Try again.')
        }

    };

    const handlePaidPress = async () => {


        const payload = {
            amount: netPayable,
            note: "Game play",
            upiId: "rishabh@ybl"
        };

        console.log("payload data", payload);

        try {
            const data = await postData('/api/v1/payment/manual', payload);
            console.log(data);


            navigation.navigate('TransactionID', { paymentId: data.paymentId });

        } catch (error) {
            console.error('Error during payment initiation:', error);
            showToast('error', 'Payment could not be initiated. Try again.')
        }

    };
    const handleCopy = () => {

        Clipboard.setString('vyapar.173575993339@hdfcbank');
        ToastAndroid.show('UPI ID copied', ToastAndroid.SHORT);

    };

    const showToast = (type, message1, message2 = '') => {
        Toast.show({
            type: type,
            position: 'bottom',
            text1: message1,
            text2: message2,
            visibilityTime: 3000, // How long the toast is visible
            autoHide: true, // Hide after time
        });
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


                    <Text style={styles.headingText}>Pay ₹ {netPayable} on following UPI ID</Text>


                    <TouchableOpacity
                        onPress={handleCopy}>
                        <Text style={styles.netPayableStyle}>vyapar.173575993339@hdfcbank</Text>
                    </TouchableOpacity>

                    {/* <TouchableOpacity style={styles.confirmButton}
                        onPress={handleConfirmPress}>
                        <Text style={styles.confirmText}>Confirm</Text>
                    </TouchableOpacity> */}

                    <TouchableOpacity style={styles.confirmButton}
                        onPress={handlePaidPress}>
                        <Text style={styles.confirmText}>Click after the Payment</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>



           <TouchableOpacity
             style={styles.bottomContainer}
             onPress={() => navigation.goBack()}
           >
                               <Image source={require('../assets/leftArrowWhite.png')} style={styles.arrowIcon} />
                           <Text style={styles.bottomText}>Swipe to go back</Text>
           </TouchableOpacity>

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
        fontSize: 16,
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
        fontSize: 20,
        alignSelf:'center',
        textAlign:'center',
        fontWeight: '900',
        fontFamily: 'Poppins-Regular',
        padding: 10,
    },
});


export default PaymentSummaryScreen;
