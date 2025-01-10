import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import backgroundImage from '../assets/Group.png';
import uppershaper from '../assets/uppershape.png';
import upperLog from '../assets/Upperlogo2.png';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getData } from '../Utils/api';


const Previous = () => {

  const navigation = useNavigation();

  const [previousContestData, setPreviousContestData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getWalletData();
    }, [])
  );

  const getWalletData = async () => {
    try {
      const res = await getData('/api/v1/quiz/user/contests');

      setPreviousContestData(res.data);
      console.log(previousContestData);

    } catch (error) {
      console.log('error', error);
      Alert.alert(error?.response?.data?.message);
    }
  };

  const getDate = (time) => {
    // Create a new Date object from the input time
    const date = new Date(time);

    // Extract the day, month, and year
    const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with zero if needed
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-indexed) and pad with zero
    const year = date.getFullYear(); // Get full year

    // Return the formatted date string
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
        {previousContestData.map(item => {
          const isProfit = item.correctAnswers > 0;
          const cardBackgroundColor = isProfit ? '#3DC467' : '#A92204'; // Light green for profit, light red for loss
          const pnlTextColor = isProfit ? '#28a745' : '#dc3545'; // Green for profit, red for loss 
          const contestValueText = `Correct Answer - ${item.correctAnswers}`;
          const pnlText = isProfit ? 'You Won' : 'You Lost';

          return (

            <TouchableOpacity key={item.id} onPress={() => seeDetails(item.contestId)}>
              <View style={[styles.card, { backgroundColor: cardBackgroundColor }]}>

                <Text style={styles.dateText}>{getDate(item.responseTime)}</Text>
                <Text style={styles.contestValueText}>{contestValueText}</Text>
                <Text style={[styles.pnlText, { color: pnlTextColor }]}>{pnlText}</Text>
                <Text style={styles.bottomRightText}>Click for details</Text>
                <Image
                  source={require('../assets/semiRect.png')}
                  style={styles.cardImage}
                />
              </View>
            </TouchableOpacity>

          );
        })}
      </ScrollView>


      <TouchableOpacity onPress={handleHomeNavigation} style={styles.xyz}>
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

export default Previous

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
  scrollViewContainer: {
    marginTop: 10,
    padding: 10,
    paddingBottom: 100,
    alignSelf: 'center',
    width: '100%'
  },
  card: {
    alignSelf: 'center',
    height: 'auto',
    width: '90%',
    marginBottom: 20,
    borderRadius: 11,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    position: 'relative',
  },
  cardImage: {
    top: 0,
    left: 0,
    position: 'absolute',
    height: '100%',
    width: '75%',
    resizeMode: 'stretch',
    zIndex: 0
  },
  dateText: {
    fontSize: 20,
    marginLeft: 10,
    marginBottom: 7,
    marginTop: 5,
    fontWeight: '500',
    color: 'black',
    zIndex: 1,
    fontFamily: 'Poppins-Regular'
  },
  contestValueText: {
    fontSize: 15,
    fontWeight: '500',
    color: 'black',
    marginLeft: 10,
    marginBottom: 7,
    zIndex: 1,
    fontFamily: 'Poppins-Regular'
  },
  pnlText: {
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 10,
    marginBottom: 7,
    zIndex: 1,
    fontFamily: 'Poppins-Regular'
  },
  bottomRightText: {
    fontSize: 13,
    position: 'absolute',
    fontWeight: '500',
    bottom: 5,
    right: 7,
    color: '#ffffff',
    zIndex: 1,
    fontFamily: 'Poppins-Regular'
  }

})