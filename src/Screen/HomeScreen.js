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
  Alert,
  Animated,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { getData } from '../Utils/api';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const [dashboardData, setDashboardData] = useState([]);
  const [liveContestsData, setLiveContestsData] = useState([]);
  const [isContestVisible, setIsContestVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');
  const carouselScrollX = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation();

  useFocusEffect(
      React.useCallback(() => {
        getDashboardData(); 
      }, []) 
    );

  const getDashboardData = async () => {
    try {
      const res = await getData('/api/v1/dashboard');

      setDashboardData(res);
      console.log(dashboardData.liveContests);
      setLiveContestsData(dashboardData.liveContests);
      setIsContestVisible(true);

      startCountdown(res.nextQuizTime); // Start the countdown based on quiz time
    } catch (error) {
      console.log('error', error);
      Alert.alert(error?.response?.data?.message);
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
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
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

  const handleProfile1Navigation = () => {
    navigation.navigate('Profile1');
  };

  const handleContestClick = (contestId) => {
    navigation.navigate('LiveDetails', { contestId: contestId }); // Navigate to the Wallet screen
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
                onPress={() => handleContestClick(item.contestId)}>

                <LinearGradient
                  colors={['#F05A5B', '#FFA952']}
                  style={styles.contestContainer}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}>

                  <Text style={styles.contestText1}>Topic : {item.contestName}</Text>
                  <Text style={styles.contestText1}>Prize : ₹{item.prizePerContestant}</Text>
                  <Text style={styles.contestText1}>Entry Fee : ₹{item.entryAmount}</Text>

                </LinearGradient>

              </TouchableOpacity>

            ))}
          </ScrollView>
        ) : (
          null
        )}


        <TouchableOpacity
          onPress={handleLiveNavigation}>
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
            <Text style={styles.text4}>Create your Own</Text>
            <Image
              source={require('../assets/semiRect2.png')}
              style={styles.cardImage}
            />
          </View>
        </TouchableOpacity>
      </ScrollView>


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
    width: width * 0.9,
    height: 'auto',
    marginLeft: width * 0.05,
    marginTop: 7,
    paddingHorizontal:20,
    paddingBottom:14,
    borderRadius: 35,
    borderColor: 'white',
    borderWidth: 2,
    backgroundColor: 'transparent', // Ensure container doesn't have an extra background color
  },
  carouselContent: {
    alignItems: 'center',
    paddingRight: 15,
  },
  contestText1: {
    fontSize: 15,
    color: 'white',
    marginTop:14,
    fontWeight: '600',
    textAlign: 'left',
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
    width:'100%',
    textAlign:'center',
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
});

export default HomeScreen;