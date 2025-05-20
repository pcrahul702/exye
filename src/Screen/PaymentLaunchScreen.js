import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, Image, Text, TouchableOpacity, TextInput, Alert, Modal } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { getAccessToken } from '../Utils/getAccessToken';
import { postData } from '../Utils/api';



function PaymentScreen() {

    const route = useRoute();
    const { addAmount } = route.params;

    const [modalVisible, setModalVisible] = useState(false);

    const navigation = useNavigation();

    const showModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleSummaryNavigation = () => {
        navigation.navigate('PaymentSummary', { addAmount });
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

                    <TouchableOpacity onPress={showModal}>
                        <Image source={require('../assets/debitCardIcon.png')} style={styles.smallIcon} />
                        <Text style={styles.iconText}>add card/remove card</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={showModal}>
                        <Image source={require('../assets/googlePayIcon.png')} style={styles.smallIcon} />
                        <Text style={styles.iconText}>google pay</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={showModal}>
                        <Image source={require('../assets/paytmIcon.png')} style={styles.smallIcon} />
                        <Text style={styles.iconText}>paytm</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleSummaryNavigation}>
                        <Image source={require('../assets/bhimIcon.png')} style={styles.smallIcon} />
                        <Text style={styles.iconText}>other UPI methods</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={showModal}>
                        <Image source={require('../assets/netBankingIcon.png')} style={styles.smallIcon} />
                        <Text style={styles.iconText}>net banking</Text>
                    </TouchableOpacity>


                </View>

                <Modal
                    visible={modalVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={closeModal}
                >
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalText}>This feature will soon be available.{"\n"}Please use UPI for now</Text>
                            <TouchableOpacity onPress={closeModal} style={styles.modalButton}>
                                <Text style={styles.modalButtonText}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>


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
        fontFamily: 'Poppins-Regular',
        textShadowColor: 'rgba(0, 0, 0, 0.75)', 
        textShadowOffset: { width: 1, height: 1 }, 
        textShadowRadius: 6,
    },
    
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        backgroundColor: 'black',
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
        width: '80%',
    },
    modalText: {
        color: 'white',
        fontSize: 18,
        fontWeight:'700',
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: 'Poppins-Regular',
    },
    modalButton: {
        backgroundColor: '#6A6F79B2',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    modalButtonText: {
        color: '#3DC467',
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center',
        fontFamily: 'Poppins-Regular',
    },
});


export default PaymentScreen;
