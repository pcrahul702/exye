import { useNavigation, DrawerActions, useFocusEffect } from '@react-navigation/native';
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
  Dimensions,
  BackHandler,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { getData } from '../Utils/api';
import Toast from 'react-native-toast-message';
import { getAccessToken } from '../Utils/getAccessToken';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const [dashboardData, setDashboardData] = useState([]);
  const [liveContestsData, setLiveContestsData] = useState([]);
  const [isContestVisible, setIsContestVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');
  const [imageUris, setImageUris] = useState({});
  const carouselScrollX = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation();

  useEffect(() => {

    getDashboardData();

    const interval = setInterval(() => {
      getDashboardData();
    }, 5000);

    // Clean up interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const getDashboardData = async () => {
    try {


      const res = await getData('/api/v1/dashboard');
      setDashboardData(res);
      setLiveContestsData(res.liveContests);
      setIsContestVisible(true);

      startCountdown(res.nextQuizTime); // Start the countdown based on quiz time

      // Fetch images and topic names for live contests
      const imageUris = {};
      for (const contest of res.liveContests) {
        const result = await getImageUri(contest.topicId);
        if (result) {
          imageUris[contest.topicId] = result;  // Store both image and topic name by topicId
        }
      }

      setImageUris(imageUris);  // Update state with all the image URIs
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log('Unauthorized access - 401');
        navigation.navigate('Login');
      }
      else {
        Alert.alert(error?.response?.data?.message || 'Please check internet.');
      }
    }
  };

  const getImageUri = async (id) => {
    try {
      const res = await getData(`/api/v1/profile/topic/${id}`);
      return {
        imageUri: { uri: res.data.preSignedTopicUrl },
        topicName: res.data.topicName // Assuming the API response has `topicName`
      };
    } catch (error) {
      console.log('error', error);
      return null; // Return null if there's an error fetching the image
    }
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
    const hours = Math.floor(remainingSeconds / 3600); // Calculate hours
    const minutes = Math.floor((remainingSeconds % 3600) / 60); // Calculate remaining minutes
    const seconds = remainingSeconds % 60; // Calculate remaining seconds

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };


  const handleLiveNavigation = () => {
    navigation.navigate('Live');
  };

  const handleWalletNavigation = () => {
    navigation.navigate('Wallet');
  };

  const handlePavailionNavigation = () => {
    navigation.navigate('Pavilion');
  };

  const handleProfileNavigation = () => {
    navigation.navigate('Profile');
  };

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

  const handleContestClick = (contest) => {
    console.log(contest.userContestStatus);
    if (contest.userContestStatus === 'NEW') {
      console.log('5555');
      navigation.navigate('LiveDetails', { contestId: contest.contestId });
    }
    else if (contest.userContestStatus === 'JOINED') {
      console.log('6666');
      showToast('info', 'You have already joined this contest.')
      navigation.navigate('QuizChoice', { contestId: contest.contestId, topicId: contest.topicId });
    }
    else if (contest.userContestStatus === 'STARTED') {
      console.log('7777');
      console.log('heyy');
      showToast('info', 'You have already joined this contest.')
      navigation.navigate('QuizChoice', { contestId: contest.contestId, topicId: contest.topicId });
    }
    else if (contest.userContestStatus === 'ENDED') {
      console.log('8888');
      showToast('info', 'You have already played this contest.')
      navigation.navigate('PreviousDetails', { contestId: contest.contestId });
    }
  };

  const handleDrawerOpen = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };
  

  useEffect(() => {
    // Function to handle back press behavior on HomeScreen
    const handleBackPress = () => {
      const currentScreen = navigation.getState().routes[navigation.getState().index].name;
      console.log(currentScreen);

      // If we're on the Home screen, exit the app
      if (currentScreen === 'Dashboard') {
        BackHandler.exitApp(); // Exit the app
        return true; // Prevent default back behavior
      } else {
        // Let React Navigation handle the back action
        return false;
      }
    };

    // Add the event listener for back press
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    // Clean up the listener when the component is unmounted
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [navigation]);

  return (
    <View style={styles.bg}>
      <Image
        source={require('../assets/Group.png')}
        style={styles.backgroundImage}
      />
      <StatusBar hidden={true} />

      <View style={styles.header}>
        <TouchableOpacity onPress={handleProfileNavigation}>
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
        {dashboardData?.liveContests?.length > 0 ? (
          <TouchableOpacity
            style={styles.view1}
            onPress={() => handleContestClick(dashboardData.liveContests[0])}
          >

            <Text style={styles.text1}>Next quiz in {timeLeft}</Text>


            <Image
              source={require('../assets/stopwatch_icon.png')}
              style={styles.icon1}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.view1}
            onPress={() => showToast('info', 'No upcoming quiz at present ')}
          >
            <Text style={styles.text1}>No upcoming quiz... </Text>
            <Image
              source={require('../assets/stopwatch_icon.png')}
              style={styles.icon1}
            />
          </TouchableOpacity>
        )}

        {dashboardData?.liveContests?.length > 0 ? (
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
            {dashboardData.liveContests.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleContestClick(item)}
              >
                <LinearGradient
                  colors={['#F05A5B', '#FFA952']}
                  style={styles.contestContainer}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >

                  <View style={styles.leftArrowIcon}>
                    <Image source={require('../assets/leftArrowIcon.png')} style={styles.cardArrowImage} />
                  </View>

                  <View style={styles.leftSide}>
                    <Text style={styles.contestText}>
                      Topic : {imageUris[item.topicId]?.topicName || 'Loading...'}
                    </Text>
                    <Text style={styles.contestText}>Prize : ₹{item.prizePerContestant}</Text>
                    <Text style={styles.contestText}>Entry Fee : ₹{item.entryAmount}</Text>
                  </View>

                  <View style={styles.rightSide}>
                    {/* Use the fetched image URI */}
                    {imageUris[item.topicId] ? (
                      <Image
                        source={imageUris[item.topicId]?.imageUri} // Correctly access the imageUri
                        style={styles.topicImage}
                      />
                    ) : (
                      <Text style={[styles.loadingText, { color: 'white' }]}>Loading...</Text>
                    )}
                  </View>

                  <View style={styles.rightArrowIcon}>
                    <Image source={require('../assets/rightArrowIcon.png')} style={styles.cardArrowImage} />
                  </View>


                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.loadingText}>No live contests available</Text>
        )}

        <TouchableOpacity onPress={handleLiveNavigation} activeOpacity={0.7} >
          <LinearGradient
            colors={['#FFA952', '#F05A5B']}
            style={styles.view3}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.text3}>Live Contest</Text>
            <Image
              source={require('../assets/live_contest_image.png')}
              style={styles.image3}
            />
          </LinearGradient>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => navigation.navigate('Topic')}
         activeOpacity={0.7}
          style={styles.shadowBox}>
          <View style={styles.view4}>
            <Text style={styles.text4}>Create your Own</Text>
            <Image
              source={require('../assets/semiRect2.png')}
              style={styles.cardImage}
            />
          </View>
        </TouchableOpacity> */}


      </ScrollView>

      {/* Bottom Navigation Bar */}

      <TouchableOpacity onPress={handleWalletNavigation} style={styles.WalletIcon}>
        <Image
          source={require('../assets/unfilledWallet.png')}
          style={styles.bottomNavIcons}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => { }} style={styles.HomeIcon}>
        <Image
          source={require('../assets/filledHome.png')}
          style={styles.bottomNavIcons}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={handlePavailionNavigation} style={styles.NotificationIcon}>
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
    resizeMode:'contain',
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
    flexDirection: 'row',
    width: width * 0.9,
    height: 'auto',
    marginLeft: width * 0.05,
    marginTop: 7,
    borderRadius: 35,
    borderColor: 'white',
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  leftSide: {
    height: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    padding: 14
  },
  contestText: {
    fontSize: 15,
    color: 'white',
    fontWeight: '600',
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
  },
  leftArrowIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 14,
  },
  rightArrowIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  cardArrowImage: {
    flex: 1,
    width: 9,
    height: 25,
    resizeMode: 'contain',
  },
  rightSide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 14,
  },
  topicImage: {
    flex: 1,
    width: 130,
    height: 140,
    resizeMode: 'stretch',
    borderRadius: 14,
  },
  carouselContent: {
    alignItems: 'center',
    paddingRight: 15,
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
    elevation: 5, // For Android shadow
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 4 }, // Offset shadow by 4 units
    shadowOpacity: 0.3, // Shadow transparency
    shadowRadius: 5, // Radius of the shadow blur
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
    width: '100%',
    height: 60,
    alignSelf: 'center',
    borderRadius: 20,
    justifyContent: 'center',
  },
  shadowBox: {
    width: '90%',
    height: 60,
    backgroundColor: '#FFFFDF',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 20,
    elevation: 8,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
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
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
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
  WalletIcon: {
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
    height: 70,
    width: 70,
    left: '5%',
  },
  HomeIcon: {
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
    height: 70,
    width: 70,
    alignSelf: 'center'
  },
  NotificationIcon: {
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
    height: 70,
    width: 70,
    right: '5%',
  },
  bottomNavIcons: {
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
    height: 70,
    width: 70,
  },
  loadingText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#FFA952',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
});

export default HomeScreen;