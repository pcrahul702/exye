import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import CustomPhoneInput from '../components/CustomPhoneInput';
import CustomInput from '../components/CustomInput';
import { postData } from '../Utils/api';

const { width, height } = Dimensions.get('window');

const SignUpScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [mobileNoError, setMobileNoError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [loading, setLoading] = useState(false); // state for showing loader

  const validateName = name => {
    if (name.trim().length > 0) {
      setNameError('');
      return true;
    } else {
      setNameError('Name cannot be empty!');
      return false;
    }
  };

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      setEmailError('');
      return true;
    } else {
      setEmailError('Invalid Email!');
      return false;
    }
  };

  const validateMobileNo = mobileNo => {
    if (mobileNo.trim().length == 10) {
      setMobileNoError('');
      return true;
    } else {
      setMobileNoError('Invalid Mobile Number!');
      return false;
    }
  };

  const validateUsername = username => {
    if (username.trim().length >= 4) {
      setUsernameError('');
      return true;
    } else {
      setUsernameError('Username must be of minimum 4 characters!');
      return false;
    }
  };

  const handleContinue = async () => {
    if (
      validateName(name) &&
      validateEmail(email) &&
      validateMobileNo(mobileNo) &&
      validateUsername(username)
    ) {
      setLoading(true); // Show loader when submitting form

      let role = 'USER';
      const payload = {
        fullName: name,
        username: username,
        email: email,
        phoneNo: mobileNo,
        userRole: role,
      };

      console.log("payload data", payload);

      try {
        const data = await postData('/api/v1/user/register', payload);
        alert(data.message);
        navigation.navigate('Login');
      } catch (error) {
        console.error('Error during registration:', error);
        alert('An error occurred while registering. Please try again.');
      } finally {
        setLoading(false); // Hide loader once the API call completes
      }
    }
  };

  const handleLogIn = () => {
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <LinearGradient
        colors={['#FFA952', '#F05A5B']}
        style={styles.view3}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}>
        <Text style={styles.signUpText}>SIGN UP</Text>
        <Text style={styles.introText}>Start your exciting journey now!</Text>

        <View style={styles.inputContainer}>
          <CustomInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
            error={nameError}
          />
          <CustomInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            error={emailError}
          />
          <CustomInput
            placeholder="Mobile Number"
            keyboardType="numeric"
            value={mobileNo}
            onChangeText={setMobileNo}
            error={mobileNoError}
          />
          <CustomInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            error={usernameError}
          />

          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.continueText}>CONTINUE</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.tncText}>
            By continuing, I agree to EXYE's{' '}
            <Text style={[styles.tncText, { fontWeight: '900' }]}>T&Cs</Text>.
          </Text>

          <View style={styles.optionsView}>
            <TouchableOpacity onPress={handleLogIn}>
              <Text style={styles.loginText}>Already registered? Login!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  signUpText: {
    fontSize: 26,
    color: 'white',
    fontWeight: '900',
    marginTop: 16,
    alignSelf: 'center',
  },
  introText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
    alignSelf: 'center',
  },
  inputContainer: {
    width: '100%',
    height: '100%',
    marginTop: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    color: 'black',
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
    backgroundColor: 'green',
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
  optionsView: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 12,
  },
  loginText: {
    color: 'black',
    marginHorizontal: 15,
    fontSize: 16,
    fontWeight: '800',
    textDecorationColor: 'green',
    textDecorationStyle: 'dotted',
    textDecorationLine: 'underline',
    fontFamily: 'Poppins-Regular',
  },
});
