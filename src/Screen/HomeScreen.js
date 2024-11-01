
import { useNavigation, DrawerActions } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View, Text, StatusBar, Image, TouchableOpacity, ScrollView, Modal, Pressable } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';


const HomeScreen = () => {
  const [selectedRadio, setSelectedRadio] = useState(0);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleSubmit = () => {
    navigation.navigate('Topic')
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

  const handleDrawerOpen= () => {
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


        <View style={styles.view1}>
          <Text style={styles.text1}>Next quiz in 00:00</Text>
          <Image
            source={require('../assets/stopwatch_icon.png')}
            style={styles.icon1}
          />

        </View>

        <View style={styles.view2}>
          <Text style={styles.text2}>Choose amount for participation :</Text>


          <View style={styles.radioPanel1}>
            <View style={styles.radioFrame}>
              <TouchableOpacity onPress={() => { setSelectedRadio(1) }}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={styles.radio}>
                    {
                      selectedRadio === 1 ? <View style={styles.radioFill}></View> : null
                    }

                  </View>
                  <Text style={styles.radioText}>₹ 10</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.radioFrame}>
              <TouchableOpacity onPress={() => { setSelectedRadio(2) }}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={styles.radio}>
                    {
                      selectedRadio === 2 ? <View style={styles.radioFill}></View> : null
                    }

                  </View>
                  <Text style={styles.radioText}>₹ 20</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.radioFrame}>
              <TouchableOpacity onPress={() => { setSelectedRadio(3) }}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={styles.radio}>
                    {
                      selectedRadio === 3 ? <View style={styles.radioFill}></View> : null
                    }

                  </View>
                  <Text style={styles.radioText}>₹ 30</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.radioFrame}>
              <TouchableOpacity onPress={() => { setSelectedRadio(4) }}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={styles.radio}>
                    {
                      selectedRadio === 4 ? <View style={styles.radioFill}></View> : null
                    }

                  </View>
                  <Text style={styles.radioText}>₹ 50</Text>
                </View>
              </TouchableOpacity>
            </View>

          </View>

          <View style={styles.radioPanel1}>
            <View style={styles.radioFrame}>
              <TouchableOpacity onPress={() => { setSelectedRadio(5) }}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={styles.radio}>
                    {
                      selectedRadio === 5 ? <View style={styles.radioFill}></View> : null
                    }

                  </View>
                  <Text style={styles.radioText}>₹ 100</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.radioFrame}>
              <TouchableOpacity onPress={() => { setSelectedRadio(6) }}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={styles.radio}>
                    {
                      selectedRadio === 6 ? <View style={styles.radioFill}></View> : null
                    }

                  </View>
                  <Text style={styles.radioText}>₹ 150</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.radioFrame}>
              <TouchableOpacity onPress={() => { setSelectedRadio(7) }}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={styles.radio}>
                    {
                      selectedRadio === 7 ? <View style={styles.radioFill}></View> : null
                    }

                  </View>
                  <Text style={styles.radioText}>₹ 200</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.radioFrame}>
              <TouchableOpacity onPress={() => { setSelectedRadio(8) }}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={styles.radio}>
                    {
                      selectedRadio === 8 ? <View style={styles.radioFill}></View> : null
                    }

                  </View>
                  <Text style={styles.radioText}>₹ 500</Text>
                </View>
              </TouchableOpacity>
            </View>

          </View>

        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Live')}>
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


        <TouchableOpacity
          style={[
            styles.submitButton,
            {
              backgroundColor: isSubmitDisabled
                ? 'green'
                : 'green',
            },
          ]}
          onPress={handleSubmit}>
          <Text style={styles.submitText}>SUBMIT</Text>
        </TouchableOpacity>

      </ScrollView>


      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
      <Pressable style={styles.modalOverlay} >
          <View style={styles.modalContainer}>
            <View style={styles.modalContents}>
              <Text style={{ fontSize: 20, color: '#fa5962', fontWeight: '500', fontFamily: 'Poppins-Regular' }}>Hello User</Text>
              <TouchableOpacity style={{ marginTop: 15 }} onPress={handleProfile1Navigation}>
                <Text style={{ fontSize: 16, fontWeight: '600', fontFamily: 'Poppins-Regular'  }}>Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ marginTop: 15 }} onPress={handleWalletNavigation}>
                <Text style={{ fontSize: 16, fontWeight: '600', fontFamily: 'Poppins-Regular'  }}>Wallet</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ marginTop: 15 }} onPress={handlePavailionNavigation}>
                <Text style={{ fontSize: 16, fontWeight: '600', fontFamily: 'Poppins-Regular'  }}>Pavilion</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>


      <TouchableOpacity onPress={() => {/* Handle onPress event */ }} style={styles.xyz}>
        <Image source={require("../assets/filledHome.png")} style={styles.bottomNavIcons} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleWalletNavigation} style={styles.WalletIcon}>
        <Image source={require("../assets/unfilledWallet.png")} style={styles.bottomNavIcons} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePavailionNavigation} style={styles.NotificationIcon}>
        <Image source={require("../assets/notification.png")} style={styles.bottomNavIcons} />
      </TouchableOpacity>

      <Image
        source={require('../assets/BottomNav.png')}
        resizeMode="contain"
        style={styles.image}
      />


    </View>
  )

}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#e9e9e9'
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
    margin: 20,
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
    fontFamily: 'Poppins-Regular'
  },
  icon1: {
    width: 40,
    height: 40,
    borderRadius: 42.5,
    margin: 6,
    marginRight: 15,
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
    borderWidth: 2
  },
  text2: {
    fontSize: 22,
    color: 'white',
    fontWeight: '700',
    margin: 20,
    fontFamily: 'Poppins-Regular'
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
    verticalAlign: 'middle'
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
  view4: {
    width: '90%',
    height: 60,
    backgroundColor: '#Ffffdf',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 8,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden'
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
    fontFamily: 'Poppins-Regular'
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
    fontFamily: 'Poppins-Regular'
  },
  radioPanel1: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8
  },
  radioText: {
    fontSize: 16,
    textAlignVertical: 'center',
    color: 'white',
    fontWeight: '700',
    fontFamily: 'Poppins-Regular'
  },
  radio: {
    height: 16,
    width: 16,
    borderColor: 'black',
    borderRadius: 20,
    margin: 6,
    borderWidth: 2
  },
  radioFill: {
    height: 9,
    width: 9,
    backgroundColor: '#F05A5B',
    borderRadius: 20,
    margin: 1
  },
  radioFrame: {
    flex: 1
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
    resizeMode: 'stretch'
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
    left: 0
  },
  modalContents: {
    width: '100%'
  },

}
)



export default HomeScreen;