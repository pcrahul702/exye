import React, { useEffect, useState } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
  Alert,
} from 'react-native';
import { useNavigation, DrawerActions, useFocusEffect } from '@react-navigation/native';

import addmoney from '../assets/addmoney.png';
import refericon from '../assets/refericon.png';
import withdrawicon from '../assets/withdrawicon.png';
import transitionhistory from '../assets/transitionhistory.png';
import { getData, putData } from '../Utils/api';

const { width, height } = Dimensions.get('window');

function WalletPage() {

  const navigation = useNavigation();
  const [walletData, setWalletData] = useState([]);
  const [isBankLinked, setIsBankLinked] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      getWalletData();
    }, [])
  );

  const getWalletData = async () => {
    try {
      const res = await getData('/api/v1/profile/wallet');

      setWalletData(res?.data);
      setIsBankLinked(res?.data?.isBankAccountLinked);

    } catch (error) {
      console.log('error', error);
      Alert.alert(error?.response?.data?.message);
    }
  };

  const handleHomeNavigation = () => {
    navigation.navigate('Dashboard');
  };

  const handlePavilionNavigation = () => {
    navigation.navigate('Pavilion');
  };

  const handleAddMoneyNavigation = () => {
    navigation.navigate('AddMoney');
  };

  const handleTransactionHistoryNavigation = () => {
    navigation.navigate('TransactionHistory');
  };

  const handleReferNavigation = () => {
    navigation.navigate('Refer');
  };

  const handleWithdrawNavigation = () => {
    navigation.navigate('Withdraw');
  };

  const handleProfile1Navigation = () => {
    navigation.navigate('Profile1'); // Navigate to the Wallet screen
  };

  const handleDrawerOpen = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleLinkUnlink = () => {
    if(isBankLinked){
      unLinkBank();
      getWalletData();
    }
    else {
      linkBank();
      getWalletData();
    }
  };

  const unLinkBank = async () => {
    try {
      const res = await putData('/api/v1/profile/wallet/remove-linked-bank');

      Alert.alert("Bank account unlinked successfully.");


    } catch (error) {
      console.log('error', error);
      Alert.alert(error?.response?.data?.message);
    }
  };

  const linkBank = async () => {
    try {
      const res = await putData('/api/v1/profile/wallet/link-bank');

      Alert.alert("Bank account linked successfully.");

    } catch (error) {
      console.log('error', error);
      Alert.alert(error?.response?.data?.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.miniContainer}>
          <Text style={styles.miniText}>Current Balance:</Text>
          <Text style={styles.miniTextRupp}>₹ {walletData.walletAmount || 0}</Text>
        </View>

        <View style={styles.customContainer}>
          <TouchableOpacity
            onPress={handleAddMoneyNavigation}
            style={styles.touchableIcon}>
            <Image source={addmoney} style={styles.smallIcon} />
            <Text style={styles.iconText}>Add Money</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleTransactionHistoryNavigation}
            style={styles.touchableIcon}>
            <Image source={transitionhistory} style={styles.smallIcon} />
            <Text style={styles.iconText}>Transaction History</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleWithdrawNavigation}
            style={styles.touchableIcon}>
            <Image source={withdrawicon} style={styles.smallIcon} />
            <Text style={styles.iconText}>Withdraw</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleReferNavigation}
            style={styles.touchableIcon}>
            <Image source={refericon} style={styles.smallIcon} />
            <Text style={styles.iconText}>Refer and Earn</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.cardContent}
          onPress={handleLinkUnlink}
        >
          <View style={styles.link}>
            <Text style={styles.linkText}>{isBankLinked?'Unlink your Bank':'Link your Bank'}</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity onPress={handleHomeNavigation} style={styles.xyz}>
        <Image
          source={require('../assets/unfilledHome.png')}
          style={styles.bottomNavIcons}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.WalletIcon}>
        <Image
          source={require('../assets/filledWallet.png')}
          style={styles.bottomNavIcons}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handlePavilionNavigation}
        style={styles.NotificationIcon}>
        <Image
          source={require('../assets/notification.png')}
          style={styles.bottomNavIcons}
        />
      </TouchableOpacity>
      <Image
        source={require('../assets/BottomNav.png')}
        style={styles.bottomNav}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  logo: {
    flex: 1,
    width: 40,
    height: 40,
  },
  headerText: {
    flex: 1,
    fontSize: 35,
    color: '#EF5A5A',
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    elevation: 5,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
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
  iconImage2: {
    width: 30,
    height: 30,
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
  backgroundImage: {
    width: '100%',
    height: '80%',
    position: 'absolute',
    resizeMode: 'contain',
    top: 0,
    left: 0,
  },
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
  scrollContainer: {
    paddingBottom: 120, // Ensure space for the bottom navigation
  },
  miniContainer: {
    marginTop: 20,
    width: '60%',
    alignSelf: 'center',
    marginHorizontal: 20,
    padding: 15,
    borderWidth: 3.95,
    borderColor: 'white',
    borderRadius: 30,
    backgroundColor: 'rgba(255, 169, 82, 1)',
    alignItems: 'center',
  },
  miniText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
  },
  miniTextRupp: {
    color: 'white',
    fontWeight: '700',
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
  },
  customContainer: {
    width: '90%',
    alignSelf: 'center',
    marginHorizontal: 20,
    marginTop: 40,
    padding: 10,
    backgroundColor: 'rgba(217, 217, 217, 1)',
    borderWidth: 2,
    borderColor: 'rgba(217, 217, 217, 1)',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  touchableIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  smallIcon: {
    width: 37,
    height: 35,
    marginRight: 20,
    resizeMode: 'contain',
  },
  iconText: {
    color: 'black',
    fontSize: 22,
    fontFamily: 'Poppins-Regular',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 90,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  link: {
    width: width * 0.9,
    alignItems: 'center',
    backgroundColor: '#EF5A5A',
    borderRadius: 60,
    borderColor:'#FE7503',
    borderWidth:5,
    paddingVertical: 2,
  },
  linkText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    alignSelf: 'center',
    fontFamily: 'Poppins-Regular',
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

export default WalletPage;
