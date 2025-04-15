import React, { useEffect, useState, useRef } from 'react';
import { StatusBar, StyleSheet, View, Image, Text, Animated, Dimensions, BackHandler, AppState } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const ProgressScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { contestId, topicId, quizId } = route.params;

    const [countdown, setCountdown] = useState(3); // Initial countdown value
    const [isNavigating, setIsNavigating] = useState(false); // State to manage navigation
    const scale = new Animated.Value(0); // Animation value for scaling

    const { width } = Dimensions.get('window');
    const fontSize = width / 2; // Font size is half of screen width

    const appState = useRef(AppState.currentState); // To keep track of app state
    const timerRef = useRef(null); // To keep track of the countdown interval
    const startTimeRef = useRef(null); // To store the time when countdown started
    const lastUpdateTimeRef = useRef(null); // To store the last update time for calculating elapsed time

    // Function to animate scaling (pop-in and pop-out effect)
    const startScaleAnimation = () => {
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

    // Function to update countdown
    const updateCountdown = () => {
        setCountdown(prevCountdown => prevCountdown - 1);
    };

    const handleAppStateChange = (nextAppState) => {
        if (appState.current === 'active' && nextAppState === 'background') {
            // When the app goes to the background, record the time
            lastUpdateTimeRef.current = Date.now();
        }

        if (appState.current === 'background' && nextAppState === 'active') {
            // When the app comes to the foreground, calculate the elapsed time
            const elapsed = Date.now() - (lastUpdateTimeRef.current || Date.now());
            const remainingTime = Math.max(countdown - Math.floor(elapsed / 1000), 0); // Ensure countdown doesn't go negative
            setCountdown(remainingTime);

            // If countdown reaches zero, navigate immediately
            if (remainingTime === 0 && !isNavigating) {
                navigateToNextScreen();
            }
        }

        appState.current = nextAppState;
    };

    // Start the countdown and keep the timer running
    const startCountdown = () => {
        startTimeRef.current = Date.now(); // Store the starting time
        timerRef.current = setInterval(updateCountdown, 1000);
    };

    // Stop the countdown when it reaches 0 or on component unmount
    const stopCountdown = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    const navigateToNextScreen = () => {
        setIsNavigating(true);
        setTimeout(() => {
            navigation.navigate('Question', { contestId, topicId, quizId });
        }, 500); // Wait 500ms to display "0" before navigating
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
            stopCountdown();
        };
    }, [navigation]);

    useEffect(() => {
        // Handle app state changes
        const appStateListener = AppState.addEventListener('change', handleAppStateChange);

        // Start countdown initially
        startCountdown();

        return () => {
            appStateListener.remove(); // Properly remove the event listener
            stopCountdown();
        };
    }, []);

    useEffect(() => {
        if (countdown === 0 && !isNavigating) {
            navigateToNextScreen();
        }

        if (countdown > 0) {
            startScaleAnimation(); // Trigger animation for each countdown change
        }
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
