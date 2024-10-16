import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

const LoginScreenTwo = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [showOtpContainer, setShowOtpContainer] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const navigation = useNavigation();
  const otpInputsRefs = useRef([]);

  const handleLogin = () => {
    navigation.navigate('Main');
  };

  const handlePhoneNumberChange = text => {
    setPhoneNumber(text);
    setIsSubmitDisabled(text.length < 10);
  };

  const handleSubmit = () => {
    console.log('Submit button pressed with phone number:', phoneNumber);
    setShowOtpContainer(true);
    navigation.navigate('Home')
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp')
  };

  const handleOtpChange = (text, index) => {
    let updatedOtp = [...otp];
    updatedOtp[index] = text;
    setOtp(updatedOtp);

    if (text.length === 1 && index < 5) {
      otpInputsRefs.current[index + 1].focus();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <Image
        source={require('../assets/Group.png')}
        style={styles.backgroundImage}
      />
      <ScrollView contentContainerStyle={styles.inner}>
        
        <View style={styles.inputContainer}>
          <View style={styles.labelbox}>
            <Text style={styles.label}>Phone number</Text>
          </View>

          <TextInput
            style={styles.input}
            placeholder="+91 9922389877"
            placeholderTextColor="#8C8C8C"
            keyboardType="numeric"
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
          />
          <TouchableOpacity
            style={[
              styles.submitButton,
              {
                backgroundColor: isSubmitDisabled
                  ? 'rgba(61, 196, 103, 0.6)'
                  : 'green',
              },
            ]}
            onPress={handleSubmit}
            disabled={isSubmitDisabled}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
          <View style={styles.Orcontainer}>
            <Text style={styles.OrText}>OR</Text>
          </View>
          <View>
            <TouchableOpacity
              style={styles.socialsubmitButton}
              onPress={handleSubmit}
              disabled={isSubmitDisabled}>
              <View style={styles.socialContainer}>
                <FontAwesomeIcon
                  icon={faFacebookF}
                  size={24}
                  style={styles.socialIcon}
                />
                <Text style={styles.socialText}>Continue with Facebook</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialsubmitButton}
              onPress={handleSubmit}
              disabled={isSubmitDisabled}>
              <View style={styles.socialContainerTwo}>
                <Image
                  source={require('../assets/google.png')}
                  style={styles.customGoogleLogo}
                />
                <Text style={styles.socialText}>Continue with Google</Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>

        <TouchableOpacity
          style={[styles.submitButton,{backgroundColor: 'green'}]}
          onPress={handleSignUp}>
          <Text style={styles.submitText}>New? Sign Up Now!</Text>
        </TouchableOpacity>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showOtpContainer}
        onRequestClose={() => setShowOtpContainer(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>

            <Text style={styles.otpText}>Enter OTP</Text>
            <View style={styles.otpInputContainer}>
              {Array.from({ length: 6 }).map((_, index) => (
                <TextInput
                  key={index}
                  style={styles.otpInput}
                  keyboardType="numeric"
                  maxLength={1}
                  value={otp[index]}
                  onChangeText={(text) => handleOtpChange(text, index)}
                  ref={(ref) => (otpInputsRefs.current[index] = ref)}
                />
              ))}
            </View>

            <TouchableOpacity style={styles.verifyButton} onPress={handleLogin}>
              <Text style={styles.verifyButtonText}>Verify OTP</Text>
            </TouchableOpacity>
            <ActivityIndicator size="large" color="green" />
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EF5A5A',
    position: 'relative',
    paddingLeft: 20,
    paddingRight: 20
  },  
  backgroundImage: {
    width: '100%',
    height: '80%',
    position: 'absolute',
    resizeMode: 'contain',
    top: 90,
    left: 0,
  },
  inner: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#EF5A5A',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFA952',
    fontFamily: 'Poppins-Regular',
  },
  inputContainer: {
    width: '100%',
    marginVertical: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: 'grey',
    backgroundColor: 'white',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    color: 'black'
  },
  labelbox: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  label: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    color: 'black'
  },
  headerView: {
    marginHorizontal: 'auto',
  },
  gradientBorder: {
    padding: 3,
    borderRadius: 20,
    width: '100%',
  },
  submitButton: {
    borderRadius: 40,
    borderColor: 'white',
    borderWidth: 2,
    alignItems: 'center',
    paddingVertical: 10,
    marginVertical: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  socialsubmitButton: {
    width: '100%',
    borderRadius: 40,
    backgroundColor: '#D9D9D9',
    marginVertical: 10,
    alignItems: 'center',
    paddingVertical: 10,
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
  },
  socialContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialContainerTwo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialIcon: {
    color: '#4267B2',
    marginRight: 10,
  },
  customGoogleLogo: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  socialText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4267B2',
    fontFamily: 'Poppins-Regular',
  },
  Orcontainer: {
    marginVertical: 10,
  },
  OrText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '80%',
  },
  otpText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 18,
    fontFamily: 'Poppins-Regular',
  },
  otpInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpInput: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    textAlign: 'center',
    fontSize: 20,
    borderRadius: 5,
    marginHorizontal: 5,
    fontFamily: 'Poppins-Regular',
  },
  verifyButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  verifyButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
});

export default LoginScreenTwo;
