import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, View, Image, Text, Animated, Dimensions, BackHandler } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const ProgressScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { contestId, topicId, quizId } = route.params;

    const [countdown, setCountdown] = useState(3); // Initial countdown value
    const [isNavigating, setIsNavigating] = useState(false); // State to manage navigation
    const scale = new Animated.Value(0); // Animation value for scaling

    const { width, height } = Dimensions.get('window');
    const fontSize = width / 2; // Font size is half of screen width

    // Function to animate scaling (pop-in and pop-out effect)
    const startScaleAnimation = () => {
        // Start the scale animation (grow from small to big)
        Animated.sequence([
            Animated.timing(scale, {
                toValue: 1.5, // Scale to 1.5 times the original size
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(scale, {
                toValue: 1, // Scale back to original size
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();
    };

    useEffect(() => {
        const backAction = () => {
            showToast('info', 'You cannot go back from here');
            return true;
        };

        BackHandler.addEventListener('hardwareBackPress', backAction);

        // Clean up the event listener when the component is unmounted
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', backAction);
        };
    }, [navigation]);

    useEffect(() => {
        if (countdown === 0 && !isNavigating) {
            // Once countdown reaches 0, navigate to 'Question' screen after a brief delay
            setIsNavigating(true);
            setTimeout(() => {
                navigation.navigate('Question', { contestId, topicId, quizId });
            }, 500); // Wait 500ms to display "0" before navigating
            return;
        }

        // Start the countdown animation for each digit
        if (countdown > 0) {
            startScaleAnimation(); // Trigger animation for each countdown change
        }

        // Start a timer that decreases the countdown by 1 every second
        const timer = setInterval(() => {
            setCountdown(prevCountdown => prevCountdown - 1);
        }, 1000);

        // Clear the interval once countdown reaches 0 or on component unmount
        return () => clearInterval(timer);
    }, [countdown, navigation, contestId, topicId, quizId, isNavigating]);

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

    return (
        <View style={styles.bg}>
            <Image source={require('../assets/Group.png')} style={styles.backgroundImage} />
            <Image source={require('../assets/k.png')} style={styles.bottomImage} />
            <StatusBar hidden={true} />

            {/* Animated countdown text */}
            <Animated.View style={{ transform: [{ scale }] }}>
                <Text style={[styles.countdownText, { fontSize }]}>{countdown}</Text>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center', // Vertically center the content
        alignItems: 'center',     // Horizontally center the content
    },
    backgroundImage: {
        width: '100%',
        height: '80%',
        position: 'absolute', // Absolute positioning so it doesn't affect other elements
        resizeMode: 'contain',
        top: 90,
        left: 0,
    },
    bottomImage: {
        width: '80%',
        position: 'absolute',
        bottom: 0,
        resizeMode: 'contain',
        alignSelf: 'center',
        opacity: 0.8,
    },
    countdownText: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#ff7101',
    },
});

export default ProgressScreen;
