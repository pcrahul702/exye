
import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, View, Image } from 'react-native'
import FastImage from 'react-native-fast-image';
import { useNavigation, useRoute } from '@react-navigation/native';



const ProgressScreen = () => {

    const navigation = useNavigation();

    const route = useRoute();
    const { contestId, topicId, quizId } = route.params;

    // State to force re-render of the GIF
    const [gifKey, setGifKey] = useState(Date.now());

    useEffect(() => {
        // Reset the GIF key to force it to restart
        setGifKey(Date.now());

        const timer = setTimeout(() => {
            navigation.navigate('Question', { contestId, topicId, quizId });
        }, 3600);

        // Cleanup the timer on unmount
        return () => clearTimeout(timer);
    }, [navigation, contestId, topicId, quizId]);


    return (
        <View style={styles.bg}>
            <Image
                source={require('../assets/Group.png')}
                style={styles.backgroundImage}
            />
            <Image
                source={require('../assets/k.png')}
                style={styles.bottomImage}
            />
            <StatusBar hidden={true} />

            <View style={styles.gifContainer}>
                <FastImage
                    key={gifKey}
                    source={require('../assets/countdown.gif')}
                    style={styles.gifImage}
                />

            </View>
        </View>
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
    gifContainer: {
        alignSelf: 'center',
        justifyContent: 'center',

        width: '100%',
        height: '100%',
        justifyContent: 'center'
    },
    gifImage: {
        alignSelf: 'center',
        width: '50%',
        height: '30%',
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    bottomImage: {
        width: '80%',
        position: 'absolute',
        bottom: 0,
        resizeMode: 'contain',
        alignSelf: 'center',
        opacity: 0.8
    }
}
)


export default ProgressScreen;