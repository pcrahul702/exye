
import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, View, Text, Image, Dimensions } from 'react-native'
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';


const { width, height } = Dimensions.get('window');



const LoadingPavilionScreen = () => {

    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Pavilion');
        }, 2500);
    });


    return (
        <View style={styles.bg}>
            <Image
                source={require('../assets/Group.png')}
                style={styles.backgroundImage}
            />
            <StatusBar hidden={true} />

            <View style={styles.gifContainer}>
                <FastImage source={require('../assets/tick.gif')}
                    style={[styles.gifImage,{height:width*0.6}]} />

            </View>

            <Text style={styles.text1}>Answer submitted!</Text>
            <Text style={styles.text2}>going to pavilion</Text>


        </View>
    )
}

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center'
    },
    backgroundImage: {
        width: '100%',
        height: '80%',
        position: 'absolute',
        resizeMode: 'contain',
        top: 90,
        left: 0,
    },
    gifContainer: {
        alignSelf: 'center',
        justifyContent: 'center',
        bottom:'20%',
        width: '60%',
        justifyContent: 'center'
    },
    gifImage: {
        alignSelf: 'center',
        width: '100%',
        width:'100%',
        resizeMode: 'contain',
    },
    text1: {
        fontSize: 34,
        fontWeight: '275',
        color: '#3DC467',
        alignSelf: 'center',
        bottom: '16%',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 5,
        fontFamily: 'Poppins-Regular'

    },
    text2: {
        fontSize: 34,
        fontWeight: '275',
        color: '#F05A5B',
        alignSelf: 'center',

        bottom: "8%",
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 5,
        fontFamily: 'Poppins-Regular'
    }

}
)


export default LoadingPavilionScreen;