import React from 'react';
import { View, SafeAreaView, StyleSheet, Image, Text, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';



function PaymentScreen() {
    const navigation = useNavigation();

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

                    <View >
                        <Image source={require('../assets/debitCardIcon.png')} style={styles.smallIcon} />
                        <Text style={styles.iconText}>add card/remove card</Text>
                    </View>

                    <View>
                        <Image source={require('../assets/googlePayIcon.png')} style={styles.smallIcon} />
                        <Text style={styles.iconText}>google pay</Text>
                    </View>

                    <View>
                        <Image source={require('../assets/paytmIcon.png')} style={styles.smallIcon} />
                        <Text style={styles.iconText}>paytm</Text>
                    </View>

                    <View>
                        <Image source={require('../assets/bhimIcon.png')} style={styles.smallIcon} />
                        <Text style={styles.iconText}>other UPI methods</Text>
                    </View>


                    <View>
                        <Image source={require('../assets/netBankingIcon.png')} style={styles.smallIcon} />
                        <Text style={styles.iconText}>net banking</Text>
                    </View>


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
        paddingBottom:20
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
