import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, TextInput, Alert, Modal } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

function UPIScreen() {

    const route = useRoute();
    const { netPayable } = route.params;


    const navigation = useNavigation();

    const handleUPIPress = (upiVendor) => {
        navigation.navigate('TransactionID', { upiVendor, netPayable });
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

                <View style={styles.upiModeContainer}>
                    
                    <TouchableOpacity style={styles.upiButton}
                        onPress={() => handleUPIPress('Google Pay')}>
                        <Text style={styles.upiButtonText}>Google Pay</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.upiButton}
                        onPress={() => handleUPIPress('Cred')}>
                        <Text style={styles.upiButtonText}>Cred</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.upiButton}
                        onPress={() => handleUPIPress('PhonePe')}>
                        <Text style={styles.upiButtonText}>PhonePe</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.upiButton}
                        onPress={() => handleUPIPress('Paytm')}>
                        <Text style={styles.upiButtonText}>Paytm</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.upiButton}
                        onPress={() => handleUPIPress('BharatPe')}>
                        <Text style={styles.upiButtonText}>BharatPe</Text>
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
    upiModeContainer: {
        width: '90%',
        backgroundColor: '#D9D9D9',
        borderRadius: 18,
        padding: 15,
        marginTop: 20,
        marginHorizontal: 20,
        alignContent: 'center',
        paddingVertical: 50,
    },
    upiButton: {
        width: '90%',
        height: 44,
        alignSelf: 'center',
        backgroundColor: '#FFA952',
        borderRadius: 100,
        marginVertical: 12,
        borderWidth: 1,
        justifyContent: 'center',
        borderColor: '#FFFFFF',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 3, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 5,
    },
    upiButtonText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '700',
        fontFamily: 'Poppins-Regular',
    },
});


export default UPIScreen;
