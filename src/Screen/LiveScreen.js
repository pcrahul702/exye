import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import backgroundImage from '../assets/Group.png';
import uppershaper from '../assets/uppershape.png';
import upperLog from '../assets/Upperlogo2.png';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { getData } from '../Utils/api';

const { width, height } = Dimensions.get('window');

const LiveScreen = () => {

  const navigation = useNavigation();
  const [dashboardData, setDashboardData] = useState([]);
  const [liveContestsData, setLiveContestsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      getDashboardData();
    }, [])
  );

  const getDashboardData = async () => {
    try {
      setIsLoading(true); // Start loading
      const res = await getData('/api/v1/dashboard');
      setDashboardData(res);
      setLiveContestsData(res.liveContests);
    } catch (error) {
      console.log('error', error);
      Alert.alert(error?.response?.data?.message);
    } finally {
      setIsLoading(false); // Stop loading after data is fetched
    }
  };

  const handleHomeNavigation = () => {
    navigation.navigate('Dashboard');
  };

  const handleWalletNavigation = () => {
    navigation.navigate('Wallet'); // Navigate to the Wallet screen
  };

  const handleLiveDetailsNavigation = () => {
    navigation.navigate('LiveDetails'); // Navigate to the LiveDetails screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={uppershaper} style={styles.uppershape} />
      <Image source={backgroundImage} style={styles.backgroundImage} />
      <Image source={upperLog} style={styles.upperLog} />

      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Scroll to see your contests</Text>
      </View>

      {isLoading ? (
        <View style={styles.loaderContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollView}>
          {liveContestsData && liveContestsData.length > 0 ? (
            liveContestsData.map(contest => (
              <TouchableOpacity
                key={contest.contestId}
                onPress={handleLiveDetailsNavigation}
                style={styles.touchableOpacity}>
                <View style={styles.contestContainer}>
                  <Image
                    source={require('../assets/contestBG.png')}
                    style={styles.contestBackground}
                  />
                  <Text style={styles.contestText1}>Topic Name</Text>
                  <Text style={styles.contestText2}>
                    Now Playing: {contest.playerJoined || 0}
                  </Text>
                  <Text style={styles.contestText3}>
                    Prize Poll per Contestant: ₹ {contest.prizePerContestant}
                  </Text>
                  <View style={styles.progressBarContainer}>
                    <LinearGradient
                      colors={['#FF612F', '#A32FFF8F']} // Gradient colors
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={[
                        styles.progressBar,
                        { width: `${((contest.playerJoined || 0) / 20) * 100}%` },
                      ]}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noContentText}>No contests available at this moment.</Text>
          )}
        </ScrollView>
      )}

      <TouchableOpacity onPress={handleHomeNavigation} style={styles.xyz}>
        <Image
          source={require('../assets/unfilledHome.png')}
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
        onPress={() => {
          /* Handle onPress event */
        }}
        style={styles.NotificationIcon}>
        <Image
          source={require('../assets/filledNotification.png')}
          style={styles.bottomNavIcons}
        />
      </TouchableOpacity>
      <Image
        source={require('../assets/BottomNav.png')}
        style={styles.bottomNav}
      />
    </SafeAreaView>
  );
};

export default LiveScreen;

const styles = StyleSheet.create({
  uppershape: {
    width: '100%',
    resizeMode: 'stretch',
  },
  upperLog: {
    alignSelf: 'center',
    marginTop: -50,
    height: 100,
    width: 100,
  },
  backgroundImage: {
    position: 'absolute',
    top: 139,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: 'cover',
  },
  noContentText: {
    fontSize: 18,
    color: 'gray',
    marginTop: 20,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  headerContainer: {
    width: '90%',
    backgroundColor: '#FFA952',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  headerText: {
    alignSelf: 'center',
    fontSize: 22,
    fontWeight: '500',
    color: '#ffffff',
    fontFamily: 'Poppins-Regular',
    padding: 7,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    alignSelf: 'center',
    width: '100%',
    alignItems: 'center',
    paddingBottom: 130,
    marginTop: 15,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: height - 150, // Adjust height as needed
  },
  loadingText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#FFA952',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  touchableOpacity: {
    width: '90%',
    marginVertical: 4,
  },
  contestContainer: {
    width: width * 0.9,
    height: 'auto',
    alignItems: 'center',
    marginTop: 7,
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 2,
    backgroundColor: 'transparent', // Ensure container doesn't have an extra background color
  },
  contestBackground: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    resizeMode: 'stretch',
    borderRadius: 35,
  },
  contestText1: {
    fontSize: 19,
    color: 'white',
    marginTop: 10,
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  contestText2: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
    marginTop: 10,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  contestText3: {
    fontSize: 13,
    fontWeight: '500',
    color: 'white',
    marginTop: 10,
    letterSpacing: 2,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  progressBarContainer: {
    width: '80%',
    marginTop: 20,
    borderRadius: 20,
    padding: 3,
    backgroundColor: '#D9D9D9',
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 30,
  },
  progressBar: {
    height: 16,
    borderRadius: 20,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 90,
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
