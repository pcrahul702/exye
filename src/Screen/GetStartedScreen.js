import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, Image, Animated, TouchableOpacity } from 'react-native';
import { getAccessToken } from '../Utils/getAccessToken';
import Toast from 'react-native-toast-message';
import { getData } from '../Utils/api';

const GetStartedScreen = ({ navigation }) => {

  // Animation values for scaling and opacity
  const scaleAnim = useRef(new Animated.Value(0.5)).current; // Initial scale value (small)
  const opacityAnim = useRef(new Animated.Value(0)).current; // Initial opacity (invisible)

  useEffect(() => {
    // Start the pop-up effect
    Animated.timing(scaleAnim, {
      toValue: 1, // Final scale value (normal size)
      duration: 2000, // Duration of the animation
      useNativeDriver: true,
    }).start();

    Animated.timing(opacityAnim, {
      toValue: 1, // Final opacity value (fully visible)
      duration: 2000, // Same duration for smooth transition
      useNativeDriver: true,
    }).start();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    // Check for access token on app load
    async function checkAuth() {
      const token = await getAccessToken();
      // console.log("token",token);
      setIsAuthenticated(!!token);
    }
    checkAuth();
  }, []);

  const handleGetStarted = async () => {

    try {
      const res = await getData('/public/health');

      console.log("isAuthenticated", isAuthenticated);
      isAuthenticated ?
        navigation.navigate('Home') : navigation.navigate('Login');

    } catch (error) {
      if (error.message === 'Network Error') {
        showToast('Cannot reach Server!');
      } else {
        showToast('Something went wrong', error.message);
      }
    }

  };

  const showToast = (message1, message2 = '') => {
    Toast.show({
      type: 'error',
      position: 'bottom',
      text1: message1,
      text2: message2,
      visibilityTime: 3000, // How long the toast is visible
      autoHide: true, // Hide after time
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>

        <Animated.Image
          source={require('../assets/logo.png')}
          resizeMode="contain"
          style={[
            styles.logo,
            {
              transform: [{ scale: scaleAnim }], // Apply scale animation
              opacity: opacityAnim, // Apply opacity animation
            },
          ]}
        />

        <Text style={styles.slogan}>Challenge your brain with our quiz game!</Text>

        <TouchableOpacity onPress={handleGetStarted}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Get Started</Text>
          </View>
        </TouchableOpacity>


      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFFDF',
  },
  content: {
    flex: 1,
    alignItems: 'center', // Center content horizontally
    justifyContent: 'center'
  },
  logo: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
  },
  maintext: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    color: '#ef5a5a',
    marginTop: 10, // Space between main text and slogan
    textAlign: 'center',
  },
  slogan: {
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
    fontWeight: '500',
    marginTop: 15, // Space below the slogan
    fontFamily: 'Poppins-Regular',
    marginHorizontal: 12
  },
  button: {
    marginTop: '12%',
    backgroundColor: '#ef5a5a00', // Button background color
    padding: 10,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: '#ef5a5a',
    alignSelf: 'flex-end'
  },
  buttonText: {
    color: '#ef5a5a', // Text color
    fontSize: 20, // Text size
    fontFamily: 'Poppins-Regular',
    fontWeight: '700',
    paddingHorizontal: 4,
    alignSelf: 'center'
  },
  image: {
    width: '80%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: -40,
  },
});

export default GetStartedScreen;
