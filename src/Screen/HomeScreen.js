import { useNavigation, DrawerActions } from '@react-navigation/native';
import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
  Alert,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { getData } from '../Utils/api';

const HomeScreen = () => {
  const [selectedRadio, setSelectedRadio] = useState(0);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [profiledata, setProfileData] = useState([]);
  const [liveContestsData, setLiveContestsData] = useState([]);
  const [isContestVisible, setIsContestVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');
  const carouselScrollX = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation();

  useEffect(() => {
    getProfileData();
  }, []);

  const getProfileData = async () => {
    try {
      const res = await getData('/api/v1/dashboard');

      setProfileData(res);
      console.log(profiledata.liveContests);
      setLiveContestsData(profiledata.liveContests);
      setIsContestVisible(true);

      fillRadioButtons(res.participationAmount); // call function to fill radio buttons
      startCountdown(res.nextQuizTime); // Start the countdown based on quiz time
    } catch (error) {
      console.log('error', error);
      Alert.alert(error?.response?.data?.message);
    }
  };


  const handleCardPress = (name) => {
    alert(`You selected: ${name}`);
  };

  const fillRadioButtons = (participationAmount) => {
    const selectedAmountIndex = participationAmount.findIndex(item => item.tick); // find index of selected amount
    if (selectedAmountIndex !== -1) {
      setSelectedRadio(selectedAmountIndex); // set the selected radio index based on tick status
    }
  };

  const handleRadioPress = (index) => {
    setSelectedRadio(index); // update selected radio index
  };

  const startCountdown = (quizTime) => {
    const interval = setInterval(() => {
      updateTimeLeft(quizTime, interval);
    }, 1000);
  };

  const updateTimeLeft = (quizTime, interval) => {
    const now = new Date();
    const quizDate = new Date(quizTime);
    const timeDiff = quizDate - now;

    if (timeDiff > 0) {
      const remainingSeconds = Math.floor(timeDiff / 1000); // Convert milliseconds to seconds
      setTimeLeft(formatTime(remainingSeconds)); // Update the countdown with formatted time
    } else {
      setTimeLeft('00:00');
      clearInterval(interval); // Stop the countdown once time is up
    }
  };

  const formatTime = (remainingSeconds) => {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleSubmit = () => {
    navigation.navigate('Topic');
  };

  const handleWalletNavigation = () => {
    navigation.navigate('Wallet'); // Navigate to the Wallet screen
  };

  const handlePavailionNavigation = () => {
    navigation.navigate('Pavilion'); // Navigate to the Wallet screen
  };

  const handleProfile1Navigation = () => {
    navigation.navigate('Profile1'); // Navigate to the Wallet screen
  };

  const handleDrawerOpen = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={styles.bg}>
      <Image
        source={require('../assets/Group.png')}
        style={styles.backgroundImage}
      />
      <StatusBar hidden={true} />

      <View style={styles.header}>
        <TouchableOpacity onPress={handleProfile1Navigation}>
          <View style={styles.icon}>
            <Image
              source={require('../assets/profile_avatar.png')}
              style={styles.iconImage}
            />
          </View>
        </TouchableOpacity>

        <Image
          source={require('../assets/Exye_Logo_B1.png')}
          style={styles.logo}
        />

        <TouchableOpacity onPress={handleDrawerOpen}>
          <View style={styles.icon2}>
            <Image
              source={require('../assets/hamburgerMenu.png')}
              style={styles.iconImage2}
            />
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.view1}>
          <Text style={styles.text1}>Next quiz in {timeLeft}</Text>
          <Image
            source={require('../assets/stopwatch_icon.png')}
            style={styles.icon1}
          />
        </View>

        {profiledata?.liveContests?.length > 0 ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: carouselScrollX } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
            contentContainerStyle={styles.carouselContent}
          >
            {profiledata.liveContests.map((item, index) => (
              <Animated.View
                key={index}
                style={[styles.contestContainer, {
                  opacity: carouselScrollX.interpolate({
                    inputRange: [
                      (index - 1) * 360,
                      index * 360,
                      (index + 1) * 360,
                    ],
                    outputRange: [0.5, 1, 0.5],
                    extrapolate: 'clamp',
                  })
                }]}
              >
                <Image
                  source={require('../assets/contestBG.png')}
                  style={styles.contestBackground}
                />


                <TouchableOpacity
                  style={styles.cardContent}
                  onPress={() => handleCardPress(item.name)}
                  
                >
                  <Text style={styles.contestText1}>{item.contestName}</Text>
                  <Text style={styles.contestText2}>{item.contestType}</Text>
                  <Text style={styles.contestText3}>Prize: Rs.{item.prizePerContestant}</Text>

                </TouchableOpacity>

                <View style={styles.progressBarContainer}>
                  <LinearGradient
                    colors={['#FF612F', '#A32FFF8F']} // Gradient colors
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    // style={[styles.progressBar, { width: `${Math.min((item.playerJoined / 20), 1) * 100}%` }]}
                    style={[styles.progressBar, { width: `${Math.min((14 / 20), 1) * 100}%` }]}
                  />
                </View>

              </Animated.View>
            ))}
          </ScrollView>
        ) : (
          null
        )}



        {/* <View style={styles.view2}>
          <Text style={styles.text2}>Choose amount for participation :</Text>

          <View style={styles.radioContainer}>
            {profiledata?.participationAmount?.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleRadioPress(index)}
                style={styles.radioWrapper}>
                <View style={styles.radio}>
                  {selectedRadio === index ? <View style={styles.radioFill} /> : null}
                </View>
                <Text style={styles.radioText}>₹ {item.amount}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View> */}

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Live', {
              LiveContestData: profiledata?.liveContests,
            });
          }}>
          <LinearGradient
            colors={['#FFA952', '#F05A5B']}
            style={styles.view3}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}>
            <Text style={styles.text3}>Live Contest</Text>
            <Image
              source={require('../assets/live_contest_image.png')}
              style={styles.image3}
            />
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Topic')}>
          <View style={styles.view4}>
            <Text style={styles.text4}>Demo Contest</Text>
            <Image
              source={require('../assets/semiRect2.png')}
              style={styles.cardImage}
            />
          </View>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={[styles.submitButton, { backgroundColor: isSubmitDisabled ? 'green' : 'green' }]}
          onPress={handleSubmit}>
          <Text style={styles.submitText}>SUBMIT</Text>
        </TouchableOpacity> */}
      </ScrollView>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <Pressable style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContents}>
              <Text
                style={{
                  fontSize: 20,
                  color: '#fa5962',
                  fontWeight: '500',
                  fontFamily: 'Poppins-Regular',
                }}>
                Hello User
              </Text>
              <TouchableOpacity
                style={{ marginTop: 15 }}
                onPress={handleProfile1Navigation}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    fontFamily: 'Poppins-Regular',
                  }}>
                  Profile
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginTop: 15 }}
                onPress={handleWalletNavigation}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    fontFamily: 'Poppins-Regular',
                  }}>
                  Wallet
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginTop: 15 }}
                onPress={handlePavailionNavigation}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    fontFamily: 'Poppins-Regular',
                  }}>
                  Pavilion
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>

      <TouchableOpacity
        onPress={() => { }}
        style={styles.xyz}>
        <Image
          source={require('../assets/filledHome.png')}
          style={styles.bottomNavIcons}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleWalletNavigation}
        style={styles.WalletIcon}>
        <Image
          source={require('../assets/unfilledWallet.png')}
          style={styles.bottomNavIcons}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handlePavailionNavigation}
        style={styles.NotificationIcon}>
        <Image
          source={require('../assets/notification.png')}
          style={styles.bottomNavIcons}
        />
      </TouchableOpacity>

      <Image
        source={require('../assets/BottomNav.png')}
        resizeMode="contain"
        style={styles.image}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#e9e9e9',
  },
  header: {
    flexDirection: 'row',
    height: 'auto',
    backgroundColor: '#ffa952',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 42.5,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    margin: 8,
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    borderColor: '#EF5A5A',
    borderWidth: 2,
  },
  iconImage: {
    width: 40,
    height: 40,
    borderRadius: 42.5,
  },
  icon2: {
    width: 50,
    height: 50,
    borderRadius: 42.5,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    margin: 10,
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    borderColor: '#EF5A5A',
    borderWidth: 2,
  },
  iconImage2: {
    width: 30,
    height: 30,
  },
  logo: {
    flex: 1,
    width: 40,
    height: 40,
  },
  scrollContainer: {
    width: '100%',
    margin: 5,
    padding: '18',
    alignSelf: 'center',
  },
  view1: {
    width: '90%',
    height: 'auto',
    backgroundColor: '#F05A5B',
    alignSelf: 'center',
    margin: 15,
    borderRadius: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 8,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  text1: {
    fontSize: 24,
    color: 'white',
    fontWeight: '700',
    marginLeft: 15,
    fontFamily: 'Poppins-Regular',
  },
  icon1: {
    width: 40,
    height: 40,
    borderRadius: 42.5,
    margin: 6,
    marginRight: 15,
  },
  contestContainer: {
    width: 360,
    height: 'auto',
    alignItems: 'center',
    marginLeft:17,
    marginTop:7,
    borderRadius:35,
    borderColor:'white',
    borderWidth:2,
    backgroundColor: 'transparent', // Ensure container doesn't have an extra background color
  },
  contestBackground: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    resizeMode: 'stretch',
    borderRadius:35,
  },
  carouselContent: {
    alignItems: 'center',
    paddingRight:15,
  },
  contestText1: {
    fontSize: 24,
    color: 'white',
    marginTop: 10,
    fontWeight: '900',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  contestText2: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    marginTop: 12,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  contestText3: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
    marginTop: 8,
    letterSpacing: 2,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  progressBarContainer: {
    width: '60%',
    marginTop: 20,
    borderRadius: 20,
    padding: 3,
    backgroundColor: '#D9D9D9',
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 30
  },
  progressBar: {
    height: 16,
    borderRadius: 20,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  view2: {
    width: '90%',
    height: 'auto',
    backgroundColor: '#FFA952',
    alignSelf: 'center',
    borderRadius: 35,
    elevation: 8,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    borderColor: 'white',
    borderWidth: 2,
  },
  text2: {
    fontSize: 22,
    color: 'white',
    fontWeight: '700',
    margin: 20,
    fontFamily: 'Poppins-Regular',
  },
  view3: {
    width: '90%',
    height: 'auto',
    backgroundColor: '#FFA952',
    marginTop: 20,
    alignSelf: 'center',
    borderRadius: 35,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    borderColor: 'white',
    borderWidth: 2,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    verticalAlign: 'middle',
  },
  text3: {
    fontSize: 28,
    color: 'white',
    fontWeight: '600',
    alignSelf: 'center',
    margin: 15,
    fontFamily: 'Poppins-Regular',
  },
  image3: {
    width: 111,
    height: 133,
    margin: 20,
    alignSelf: 'center',
  },
  view4: {
    width: '90%',
    height: 60,
    backgroundColor: '#Ffffdf',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 8,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  cardImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    height: '100%',
  },
  text4: {
    position: 'absolute',
    fontSize: 36,
    color: '#ffa952',
    fontWeight: '700',
    zIndex: 1,
    fontFamily: 'Poppins-Regular',
  },
  submitButton: {
    width: '60%',
    height: 'auto',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 70,
    borderRadius: 40,
    borderColor: 'white',
    borderWidth: 2,
    alignItems: 'center',
    paddingVertical: 10,

    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
  },
  radioContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    justifyContent: 'space-between',
  },
  radioWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '22%', // Adjust to fit four items in a row and create even spacing
    marginBottom: 15,
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  radioFill: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#F05A5B',
  },
  radioText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '700',
    fontFamily: 'Poppins-Regular',
  },
  backgroundImage: {
    width: '100%',
    height: '80%',
    position: 'absolute',
    resizeMode: 'contain',
    top: 90,
    left: 0,
  },
  image: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    resizeMode: 'stretch',
  },
  xyz: {
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
    height: 70,
    width: 70,
    left: '35%',
  },
  WalletIcon: {
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
    height: 70,
    width: 70,
    left: '1%',
  },
  NotificationIcon: {
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
    height: 70,
    width: 70,
    right: '10%',
  },
  bottomNavIcons: {
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
    height: 70,
    width: 70,
    left: '40%',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    width: '60%',
    backgroundColor: 'white',
    padding: 20,
    height: '100%',
    left: 0,
  },
  modalContents: {
    width: '100%',
  },
});

export default HomeScreen;