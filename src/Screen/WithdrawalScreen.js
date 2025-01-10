import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { getAccessToken } from '../Utils/getAccessToken';
import { getData, postData } from '../Utils/api';


function WithdrawalScreen() {

    const navigation = useNavigation();
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [walletData, setWalletData] = useState([]);

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

    const handleTrackPrev = () => {
        navigation.navigate('WithdrawalStatus');
    };

    const handleSubmit = () => {
        if (withdrawAmount) {
            handleWithdrawal(withdrawAmount);
        }
        else {
            Alert.alert("Enter amount to withdraw!");
        }
    }

    const handleWithdrawal = async () => {

        const token = await getAccessToken();
        console.log("Access Token: ", token);

        try {
            const data = await postData(`/api/v1/profile/wallet/withdraw-money?amount=${withdrawAmount}`,
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            console.log(data);
            Alert.alert("Withdrawal Request Placed Successfully.");
            getWalletData();

        } catch (error) {

            if (error.response) {
                const errorMessage = error.response.data.message || 'An error occurred';
                Alert.alert('Error', errorMessage); // Display error message from response
            } else {
                Alert.alert('Error', 'An unexpected error occurred');
            }
            console.error('Error during withdrawal:', error);
        }
    };


    return (
        <KeyboardAvoidingView style={styles.container}>
            <Image source={require('../assets/uppershape2.png')} style={styles.uppershape} />
            <Image source={require('../assets/Group.png')} style={styles.backgroundImage} />
            <Image source={require('../assets/referLogo.png')} style={styles.upperLog} />

            <ScrollView style={styles.scrollContainer}>
                <View style={styles.content}>

                    <Image source={require('../assets/addBG.png')} style={styles.backgroundImageInContent} resizeMode='contain' />
                    <Text style={styles.text1}>Current Balance :</Text>
                    <Text style={styles.text2}>₹ {walletData.walletAmount || 0}</Text>
                    <Text style={styles.text3}>Amount to be Withdrawn :</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter amount"
                        keyboardType="numeric"
                        value={withdrawAmount}
                        onChangeText={setWithdrawAmount}
                    />
                    <Text style={styles.additionalText}>Your request is successfully processed</Text>

                    <TouchableOpacity style={styles.submitButton}
                        onPress={handleSubmit}>
                        <Text style={styles.submitText}>Submit</Text>
                    </TouchableOpacity>

                </View>

                <TouchableOpacity style={styles.prevReqButton} onPress={handleTrackPrev}>
                    <Text style={styles.prevReqText}>Track previous transactions</Text>
                </TouchableOpacity>

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



        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    backgroundImage: {
        width: '100%',
        height: '80%',
        position: 'absolute',
        resizeMode: 'contain',
        top: 90,
        left: 0,
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    upperLog: {
        alignSelf: 'center',
        height: 120,
        width: 120,
        // Use marginTop to move the image down
        marginTop: 40, // Adjust this value as needed
    },
    uppershape: {
        position: 'absolute',
        top: 0,
        width: '100%',
        resizeMode: 'stretch',
    },
    scrollContainer: {
        marginTop: 20
    },
    content: {
        alignSelf: 'center',
        borderRadius: 20,
        width: '90%',
        height: 'auto',
        backgroundColor: '#D9D9D9',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
    },
    backgroundImageInContent: {
        alignSelf: 'center',
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        resizeMode: 'stretch',
        opacity: 0.3,
        marginTop: 100,
        marginBottom: 100
    },
    text1: {
        fontSize: 24,
        color: 'white',
        fontWeight: '400',
        marginTop: 30,
        fontFamily: 'Poppins-Regular',
        width: '100%',
        textAlign: 'center',
        fontFamily: 'Poppins-Regular',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 6,
    },
    text2: {
        fontSize: 30,
        color: 'white',
        fontWeight: '700',
        marginTop: 15,
        fontFamily: 'Poppins-Regular',
        width: '100%',
        textAlign: 'center',
        fontFamily: 'Poppins-Regular',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 8,
    },
    text3: {
        fontSize: 24,
        color: 'white',
        fontWeight: '400',
        marginTop: 10,
        fontFamily: 'Poppins-Regular',
        width: '100%',
        textAlign: 'center',
        fontFamily: 'Poppins-Regular',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 6,
    },
    input: {
        width: '60%',
        height: 70,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 16,
        paddingHorizontal: 10,
        marginVertical: 20,
        backgroundColor: 'white',
        fontSize: 20,
        color: 'black',
        fontFamily: 'Poppins-Regular',
    },
    additionalText: {
        fontSize: 20,
        fontWeight: '400',
        color: '#333',
        marginVertical: 10,
        color: '#43A363',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -0.5, height: 0.5 },
        textShadowRadius: 3,
        fontFamily: 'Poppins-Regular'
    },
    submitButton: {
        width: '60%',
        height: 'auto',
        alignSelf: 'center',
        borderRadius: 40,
        margin: 20,
        borderColor: 'white',
        borderWidth: 3,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: 'green',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    submitText: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Poppins-Regular'
    },
    prevReqButton: {
        width: '90%',
        height: 'auto',
        alignSelf: 'center',
        borderRadius: 18,
        margin: 20,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#FFA952',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        marginBottom: 100,
    },
    prevReqText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '700',
        fontFamily: 'Poppins-Regular'
    },
    bottomNav: {
        height: '10%',
        position: 'absolute',
        bottom: 0,
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
        width: 26,
        height: 26,
        marginRight: 10
    },
    bottomText: {
        fontSize: 24,
        fontWeight: '275',
        color: '#FFFFFF',
        textAlign: 'center',
        bottom: 0,
        fontFamily: 'Poppins-Regular'
    },
});


export default WithdrawalScreen;
