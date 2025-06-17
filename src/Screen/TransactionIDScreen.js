import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, TextInput, Modal, ToastAndroid, BackHandler } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { postData } from '../Utils/api';
import Toast from 'react-native-toast-message';

function TransactionIDScreen() {

    const route = useRoute();
    const { paymentId } = route.params;

    const navigation = useNavigation();

    const [transactionId, setTransactionId] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);

    const handleSubmitPress = async () => {
        if (transactionId.trim() === '') {
            // Show toast message if the input is empty
            ToastAndroid.show('Transaction ID cannot be blank!', ToastAndroid.SHORT);
        } else {

            const payload = {
                paymentId: paymentId,
                transactionId: transactionId,
                status: "PAID"
            };

            console.log("payload data", payload);

            try {
                const data = await postData('/api/v1/payment/submit-verification', payload);
                console.log(data);

                setModalVisible(true);

            } catch (error) {
                console.error('Error during payment:', error);
                showToast('error', 'An Error Occured. Try again.')
            }
        }
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

    const handleModalClose = () => {
        console.log("Navigating to Home");
        setModalVisible(false);
        navigation.navigate('Home');
    };

    React.useEffect(() => {
        // Add back handler
        const onBackPress = () => {
            navigation.goBack();
            return true; // prevent default behavior (exit app)
        };
        BackHandler.addEventListener('hardwareBackPress', onBackPress);
        return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image source={require('../assets/uppershape2.png')} style={styles.uppershape} />
            <Image source={require('../assets/Group.png')} style={styles.backgroundImage} />
            <Image source={require('../assets/cardsLogo.png')} style={styles.upperLog} />

            <Image
                source={require('../assets/BottomNav3.png')}
                resizeMode="contain"
                style={styles.bottomNav}
            />

            <ScrollView style={styles.scrollContainer}>
                {/* Total amount section */}
                <View style={styles.idContainer}>
                    <Text style={styles.headingText}>Please Paste your Transaction ID here:</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Enter Transaction ID"
                        placeholderTextColor="#B0B0B0"
                        multiline={false}
                        value={transactionId}
                        onChangeText={setTransactionId}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder={paymentId}
                        placeholderTextColor="#B0B0B0"
                        multiline={false}
                        editable={false}
                    />

                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmitPress}>
                        <Text style={styles.submitText}>Submit</Text>
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

            <Modal
                transparent={true}
                animationType="fade"
                visible={isModalVisible}
                onRequestClose={handleModalClose}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContent}>
                        <Image
                            source={require('../assets/modalBackdrop.png')}
                            style={styles.modalImage}
                        />

                        <TouchableOpacity onPress={() => handleModalClose()} style={styles.homeButton}>
                            <Image
                                source={require('../assets/unfilledHome.png')}
                                style={styles.homeIcon}
                            />
                        </TouchableOpacity>

                    </View>

                </View>
            </Modal>
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
        alignSelf: 'center',
    },
    arrowIcon: {
        width: 36,
        height: 36,
        marginRight: 10,
    },
    bottomText: {
        fontSize: 31,
        fontWeight: '275',
        color: '#FFFFFF',
        textAlign: 'center',
        fontFamily: 'Poppins-Regular',
    },
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        resizeMode: 'stretch',
    },
    idContainer: {
        width: '90%',
        backgroundColor: '#EF5A5A',
        borderRadius: 18,
        padding: 15,
        marginTop: 20,
        marginHorizontal: 20,
        paddingHorizontal: '10%',
    },
    headingText: {
        fontSize: 20,
        fontWeight: '700',
        alignSelf: 'center',
        color: '#FFFFFF',
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: 24,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    input: {
        backgroundColor: '#FFFFFF',
        height: 40,
        fontSize: 16,
        color: '#000000',
        borderRadius: 50,
        paddingLeft: 14,
        textAlignVertical: 'center',
        marginTop: 32,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
        maxWidth: '100%',
        overflow: 'hidden',
    },
    submitButton: {
        backgroundColor: '#3DC467',
        alignSelf: 'center',
        borderRadius: 40,
        marginTop: 32,
        height: 80,
        justifyContent: 'center',
        borderColor: '#ffffff',
        borderWidth: 2,
        alignItems: 'center',
        paddingHorizontal: 8,
        shadowColor: 'black',
        shadowOffset: { width: 3, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 5,
    },
    submitText: {
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: '900',
        fontFamily: 'Poppins-Regular',
        padding: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',  // Center the modal content vertically
        alignItems: 'center',      // Center the modal content horizontally
        backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Semi-transparent background
    },
    modalContent: {
        width: '85%',
        height: '60%',
        backgroundColor: '#FFFFDF',
        alignItems: 'center',
        borderRadius: 32,
    },
    modalImage: {
        width: '100%',
        height: '80%',
        resizeMode: 'stretch',
        alignSelf: 'center',
        alignSelf: 'center',
    },
    homeButton: {
        height: 70,
        width: 70,
        zIndex: 1,
        alignSelf: 'center',
        top: -85,
        left: 12,
    },
    homeIcon: {
        height: 70,
        width: 70,
        zIndex: 1,
        alignSelf: 'center',
        
    },
});

export default TransactionIDScreen;