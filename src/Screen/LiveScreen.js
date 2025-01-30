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
  Modal,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import backgroundImage from '../assets/Group.png';
import uppershaper from '../assets/uppershape.png';
import upperLog from '../assets/Upperlogo2.png';
import filterIcon from '../assets/filterTopicIcon.png';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { getData } from '../Utils/api';
import Shimmer from '../components/Shimmer';

const { width, height } = Dimensions.get('window');

const LiveScreen = () => {

  const navigation = useNavigation();
  const [dashboardData, setDashboardData] = useState([]);
  const [liveContestsData, setLiveContestsData] = useState([]);
  const [filteredContestsData, setFilteredContestsData] = useState([]);
  const [topicNames, setTopicNames] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTopicId, setSelectedTopicId] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      getDashboardData();
    }, [])
  );

  const getDashboardData = async () => {
    try {
      setIsLoading(true); // Start loading
      const res = await getData('/api/v1/dashboard');

      if (res && res.liveContests) {
        setDashboardData(res);
        setLiveContestsData(res.liveContests);

        // Fetch topic names for each contest
        const names = {};
        for (const contest of res.liveContests) {
          const topicName = await getTopicName(contest.topicId);
          names[contest.topicId] = topicName; // Store the topic name by ID
        }
        setTopicNames(names);
      }
    } catch (error) {
      console.log('error', error);
      Alert.alert(error?.response?.data?.message);
    } finally {
      setIsLoading(false); // Stop loading after data is fetched
    }
  };

  const getTopicName = async (id) => {
    try {
      const res = await getData(`/api/v1/profile/topic/${id}`);
      return res.data.topicName; // Assuming the response has a topicName field
    } catch (error) {
      console.log('error', error);
      Alert.alert(error?.response?.data?.message);
      return 'Unknown Topic'; // Fallback if there's an error
    }
  };

  const handleFilterContest = (topicId) => {

    setSelectedTopicId(topicId);

    if (topicId === null) {
      setFilteredContestsData(liveContestsData); // Show all contests
    } else {
      const filteredData = liveContestsData.filter(contest => contest.topicId === topicId);
      setFilteredContestsData(filteredData);
    }

    setIsModalVisible(false); // Close the modal after filtering
  };

  const handleHomeNavigation = () => {
    navigation.navigate('Dashboard');
  };

  const handleWalletNavigation = () => {
    navigation.navigate('Wallet'); // Navigate to the Wallet screen
  };

  const handleLiveDetailsNavigation = (contestId) => {
    navigation.navigate('LiveDetails', { contestId: contestId }); // Navigate to the Wallet screen
  };

  const closeModal = () => {
    setIsModalVisible(false); // Hide modal
    console.log(topicNames);
    console.log(typeof topicNames);
  };

  return (
    <SafeAreaView style={styles.container}>

      <StatusBar hidden={true} />

      <Image source={uppershaper} style={styles.uppershape} />
      <Image source={backgroundImage} style={styles.backgroundImage} />
      <Image source={upperLog} style={styles.upperLog} />


      <TouchableOpacity
        style={styles.filter}
        onPress={() => { setIsModalVisible(true) }}
      >
        <Image source={filterIcon} />
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalBackground}>
            <View
              style={styles.modalContentMessage}>
              <View style={styles.view4}>
                <Text style={styles.text4}>Choose your topic</Text>
                <Image
                  source={require('../assets/semiRect2.png')}
                  style={styles.cardImage}
                />
              </View>

              <View style={styles.topicContainer}>
                {Object.entries(topicNames).length > 0 ? (
                  Object.entries(topicNames).map(([topicId, topicName]) => (

                    <TouchableOpacity
                      key={topicId}
                      onPress={() => handleFilterContest(topicId)} // Call a separate function
                    >
                      <View style={styles.topicNameContainer}>
                        <Text style={styles.topicNameText}>{topicName}</Text>
                      </View>
                    </TouchableOpacity>

                  ))
                ) : (
                  <Text style={styles.noContentText}>No topics available.</Text>
                )}
              </View>

            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>


      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Scroll to see your contests</Text>
      </View>

      {isLoading ? (

        Array.from({ length: 5 }).map((_, index) => (
          <Shimmer autoRun={true} style={styles.shimmerImage} >
            <Image source={upperLog} style={styles.statusIcon} />
          </Shimmer>
        ))
      ) : (
        <ScrollView contentContainerStyle={styles.scrollView}>
          {selectedTopicId ? (
            // If a topic is selected, filter contests based on that
            filteredContestsData && filteredContestsData.length > 0 ? (
              filteredContestsData.map(contest => (
                <TouchableOpacity
                  key={contest.contestId}
                  onPress={() => handleLiveDetailsNavigation(contest.contestId)}
                  style={styles.touchableOpacity}>
                  <View style={styles.contestContainer}>
                    <Image
                      source={require('../assets/contestBG.png')}
                      style={styles.contestBackground}
                    />
                    <Text style={styles.contestText1}>
                      {topicNames[contest.topicId] || 'Loading...'}
                    </Text>
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
            )
          ) : (
            // If no topic is selected, show all contests
            liveContestsData && liveContestsData.length > 0 ? (
              liveContestsData.map(contest => (
                <TouchableOpacity
                  key={contest.contestId}
                  onPress={() => handleLiveDetailsNavigation(contest.contestId)}
                  style={styles.touchableOpacity}>
                  <View style={styles.contestContainer}>
                    <Image
                      source={require('../assets/contestBG.png')}
                      style={styles.contestBackground}
                    />
                    <Text style={styles.contestText1}>
                      {topicNames[contest.topicId] || 'Loading...'}
                    </Text>
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
            )
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
  filter: {
    position: 'absolute',
    width: width * 0.18,
    height: width * 0.18,
    top: 30,
    right: 30,
    resizeMode: 'cover',
  },
  modalBackground: {
    flex: 1,
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContentMessage: {
    width: '70%',
    height: '100%',
    backgroundColor: '#D9D9D9',
    padding: 12,
    right: 0,
  },
  view4: {
    width: '100%',
    height: 35,
    backgroundColor: '#Ffffdf',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 20,
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
    resizeMode: 'stretch',
    top: 0,
    left: 0,
    bottom: 0,
    width: '70%',
    height: '100%'
  },
  text4: {
    position: 'absolute',
    fontSize: 18,
    color: '#ffa952',
    fontWeight: '700',
    alignSelf: 'center',
    zIndex: 1,
    fontFamily: 'Poppins-Regular',
  },
  topicContainer: {
    width: '90%',
    borderRadius: 20,
    padding: 20,
    backgroundColor: 'white',
    marginTop: 16,
    alignSelf: 'center',
  },
  topicNameContainer: {
    width: '100%',
    backgroundColor: '#D9D9D9',
    borderRadius: 50,
    marginBottom: 12,
  },
  topicNameText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F05A5B',
    fontFamily: 'Poppins-Regular',
    padding: 10,
    paddingHorizontal: 16,
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
    borderRadius: 50,
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
  shimmerImage: {
    alignSelf: 'center',
    width: '90%',
    height: 100,
    borderRadius: 13,
    marginVertical:8,
  },
  shimmerView: {
    width: '90%',
    height: 40,
    resizeMode: 'stretch',
  },
});
