import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView, ActivityIndicator, BackHandler } from 'react-native'
import React, { useState } from 'react'
import backgroundImage from '../assets/Group.png';
import uppershaper from '../assets/uppershape.png';
import upperLog from '../assets/Upperlogo2.png';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getData } from '../Utils/api';
import { Alert } from 'react-native';
import Shimmer from '../components/Shimmer';

const Previous = () => {

  const navigation = useNavigation();

  const [previousContestData, setPreviousContestData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useFocusEffect(
    React.useCallback(() => {
      getWalletData();
      // Add back handler
      const onBackPress = () => {
        navigation.goBack();
        return true; // prevent default behavior (exit app)
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  const getWalletData = async () => {
    try {
      const res = await getData('/api/v1/quiz/user/contests');
      console.log("previous details",res.data)
      setPreviousContestData(res.data);
    } catch (error) {
      console.log('error', error);
      Alert.alert(error?.response?.data?.message);
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  };

  const getDate = (time) => {
    const date = new Date(time);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleHomeNavigation = () => {
    navigation.navigate('Dashboard');
  };

  const handleWalletNavigation = () => {
    navigation.navigate('Wallet');
  };

  const seeDetails = (contestId) => {
    navigation.navigate('PreviousDetails', { contestId: contestId });
  };

  return (
    <SafeAreaView style={styles.container}>

      <Image source={backgroundImage} style={styles.backgroundImage} />
      <Image source={uppershaper} style={styles.uppershape} />
      <Image source={upperLog} style={styles.upperLog} />

      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Scroll to see your contests</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {loading ? (

          Array.from({ length: 5 }).map((_, index) => (
            <Shimmer autoRun={true} style={styles.shimmerImage} >
              <Image source={upperLog} style={styles.shimmerView} />
            </Shimmer>
          ))
        ) : previousContestData.length === 0 ? (
          <Text style={styles.noHistoryText}>No history found</Text> // Show message if no contests are found
        ) : (
          previousContestData.map(item => {
            return (
              <TouchableOpacity key={item.id} onPress={() => seeDetails(item.contestId)} activeOpacity={0.8}>
                <View style={styles.card}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.dateText}>{getDate(item.responseTime)}</Text>
                    <Text style={styles.scoreText}>{item.obtainedScore}/{item.totalScore}</Text>
                  </View>
                  
                  <View style={styles.cardContent}>
                    <View style={styles.statsRow}>
                      <View style={styles.statItem}>
                        <Text style={styles.statLabel}>Correct</Text>
                        <Text style={styles.statValue}>{item.correctAnswers}</Text>
                      </View>
                      <View style={styles.statItem}>
                        <Text style={styles.statLabel}>Incorrect</Text>
                        <Text style={styles.statValue}>{item.incorrectAnswers}</Text>
                      </View>
                    </View>
                    
                    {/* <Text style={styles.contestIdText}>Contest: {item.contestId}</Text> */}
                  </View>
                  
                  <View style={styles.cardFooter}>
                    <Text style={styles.tapText}>Tap to view details</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>

      <TouchableOpacity onPress={handleHomeNavigation} style={styles.HomeIcon}>
        <Image source={require("../assets/unfilledHome.png")} style={styles.bottomNavIcons} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleWalletNavigation} style={styles.WalletIcon}>
        <Image source={require("../assets/unfilledWallet.png")} style={styles.bottomNavIcons} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {/* Handle onPress event */ }} style={styles.NotificationIcon}>
        <Image source={require("../assets/filledNotification.png")} style={styles.bottomNavIcons} />
      </TouchableOpacity>
      <Image
        source={require('../assets/BottomNav2.png')}
        style={styles.bottomNav} />
    </SafeAreaView>
  )
}

export default Previous;

const styles = StyleSheet.create({
  uppershape: {
    top: 0,
    width: '100%',
    resizeMode: 'stretch',
  },
  upperLog: {
    alignSelf: 'center',
    top: -50,
    height: 100,
    width: 100,
  },
  backgroundImage: {
    position: 'absolute',
    height: 627,
    width: '100%',
    top: 139,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  headerContainer: {
    width: '90%',
    height: 'auto',
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
    padding: 8,
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
  scrollViewContainer: {
    marginTop: 10,
    padding: 10,
    paddingBottom: 100,
    alignSelf: 'center',
    width: '100%',
  },
  card: {
    alignSelf: 'center',
    width: '90%',
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    fontFamily: 'Poppins-Regular',
  },
  scoreText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFA952',
    fontFamily: 'Poppins-Regular',
  },
  cardContent: {
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    fontFamily: 'Poppins-Regular',
  },
  contestIdText: {
    fontSize: 12,
    color: '#888888',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  cardFooter: {
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  tapText: {
    fontSize: 12,
    color: '#FFA952',
    fontFamily: 'Poppins-Regular',
    fontWeight: '500',
  },
  noHistoryText: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    color: 'gray',
    marginTop: 20,
    fontFamily: 'Poppins-Regular',
  },
  shimmerImage: {
    alignSelf: 'center',
    width: '90%',
    height: 100,
    borderRadius: 13,
    marginBottom:12,
  },
  shimmerView: {
    width: '90%',
    height: 40,
    resizeMode: 'stretch',
  },
});
