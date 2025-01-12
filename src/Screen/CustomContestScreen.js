
import React from 'react';
import { StyleSheet, View, StatusBar, Image, Text, TouchableOpacity } from 'react-native';


const CustomContestScreen = () => {

    return (
        <View style={styles.bg}>
            <Image source={require('../assets/Group.png')} style={styles.backgroundImage} />
            <StatusBar hidden={true} />
            
            <Text style={styles.text1}>Welcome to Custom Contest</Text>

            
            
            <Text style={styles.text3}>Good luck with your contest!</Text>

            <Image source={require('../assets/k.png')} style={styles.bottomImage} />
        </View>
    );
};

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        backgroundColor: '#e9e9e9',
        alignItems: 'center', // Center all the content horizontally
        justifyContent: 'center', // Center all the content vertically
    },
    backgroundImage: {
        width: '100%',
        height: '80%',
        position: 'absolute',
        resizeMode: 'contain',
        top: 90,
        left: 0,
        opacity: 0.8,
    },
    bottomImage: {
        width: '80%',
        position: 'absolute',
        bottom: 0,
        resizeMode: 'contain',
        alignSelf: 'center',
        opacity: 0.8,
    },
    text1: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 50,
    },
    sliderContainer: {
        width: '80%',
        alignItems: 'center',
        marginTop: 20,
    },
    text2: {
        fontSize: 18,
        color: '#333',
        marginBottom: 10,
    },
    slider: {
        width: '100%',
        height: 40,
    },
    sliderValue: {
        fontSize: 20,
        color: '#000',
        marginTop: 10,
    },
    text3: {
        fontSize: 18,
        fontWeight: '600',
        color: '#F05A5B',
        marginTop: 20,
    },
});

export default CustomContestScreen;
