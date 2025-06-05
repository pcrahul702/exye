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
  Alert,
  Animated,
  BackHandler,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { getData } from '../Utils/api';
import Toast from 'react-native-toast-message';
import { getAccessToken } from '../Utils/getAccessToken';
import ContestCard from '../components/ContestCard';

const HomeScreen = () => {

  const [dashboardData, setDashboardData] = useState({});
  const [liveContestsData, setLiveContestsData] = useState([]);
  const [timeLeft, setTimeLeft] = useState('');
  const [imageUris, setImageUris] = useState({});
  const [currentContestIndex, setCurrentContestIndex] = useState(0);
  const [countdownIntervals, setCountdownIntervals] = useState({});
  const [contestTimers, setContestTimers] = useState({}); // Store timer values for each contest
  const carouselScrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const currentContestIndexRef = useRef(0); // Ref to track current index for intervals

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
    const token = await getAccessToken();
    console.log(token);
    try {
      // Get data from API
      const res = await getData('/api/v1/dashboard');
      console.log("res", res);

      // Parse the response if it's a string (JSON)
      let dashboardData;
      if (typeof res === 'string') {
        try {
          dashboardData = JSON.parse(res);
        } catch (e) {
          console.log('Error parsing JSON:', e);
          dashboardData = res; // Use as is if parsing fails
        }
      } else {
        dashboardData = res; // Use as is if already an object
      }

      setDashboardData(dashboardData);
      setLiveContestsData(dashboardData.liveContests || []);

      // Start countdown for all live contests
      if (dashboardData.liveContests && dashboardData.liveContests.length > 0) {
        // Reset current contest index to 0
        setCurrentContestIndex(0);
        currentContestIndexRef.current = 0;

        startMultipleCountdowns(dashboardData.liveContests);

        // Set initial timer display for the first contest
        const firstContest = dashboardData.liveContests[0];
        const quizTime = firstContest.nextQuizTime || firstContest.whenToStart;
        if (quizTime) {
          // Calculate initial time left for display
          const now = new Date();
          const quizDate = new Date(quizTime);
          const timeDiff = quizDate - now;
          if (timeDiff > 0) {
            const remainingSeconds = Math.floor(timeDiff / 1000);
            setTimeLeft(formatTime(remainingSeconds));
          } else {
            setTimeLeft('00:00');
          }
        }
      } else if (dashboardData.nextQuizTime) {
        startCountdown(dashboardData.nextQuizTime);
      }

      // Fetch images and topic names for live contests
      const imageUris = {};
      if (dashboardData.liveContests && dashboardData.liveContests.length > 0) {
        for (const contest of dashboardData.liveContests) {
          const result = await getImageUri(contest.topicId);
          if (result) {
            imageUris[contest.topicId] = result;  // Store both image and topic name by topicId
          }
        }
      }

      setImageUris(imageUris);  // Update state with all the image URIs
    } catch (error) {
      console.log('Error fetching dashboard data:', error);
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
        imageUri: { uri: res.data.topicImageUrl },
        topicName: res.data.topicName // Assuming the API response has `topicName`
      };
    } catch (error) {
      console.log('error', error);
      return null; // Return null if there's an error fetching the image
    }
  };

  const startMultipleCountdowns = (contests) => {
    // Clear existing intervals
    Object.values(countdownIntervals).forEach(interval => clearInterval(interval));

    const newIntervals = {};
    const initialTimers = {};

    contests.forEach((contest, index) => {
      const quizTime = contest.nextQuizTime || contest.whenToStart;
      if (quizTime) {
        // Calculate initial timer value
        const now = new Date();
        const quizDate = new Date(quizTime);
        const timeDiff = quizDate - now;
        const remainingSeconds = timeDiff > 0 ? Math.floor(timeDiff / 1000) : 0;
        initialTimers[index] = remainingSeconds > 0 ? formatTime(remainingSeconds) : '00:00';

        const interval = setInterval(() => {
          updateTimeLeft(quizTime, interval, index);
        }, 1000);
        newIntervals[index] = interval;
      }
    });

    setCountdownIntervals(newIntervals);
    setContestTimers(initialTimers);
  };

  const updateTimeLeft = (quizTime, interval, contestIndex) => {
    const now = new Date();
    const quizDate = new Date(quizTime);
    const timeDiff = quizDate - now;

    if (timeDiff > 0) {
      const remainingSeconds = Math.floor(timeDiff / 1000);
      const formattedTime = formatTime(remainingSeconds);

      // Update the stored timer value for this contest
      setContestTimers(prev => ({
        ...prev,
        [contestIndex]: formattedTime
      }));

      // Only update the displayed timeLeft if this is the currently visible contest
      if (contestIndex === currentContestIndexRef.current) {
        setTimeLeft(formattedTime);
      }
    } else {
      // Update the stored timer value for this contest
      setContestTimers(prev => ({
        ...prev,
        [contestIndex]: '00:00'
      }));

      // Only update the displayed timeLeft if this is the currently visible contest
      if (contestIndex === currentContestIndexRef.current) {
        setTimeLeft('00:00');
      }

      clearInterval(interval);
      // Remove this interval from the state
      setCountdownIntervals(prev => {
        const updated = { ...prev };
        delete updated[contestIndex];
        return updated;
      });
    }
  };

  const startCountdown = (quizTime) => {
    const interval = setInterval(() => {
      const now = new Date();
      const quizDate = new Date(quizTime);
      const timeDiff = quizDate - now;

      if (timeDiff > 0) {
        const remainingSeconds = Math.floor(timeDiff / 1000);
        setTimeLeft(formatTime(remainingSeconds));
      } else {
        setTimeLeft('00:00');
        clearInterval(interval);
      }
    }, 1000);
    return interval;
  };

  const formatTime = (remainingSeconds) => {
    const days = Math.floor(remainingSeconds / (24 * 3600));
    const hours = Math.floor((remainingSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    const seconds = remainingSeconds % 60;

    if (days > 0) {
      return `${days}d ${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m`;
    } else if (hours > 0) {
      return `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m`;
    } else {
      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
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

  const scrollToContest = (index) => {
    if (scrollViewRef.current && liveContestsData.length > 0) {
      const cardWidth = 365; // contestTouchable width + marginRight (350 + 15)
      scrollViewRef.current.scrollTo({
        x: index * cardWidth,
        animated: true
      });
      updateCurrentContestTimer(index);
    }
  };

  const updateCurrentContestTimer = (index) => {
    setCurrentContestIndex(index);
    currentContestIndexRef.current = index; // Update the ref immediately

    // Use the stored timer value if available, otherwise calculate it
    if (contestTimers[index]) {
      setTimeLeft(contestTimers[index]);
    } else {
      // Fallback: calculate timer for the new contest
      const contest = liveContestsData[index];
      const quizTime = contest?.nextQuizTime || contest?.whenToStart;
      if (quizTime) {
        const now = new Date();
        const quizDate = new Date(quizTime);
        const timeDiff = quizDate - now;
        if (timeDiff > 0) {
          const remainingSeconds = Math.floor(timeDiff / 1000);
          const formattedTime = formatTime(remainingSeconds);
          setTimeLeft(formattedTime);
          // Store this calculated value
          setContestTimers(prev => ({
            ...prev,
            [index]: formattedTime
          }));
        } else {
          setTimeLeft('00:00');
          setContestTimers(prev => ({
            ...prev,
            [index]: '00:00'
          }));
        }
      }
    }
  };

  const handleLeftArrow = () => {
    if (currentContestIndex > 0) {
      scrollToContest(currentContestIndex - 1);
    }
  };

  const handleRightArrow = () => {
    if (currentContestIndex < liveContestsData.length - 1) {
      scrollToContest(currentContestIndex + 1);
    }
  };


  useEffect(() => {
    // Update timer display when currentContestIndex changes
    currentContestIndexRef.current = currentContestIndex; // Keep ref in sync

    if (liveContestsData.length > 0 && liveContestsData[currentContestIndex]) {
      // Use stored timer value if available
      if (contestTimers[currentContestIndex]) {
        setTimeLeft(contestTimers[currentContestIndex]);
      } else {
        // Fallback: calculate timer value
        const contest = liveContestsData[currentContestIndex];
        const quizTime = contest?.nextQuizTime || contest?.whenToStart;
        if (quizTime) {
          const now = new Date();
          const quizDate = new Date(quizTime);
          const timeDiff = quizDate - now;
          if (timeDiff > 0) {
            const remainingSeconds = Math.floor(timeDiff / 1000);
            const formattedTime = formatTime(remainingSeconds);
            setTimeLeft(formattedTime);
          } else {
            setTimeLeft('00:00');
          }
        }
      }
    }
  }, [currentContestIndex, liveContestsData, contestTimers]);

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
      // Clean up all countdown intervals
      Object.values(countdownIntervals).forEach(interval => clearInterval(interval));
    };
  }, [navigation, countdownIntervals]);

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
        {liveContestsData?.length > 0 ? (
          <TouchableOpacity
            style={styles.view1}
            onPress={() => handleContestClick(liveContestsData[currentContestIndex])}
          >
            <Text style={styles.text1}>Quiz Ends in {timeLeft}</Text>
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
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}

        {liveContestsData?.length > 0 ? (
          <View style={styles.contestSection}>
            {/* Contest Cards Container - Full Width */}
            <View style={styles.contestCarouselContainer}>
              <ScrollView
                ref={scrollViewRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { x: carouselScrollX } } }],
                  { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
                contentContainerStyle={styles.carouselContent}
                style={styles.carouselContainer}
                onMomentumScrollEnd={(event) => {
                  const cardWidth = 365; // contestTouchable width + marginRight (350 + 15)
                  const newIndex = Math.round(event.nativeEvent.contentOffset.x / cardWidth);
                  if (newIndex !== currentContestIndex && newIndex >= 0 && newIndex < liveContestsData.length) {
                    updateCurrentContestTimer(newIndex);
                  }
                }}
                pagingEnabled={false}
                snapToInterval={365} // 350 + 15 (card width + margin)
                snapToAlignment="start"
                decelerationRate="fast"
              >
                {liveContestsData.map((item, index) => (
                  <ContestCard
                    key={index}
                    contest={item}
                    imageUri={imageUris[item.topicId]?.imageUri}
                    topicName={imageUris[item.topicId]?.topicName}
                    onPress={handleContestClick}
                  />
                ))}
              </ScrollView>
            </View>

            {/* Navigation Arrows Below Cards */}
            {liveContestsData.length > 1 && (
              <View style={styles.arrowsContainer}>
                <TouchableOpacity
                  style={styles.carouselArrowLeft}
                  onPress={handleLeftArrow}
                  disabled={currentContestIndex === 0}
                >
                  <Image
                    source={require('../assets/leftArrowIcon.png')}
                    style={[styles.carouselArrowIcon, { opacity: currentContestIndex === 0 ? 0.3 : 1 }]}
                  />
                </TouchableOpacity>

                {/* Contest Indicator Dots */}
                <View style={styles.dotsContainer}>
                  {liveContestsData.map((_, index) => (
                    <View
                      key={index}
                      style={[
                        styles.dot,
                        { backgroundColor: index === currentContestIndex ? '#F05A5B' : '#D3D3D3' }
                      ]}
                    />
                  ))}
                </View>

                <TouchableOpacity
                  style={styles.carouselArrowRight}
                  onPress={handleRightArrow}
                  disabled={currentContestIndex === liveContestsData.length - 1}
                >
                  <Image
                    source={require('../assets/rightArrowIcon.png')}
                    style={[styles.carouselArrowIcon, { opacity: currentContestIndex === liveContestsData.length - 1 ? 0.3 : 1 }]}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
         ) : (
          <Text style={styles.loadingText}>No live contests available</Text>
        )}

        <TouchableOpacity onPress={handleLiveNavigation} activeOpacity={0.7}  >
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
    alignSelf: 'center',
    paddingHorizontal: 15,
  },
  view1: {
    width: '100%',
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
    width: "100%",
    height: 'auto',
    marginTop: 7,
    marginBottom: 10, // Added margin bottom for spacing between cards
    borderRadius: 35,
    borderColor: 'white',
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  leftSide: {
    height: '100%',
    flex: 1, // Increased flex to give more space for text
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    padding: 14
  },
  contestText: {
    fontSize: 14, // Slightly smaller font to fit more text
    color: 'white',
    fontWeight: '600',
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
    marginBottom: 4, // Added margin between text lines
  },
  leftArrowIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  rightArrowIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
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
  contestSection: {
    marginVertical: 5,
  },
  contestCarouselContainer: {
    // paddingHorizontal: 20,
  },
  arrowsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 80,
    marginTop: 15,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  carouselArrowLeft: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  carouselArrowRight: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  carouselArrowIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    tintColor: '#F05A5B',
  },
  carouselContainer: {
    flex: 1,
    // width:"100%"
  },
  carouselContent: {
    // width:"100%",
    alignItems: 'center',
    paddingRight: 20,
  },
  view3: {
    
    width: '100%',
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