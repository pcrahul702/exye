
import React from 'react';
import { StatusBar, StyleSheet, View, Image, Text, TouchableOpacity, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';



const UploadPanScreen = () => {

    const navigation = useNavigation();

    const handleUpload = () => {
        navigation.navigate('Profile2'); // Navigate to the Wallet screen
    };



    return (
        <ScrollView>
        <View style={styles.bg}>
            <Image
                source={require('../assets/Group.png')}
                style={styles.backgroundImage}
            />
            <StatusBar hidden={true} />


            <View style={styles.container}>
                <Text style={styles.topText}>Upload your document here for verification</Text>

                <TouchableOpacity onPress={handleUpload}>
                    <Image
                        source={require('../assets/upload.png')} // Replace with your actual image path
                        style={styles.image}
                    />

                </TouchableOpacity>


                <View style={styles.imageContainer}>
                    <Image
                        source={require('../assets/docs.png')} // Replace with your actual image path
                        style={styles.secondImage}
                    />
                    <Text style={styles.overlayText}>
                        You will receive confirmation via email once your document/documents are verified
                    </Text>

                    <FastImage
                        source={require('../assets/loader.gif')} // Replace with your actual GIF path
                        style={styles.gif}
                    />
                </View>

                <View style={styles.bottomContainer}>
                    <Image
                        source={require('../assets/leftArrow.png')} // Replace with your actual arrow image path
                        style={styles.arrowIcon}
                    />
                    <Text style={styles.bottomText}>Swipe to go back</Text>
                </View>


            </View>




        </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    backgroundImage: {
        width: '100%',
        height: '80%',
        position: 'absolute',
        resizeMode: 'contain',
        top: 90,
        left: 0,
    },
    container: {
        flex: 1,
        alignContent: 'center',

    },
    topText: {
        width:'70%',
        fontSize: 32,
        fontWeight: '275',
        color: '#EF5A5A',
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: '8%',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 5,
        fontFamily: 'Poppins-Regular'
    },
    image: {
        width: '50%',
        marginTop: '8%',
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    imageContainer: {
        alignSelf:'center',
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    secondImage: {
        width: '80%',
        resizeMode: 'contain',
        alignSelf: 'center',
        margin: '2%',
    },
    overlayText: {
        position: 'absolute',
        color: 'black',
        top: '35%',
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        fontFamily: 'Poppins-Regular'
    },
    gif: {
        width:'50%',
        height: 130,
        top:-50,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    bottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: -40,
        marginBottom: 20,
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
        color: '#000000',
        textAlign: 'center',
        fontFamily: 'Poppins-Regular'
    }


}
)


export default UploadPanScreen;