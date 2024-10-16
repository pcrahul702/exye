import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Image, Animated, TouchableOpacity } from 'react-native';

const GetStartedScreen = ({ navigation }) => {
  const slideAnim = useRef(new Animated.Value(100)).current; // Initial value for Y position (below the view)

  useEffect(() => {
    // Start the slide up animation
    Animated.timing(slideAnim, {
      toValue: 0, // Final value for Y position (in the view)
      duration: 2000, // Animation duration in milliseconds
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  const handleGetStarted = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        {/* <Text style={styles.maintext}>EXYE Present's</Text> */}
        <Text style={styles.slogan}>Challenge your brain with our quiz game!</Text>

        <TouchableOpacity onPress={handleGetStarted}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Get Started</Text>
          </View>
        </TouchableOpacity>


      </View>
      <Animated.Image
        source={require('../assets/Group29.png')}
        resizeMode="contain"
        style={[styles.image, { transform: [{ translateY: slideAnim }] }]} // Apply animated translation
      />
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
    top: '10%'
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
    marginHorizontal:12
  },
  button: {
    marginTop: '12%',
    backgroundColor: '#ef5a5a00', // Button background color
    padding: 10, 
    borderRadius:50,
    borderWidth:5,
    borderColor:'#ef5a5a',
    alignSelf:'flex-end'
  },
  buttonText: {
    color: '#ef5a5a', // Text color
    fontSize: 20, // Text size
    fontFamily: 'Poppins-Regular',
    fontWeight: '700',
    paddingHorizontal: 4,
    alignSelf:'center'
  },
  image: {
    width: '80%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: -40,
  },
});

export default GetStartedScreen;
