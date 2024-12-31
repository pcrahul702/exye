import React from 'react';
import { View, SafeAreaView, StyleSheet, Image, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { getAccessToken } from '../Utils/getAccessToken';
import { postData } from '../Utils/api';



function PaymentScreen() {

    const route = useRoute();
    const { addAmount } = route.params;

    const navigation = useNavigation();

    const initiatePayment = async () => {

        const token = await getAccessToken();
        console.log("Access Token: ", token);

        try {
            const data = await postData(`/api/v1/payment/initiate?amount=${addAmount}`,
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            console.log(data);

            const paymentId = data.paymentId;
            merchantTransactionId = data.merchantTransactionId;
            console.log("pid: " + paymentId);
            console.log("mtid: " + merchantTransactionId);

            verifyPayment(paymentId, merchantTransactionId);

        } catch (error) {

            if (error.response) {
                const errorMessage = error.response.data.message || 'An error occurred';
                Alert.alert('Error', errorMessage); // Display error message from response
            } else {
                Alert.alert('Error', 'An unexpected error occurred');
            }
            console.error('Error during initiating payment:', error);
        }
    };

    const verifyPayment = async (paymentId, merchantTransactionId) => {
        const token = await getAccessToken();

        try {
            const data = await postData('/api/v1/payment/verify',
                {
                    paymentId,   
                    merchantTransactionId
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,  // Adding the token to the header for authorization
                    },
                }
            );

            console.log('Payment verification data: ', data);

            addMoneyToWallet(paymentId);


        } catch (error) {
            if (error.response) {
                const errorMessage = error.response.data.message || 'An error occurred';
                Alert.alert('Error', errorMessage);  // Display error message from the response
            } else {
                Alert.alert('Error', 'An unexpected error occurred');
            }
            console.error('Error during payment verification:', error);
        }
    };

    const addMoneyToWallet = async (paymentId) => {
        const token = await getAccessToken();

        try {
            const data = await postData('/api/v1/profile/wallet/add-money',
                {
                    amount:addAmount,
                    currency : "INR",
                    paymentDetailsId : paymentId,
                    status : "SUCCESS"
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,  // Adding the token to the header for authorization
                    },
                }
            );

            console.log('Addmoney to wallet data: ', data);
            
            Alert.alert("₹ "+addAmount+" added to your wallet successfully!");
            navigation.navigate('Wallet');


        } catch (error) {
            if (error.response) {
                const errorMessage = error.response.data.message || 'An error occurred';
                Alert.alert('Error', errorMessage);  // Display error message from the response
            } else {
                Alert.alert('Error', 'An unexpected error occurred');
            }
            console.error('Error during payment verification:', error);
        }
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

                <View style={styles.customContainer}>

                    <TouchableOpacity onPress={initiatePayment}>
                        <Image source={require('../assets/debitCardIcon.png')} style={styles.smallIcon} />
                        <Text style={styles.iconText}>add card/remove card</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={initiatePayment}>
                        <Image source={require('../assets/googlePayIcon.png')} style={styles.smallIcon} />
                        <Text style={styles.iconText}>google pay</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={initiatePayment}>
                        <Image source={require('../assets/paytmIcon.png')} style={styles.smallIcon} />
                        <Text style={styles.iconText}>paytm</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={initiatePayment}>
                        <Image source={require('../assets/bhimIcon.png')} style={styles.smallIcon} />
                        <Text style={styles.iconText}>other UPI methods</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={initiatePayment}>
                        <Image source={require('../assets/netBankingIcon.png')} style={styles.smallIcon} />
                        <Text style={styles.iconText}>net banking</Text>
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
    customContainer: {
        alignSelf: 'center',
        position: 'relative',
        marginBottom: 50,
        width: '85%',
        height: 'auto',
        borderWidth: 2,
        borderColor: 'rgba(217, 217, 217, 1)',
        borderRadius: 10,
        backgroundColor: 'rgba(217, 217, 217, 1)',
        zIndex: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5, // For Android
        paddingBottom: 20
    },
    smallIcon: {
        width: 50,
        height: 62,
        left: 35,
        top: 25,
        resizeMode: 'contain',
    },
    iconText: {
        color: 'white',
        marginTop: 5,
        fontSize: 15,
        fontWeight: '400',
        left: 95,
        bottom: 20,
        zIndex: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        fontFamily: 'Poppins-Regular'
    },
});


export default PaymentScreen;
