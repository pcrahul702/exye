import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, Image, Text, TouchableOpacity, TextInput, ScrollView, Dimensions, KeyboardAvoidingView, Alert } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getData } from '../Utils/api';

const { width, height } = Dimensions.get('window');


function AddMoneyScreen() {

    const navigation = useNavigation();
    const [walletData, setWalletData] = useState([]);
    const [addAmount, setAddAmount] = useState('');

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

    const handleProceedClick = () => {
        if (addAmount){
            handlePaymentNavigation(addAmount);
        }
        else{
            Alert.alert("Enter amount to add!");
        }
    }

    const handlePaymentNavigation = (addAmount) => {
        navigation.navigate('Payment', { addAmount });
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Image source={require('../assets/uppershape2.png')} style={styles.uppershape} />
            <Image source={require('../assets/Group.png')} style={styles.backgroundImage} />
            <Image source={require('../assets/addMoneyLogo.png')} style={styles.upperLog} />

            <ScrollView>
                <View style={styles.content}>

                    <Image source={require('../assets/addBG.png')} style={styles.backgroundImageInContent} resizeMode='contain' />
                    <Text style={styles.text1}>Current Balance :</Text>
                    <Text style={styles.text2}>₹ {walletData.walletAmount || 0}</Text>
                    <Text style={styles.text3}>Amount to be added :</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter amount"
                        keyboardType="numeric"
                        value={addAmount}
                        onChangeText={setAddAmount}
                    />
                    <Text style={styles.additionalText}>Or click at any button below :</Text>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handlePaymentNavigation('100')}>
                            <Text style={styles.buttonText}>₹ 100</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handlePaymentNavigation('200')}>
                            <Text style={styles.buttonText}>₹ 200</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity onPress={handleProceedClick}>
                    <Image source={require('../assets/proceedIcon.png')} style={[styles.bottomIcon, { marginBottom: height * 0.16 }]} />
                </TouchableOpacity>

            </ScrollView>


            <Image
                source={require('../assets/BottomNav3.png')}
                resizeMode="contain"
                style={styles.bottomNav} />

        </KeyboardAvoidingView>
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
    content: {
        marginTop: 18,
        alignSelf: 'center',
        borderRadius: 20,
        width: '86%',
        height: 'auto',
        backgroundColor: '#D9D9D9',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
        padding: 30
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
        fontFamily: 'Poppins-Regular'
    },
    text2: {
        fontSize: 30,
        color: 'white',
        fontWeight: '700',
        marginTop: 12,
        fontFamily: 'Poppins-Regular'
    },
    text3: {
        fontSize: 24,
        color: 'white',
        fontWeight: '400',
        marginTop: 12,
        fontFamily: 'Poppins-Regular'
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
        fontFamily: 'Poppins-Regular'
    },
    additionalText: {
        fontSize: 16,
        fontWeight: '400',
        color: '#333',
        marginVertical: 10,
        color: 'white',
        fontFamily: 'Poppins-Regular',
        alignSelf: 'center',
        textAlign: 'center'
    },
    buttonsContainer: {
        top: 20,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        padding: 12
    },
    button: {
        width: '45%',
        height: 'auto',
        backgroundColor: '#FFA952',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 17,
        justifyContent: 'center',
        fontSize: 40,
        fontFamily: 'Poppins-Regular'
    },
    buttonText: {
        alignSelf: 'center',
        color: '#ffffff',
        fontWeight: '600',
        fontSize: 24,
        fontFamily: 'Poppins-Regular'
    },
    bottomNav: {
        position: 'absolute',
        bottom: -40,
        width: '100%',
        height: '15%',
        resizeMode: 'stretch',
    },
    bottomIcon: {
        alignSelf: 'center',
        height: 120,
        width: 120,
        // Use marginTop to move the image down
        marginTop: 40,
    },
});


export default AddMoneyScreen;