import React from 'react';
import { View, SafeAreaView, StyleSheet, Image, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';






function ReferScreen() {
    const navigation = useNavigation();





    return (
        <View style={styles.container}>
            <Image source={require('../assets/uppershape2.png')} style={styles.uppershape} />
            <Image source={require('../assets/Group.png')} style={styles.backgroundImage} />
            <Image source={require('../assets/referLogo.png')} style={styles.upperLog} />

            <ScrollView style={styles.scrollContainer}>
                <View style={styles.contentContainer}>
                    <TouchableOpacity style={styles.copyCodeButton}>
                        <Text style={styles.buttonText}>Copycode</Text>
                    </TouchableOpacity>

                    <Image
                        source={require('../assets/referImage.png')} // replace with your image path
                        style={styles.someImage}
                    />

                    <Text style={styles.instructionText}>share the referal code with:</Text>

                    <View style={styles.iconsContainer}>
                        <Image
                            source={require('../assets/whatsAppIcon.png')} // replace with your WhatsApp icon path
                            style={styles.icon}
                        />
                        <Image
                            source={require('../assets/instaIcon.png')} // replace with your Instagram icon path
                            style={styles.icon}
                        />
                        <Image
                            source={require('../assets/messengerIcon.png')} // replace with your Messenger icon path
                            style={styles.icon}
                        />
                    </View>
                </View>


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
    scrollContainer:{
        width:'100%',
        paddingBottom:50
    },
    contentContainer: {
        marginTop: 20,
        alignSelf: 'center',
        width: 330,
        borderRadius: 18,
        backgroundColor: '#D9D9D9',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    copyCodeButton: {
        marginTop: 15,
        width: '92%',
        height: 70,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#00000000',
        borderRadius: 100,
        marginBottom: 20,
        borderStyle: 'dashed',
        borderWidth: 2,
        borderColor: '#000000'
    },
    buttonText: {
        alignSelf: 'center',
        color: '#FFFFFF',
        fontSize: 38,
        fontWeight: '500',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: -0.5, height: 0.5 },
        textShadowRadius: 3,
        fontFamily: 'Poppins-Regular'
    },
    someImage: {
        width: '85%', // Customize size
        marginTop: 10,
        alignSelf: 'center'
    },
    instructionText: {
        fontSize: 21,
        fontWeight: '500',
        marginTop: 20,
        color: '#FFFFFF',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: -0.5, height: 0.5 },
        textShadowRadius: 3,
        fontFamily: 'Poppins-Regular'
    },
    iconsContainer: {
        width: '100%',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    icon: {
        width: 65, // Customize icon size
        height: 70, // Customize icon size
        margin: 10,
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
        fontSize: 28,
        fontWeight: '275',
        color: '#FFFFFF',
        textAlign: 'center',
        fontFamily: 'Poppins-Regular'
    },
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        height:'18%',
        width: '100%',
        resizeMode: 'stretch',
    },
});


export default ReferScreen;
