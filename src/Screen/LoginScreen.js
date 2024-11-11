import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {postData} from '../Utils/api';
import {useNavigation} from '@react-navigation/native';
import CustomPhoneInput from '../components/CustomPhoneInput';
import CustomEmailInput from '../components/CustomEmailInput';
import LinearGradient from 'react-native-linear-gradient';
import {API_URL} from '@env';
import axios from 'axios';
const LoginScreen = () => {
  const refs = useRef();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isContinueDisabled, setIsContinueDisabled] = useState(true);
  const [loginViaPhone, setloginViaPhone] = useState(true);
  const [otp, setOtp] = useState('');
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const navigation = useNavigation();

  const handlePhoneNumberChange = text => {
    setPhoneNumber(text);
    setIsContinueDisabled(text.length < 10);
  };

  const handleEmailChange = text => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsContinueDisabled(!emailRegex.test(email));
  };

  const handleContinue = async () => {
    console.log('called', API_URL);
    const payload = loginViaPhone
      ? {
          contactType: 'PHONE',
          phoneNo: phoneNumber,
          otpType: 'LOGIN',
        }
      : {
          contactType: 'EMAIL',
          email: email,
          otpType: 'LOGIN',
        };
    try {
      const response = await axios({
        method: 'POST',
        url: 'http://43.204.140.8:8080/api/v1/user/login',
        data: payload,
        headers: {
          loginSource: 'OTP',
        },
      });
      console.log(response.status);
      if (response.status == 200) {
        setOtpModalVisible(true);
      }
    } catch (error) {
      console.log('error', error);
      alert(error?.response?.data?.message);
    }
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  const handleEmailLogin = () => {
    setPhoneNumber('');
    setEmail('');
    setloginViaPhone(false);
    setIsContinueDisabled(true);
  };

  const handlePhoneLogin = () => {
    setPhoneNumber('');
    setEmail('');
    setloginViaPhone(true);
    setIsContinueDisabled(true);
  };
  const handleOtpSubmit = async () => {
    if (otp.length < 4) {
      alert('Enter Complete OTP!');
      return;
    }

    const payload = loginViaPhone
      ? {
          contactType: 'PHONE',
          phoneNo: phoneNumber,
          otpType: 'LOGIN',
          otp: otp,
        }
      : {
          contactType: 'EMAIL',
          email: email,
          otpType: 'LOGIN',
          otp: otp,
        };

    try {
      // Call API for OTP verification
      const response = await postData('/api/v1/user/validate-otp', payload);
      console.log('response', response);
      if (response.status == 'OK') {
        console.log(response.data.token);
        navigation.navigate('Home');
        await AsyncStorage.setItem(
          'token',
          (response.data.token),
        );
       // console.log('response.data.token', response.data.token);
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
      alert(error?.response?.data?.message);
    } finally {
      setOtpModalVisible(false);
      setOtp('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <LinearGradient
        colors={['#FFA952', '#F05A5B']}
        style={styles.view3}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        {/* <Text style={styles.text3}>Live Contest</Text>
            <Image
              source={require('../assets/live_contest_image.png')}
              style={styles.image3}
            /> */}
        <Text style={styles.loginText}>LOGIN</Text>
        <Text style={styles.wbText}>Welcome Back!</Text>

        <View>
          {loginViaPhone ? (
            <View style={styles.inputContainer}>
              <CustomPhoneInput
                placeholder="Mobile Number"
                keyboardType="numeric"
                value={phoneNumber}
                onChangeText={handlePhoneNumberChange}
              />
              <TouchableOpacity
                style={[
                  styles.continueButton,
                  {
                    backgroundColor: isContinueDisabled
                      ? 'rgba(61, 196, 103, 0.6)'
                      : 'green',
                  },
                ]}
                onPress={handleContinue}
                disabled={isContinueDisabled}>
                <Text style={styles.continueText}>CONTINUE</Text>
              </TouchableOpacity>

              <Text style={styles.tncText}>
                By continuing, I agree to EXYE's{' '}
                <Text style={[styles.tncText, {fontWeight: '900'}]}>T&Cs</Text>.
              </Text>

              <View style={styles.optionsView}>
                <TouchableOpacity onPress={handleEmailLogin}>
                  <Text style={styles.otherLoginText}>Other Login Methods</Text>
                </TouchableOpacity>

                <View
                  style={{
                    width: 2,
                    height: '100%',
                    backgroundColor: '#a4a4a4',
                  }}></View>

                <TouchableOpacity onPress={handleSignUp}>
                  <Text style={styles.signUpText}>New? Sign Up!</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.inputContainer}>
              <CustomEmailInput
                placeholder="Email"
                value={email}
                onChangeText={handleEmailChange}
              />
              <TouchableOpacity
                style={[
                  styles.continueButton,
                  {
                    backgroundColor: isContinueDisabled
                      ? 'rgba(61, 196, 103, 0.6)'
                      : 'green',
                  },
                ]}
                onPress={handleContinue}
                disabled={isContinueDisabled}>
                <Text style={styles.continueText}>CONTINUE</Text>
              </TouchableOpacity>

              <Text style={styles.tncText}>
                By continuing, I agree to EXYE's{' '}
                <Text style={[styles.tncText, {fontWeight: '900'}]}>T&Cs</Text>.
              </Text>

              <View
                style={{
                  backgroundColor: '#e4e4e4',
                  width: 'auto',
                  height: 'auto',
                  borderRadius: 10,
                  alignSelf: 'center',
                  margin: 15,
                }}>
                <Text style={{color: 'black', padding: 5, alignSelf: 'center'}}>
                  OR
                </Text>
              </View>

              <View style={styles.socialOptionsView}>
                <TouchableOpacity>
                  <View style={styles.socialContainer}>
                    <Image
                      source={require('../assets/facebook.png')}
                      style={styles.socialIcon}
                    />
                    <Text style={styles.socialText}>FACEBOOK</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={styles.socialContainer}>
                    <Image
                      source={require('../assets/google.png')}
                      style={styles.socialIcon}
                    />
                    <Text style={styles.socialText}>GOOGLE</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.optionsView}>
                <TouchableOpacity onPress={handlePhoneLogin}>
                  <Text style={styles.otherLoginText}>Login via Mobile</Text>
                </TouchableOpacity>

                <View
                  style={{
                    width: 2,
                    height: '100%',
                    backgroundColor: '#a4a4a4',
                  }}></View>

                <TouchableOpacity onPress={handleSignUp}>
                  <Text style={styles.signUpText}>New? Sign Up!</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {/* OTP Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={otpModalVisible}
            onRequestClose={() => {
              setOtpModalVisible(!otpModalVisible);
            }}>
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Enter OTP</Text>
                <View style={styles.otpInputContainer}>
                  {[...Array(4)].map((_, index) => (
                    <TextInput
                      key={index}
                      style={styles.otpInput}
                      keyboardType="numeric"
                      maxLength={1}
                      placeholder=""
                      value={otp[index] || ''}
                      onChangeText={text => {
                        const newOtp = otp.split('');
                        newOtp[index] = text;
                        setOtp(newOtp.join(''));
                        // Move to next input if character is entered
                        if (text && index < 3) {
                          refs[`otpInput${index + 1}`].focus();
                        }
                      }}
                      ref={input => (refs[`otpInput${index}`] = input)} // Create a reference for each input
                    />
                  ))}
                </View>
                <TouchableOpacity
                  style={styles.verifyButton}
                  onPress={handleOtpSubmit}>
                  <Text style={styles.verifyButtonText}>Verify OTP</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#8C1018',
    position: 'relative',
  },
  loginText: {
    fontSize: 26,
    color: 'white',
    fontWeight: '900',
    marginTop: 16,
    alignSelf: 'center',
    fontFamily: 'Poppins-Regular',
  },
  wbText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
    alignSelf: 'center',
    fontFamily: 'Poppins-Regular',
  },
  inputContainer: {
    width: '100%',
    height: '100%',
    marginTop: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // borderTopWidth: 3,
    // borderColor: '#e6444a',
    backgroundColor: 'white',
    paddingTop: 20,
  },
  continueButton: {
    width: '92%',
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  continueText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
  },
  tncText: {
    color: '#040404',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    alignSelf: 'center',
    marginTop: 15,
  },
  socialOptionsView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly', // This ensures equal spacing between the buttons
    alignSelf: 'center',
    marginTop: 15,
    width: '92%', // Make sure it takes the full width of the parent
  },
  socialContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    alignSelf: 'center',
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  socialText: {
    fontSize: 16,
    fontWeight: '900',
    color: 'black',
    fontFamily: 'Poppins-Regular',
  },
  optionsView: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 25,
  },
  otherLoginText: {
    color: '#c09711',
    marginHorizontal: 15,
    fontSize: 16,
    fontWeight: '800',
    textDecorationColor: 'green',
    textDecorationStyle: 'dotted',
    textDecorationLine: 'underline',
    fontFamily: 'Poppins-Regular',
  },
  signUpText: {
    color: 'black',
    marginHorizontal: 15,
    fontSize: 16,
    fontWeight: '800',
    textDecorationColor: 'green',
    textDecorationStyle: 'dotted',
    textDecorationLine: 'underline',
    fontFamily: 'Poppins-Regular',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
  },
  modalView: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 20,
    marginBottom: 20,
  },
  otpInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    color:'black',
    textAlign: 'center',
    fontSize: 20,
    margin: 5,
  },
  verifyButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  verifyButtonText: {
    color: 'white',
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
  },
  closeButtonText: {
    color: '#FF0000',
    fontSize: 16,
  },
});

export default LoginScreen;
