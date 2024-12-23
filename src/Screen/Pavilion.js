import { StyleSheet, Text, View, SafeAreaView, Image,StatusBar, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation ,DrawerActions} from '@react-navigation/native';

const Pavilion = () => {

  const navigation = useNavigation();

  const handleHomeNavigation = () => {    
    navigation.navigate('Dashboard');
  };

  const handleWalletNavigation = () => {
    navigation.navigate('Wallet'); // Navigate to the Wallet screen
  };

  const handleProfile1Navigation = () => {
    navigation.navigate('Profile1'); // Navigate to the Wallet screen
  };

  const handleDrawerOpen= () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };
  return (
    <SafeAreaView style={styles.container}>

      {/* <Image source={uppershaper} style={styles.uppershape} />
      <Image source={backgroundImage} style={styles.backgroundImage} />
      <Image source={upperLog} style={styles.upperLog} /> */}
     
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


        {/* <Text style={styles.headerText}>EXYE</Text> */}
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


        <TouchableOpacity onPress={() => navigation.navigate('Previous')}>

          <LinearGradient
            colors={['#FFA952', '#F05A5B']}
            style={styles.view3}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}>
            <Text style={styles.text3}>Previous{'\n'}Contest</Text>
            <Image
              source={require('../assets/prevContest.png')}
              style={styles.image3}
            />

          </LinearGradient>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => navigation.navigate('Live')}>

          <LinearGradient
            colors={['#F05A5B', '#FFA952']}
            style={styles.view4}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}>
            <Text style={styles.text3}>Live{'\n'}Contest</Text>
            <Image
              source={require('../assets/eventPic.png')}
              style={styles.image3}
            />

          </LinearGradient>
        </TouchableOpacity>

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
        source={require('../assets/BottomNav.png')}
        style={styles.bottomNav} />

    </SafeAreaView>
  )
}

export default Pavilion

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 'auto',
    backgroundColor: '#ffa952',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontFamily: 'Poppins-Regular'
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
    borderWidth: 2
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
    borderWidth: 2
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
  scrollContainer: {
    width: '100%'// Ensure space for the bottom navigation
  },
  container: {
    flex: 1,
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
  view4: {
    width: '90%',
    height: 'auto',
    backgroundColor: '#FFA952',
    marginTop: 20,
    alignSelf: 'center',
    borderRadius: 35,
    elevation: 8,
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
    padding:5
  },
  view3: {
    width: '90%',
    height: 'auto',
    backgroundColor: '#FFA952',
    marginTop: 20,
    alignSelf: 'center',
    borderRadius: 35,
    elevation: 8,
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
    padding:5
  },
  text3: {
    fontSize: 28,
    color: 'white',
    fontWeight: '600',
    alignSelf: 'center',
    margin: 15,
    fontFamily: 'Poppins-Regular'
  },
  image3: {
    width: 111,
    height: 133,
    margin: 20,
    alignSelf: 'center',
  },
})