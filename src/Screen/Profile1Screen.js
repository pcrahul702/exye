import React, { useState, useEffect } from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { getData } from '../Utils/api';

const { width, height } = Dimensions.get('window');

const Profile1Screen = () => {
  const [profileData, setProfileData] = useState([]);
  const [panCardUploaded, setPanCardUploaded] = useState(false);
  const [bankDetailsUploaded, setBankDetailsUploaded] = useState(false);
  const [panURL, setPanURL] = useState(null);
  const [bankURL, setBankURL] = useState(null);
  const [modalText, setmodalText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [imageToShow, setImageToShow] = useState(null); // Stores the URL to display
  const navigation = useNavigation();

  useEffect(() => {
    getProfiledata();
  }, []);

  const getProfiledata = async () => {
    try {
      const response = await getData('/api/v1/profile')
      setProfileData(response)

      // Check if Pan Card is uploaded
      if (response.document?.panDetails?.url) {
        setPanCardUploaded(true);
        setPanURL(response.document.panDetails.url);
      } else {
        setPanCardUploaded(false);
      }

      // Check if Bank Details are uploaded
      if (response.document?.bankDetails?.url) {
        setBankDetailsUploaded(true);
        setBankURL(response.document.bankDetails.url);
      } else {
        setBankDetailsUploaded(false);
      }

      console.log("response.data", response)
    } catch (error) {
      console.log('error', error);
      Alert.alert(error?.response?.data?.message);
    }
  }
  // 2 functions which display doc image on click
  // const handlePanButtonPress = () => {
  //   if (!panCardUploaded) {
  //     navigation.navigate('UploadPan'); // Navigate to the Pan Card upload screen
  //   }
  //   else {
  //     //view pan
  //     console.log("pan: " + panURL);
  //     setImageToShow(panURL);
  //     setModalVisible(true); // Show modal to view pan card
  //   }
  // };

  // const handleBankButtonPress = () => {
  //   if (!bankDetailsUploaded) {
  //     navigation.navigate('UploadBank'); // Navigate to the Bank Details upload screen
  //   }
  //   else {
  //     //view bank 
  //     console.log("bank: " + bankURL);
  //     setImageToShow(bankURL);
  //     setModalVisible(true); // Show modal to view pan card
  //   }
  // };
  //2 funtions to show message doc uplaoded
  const handlePanButtonPress = () => {
    if (!panCardUploaded) {
      navigation.navigate('UploadPan'); // Navigate to the Pan Card upload screen
    }
    else {
      setmodalText("PAN Card Uplaoded");
      setModalVisible(true);
    }
  };

  const handleBankButtonPress = () => {
    if (!bankDetailsUploaded) {
      navigation.navigate('UploadBank'); // Navigate to the Bank Details upload screen
    }
    else {
      setmodalText("Bank Details Uplaoded");
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false); // Hide modal
  };


  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.bg}>
        <Image
          source={require('../assets/Group.png')}
          style={styles.backgroundImage}
        />
        <StatusBar hidden={true} />

        <View>
          <Image
            source={require('../assets/upCircle.png')}
            resizeMode="contain"
            style={styles.topImage}
          />

          <LinearGradient
            colors={['#FFFFFF', '#FE7503']}
            style={styles.gradientBorder}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}>
            <View style={styles.header}>
              <Text style={styles.headerText}>MY PROFILE</Text>
            </View>
          </LinearGradient>

          <View style={styles.icon}>
            <Image
              source={require('../assets/profile_avatar.png')}
              style={styles.iconImage}
            />
          </View>
        </View>

        <View style={styles.profileInfoContainer}>
          <Text style={styles.profileInfoText}>Name: {profileData.name}</Text>
          <Text style={styles.profileInfoText}>Email: {profileData.email}</Text>
          <Text style={styles.profileInfoText}>Mobile No: {profileData.phoneNo}</Text>
        </View>

        <View style={styles.myView}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: panCardUploaded ? '#28A745' : '#EF5A5A' }]}
            onPress={handlePanButtonPress}>
            <Text style={styles.buttonText}>Pan Card</Text>
            <Image
              source={require('../assets/panCard.png')}
              style={styles.buttonIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: bankDetailsUploaded ? '#28A745' : '#EF5A5A' }]}
            onPress={handleBankButtonPress}>
            <Text style={styles.buttonText}>Bank Details</Text>
            <Image
              source={require('../assets/bankDetails.png')}
              style={styles.buttonIcon}
            />
          </TouchableOpacity>
        </View>

        <Image
          source={require('../assets/bottomSpiral.png')}
          resizeMode="contain"
          style={styles.image}
        />

        {/* modal for image display */}
        {/* <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={closeModal}>
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.modalBackground}>
              <View
                style={styles.modalContentImage}>
                <Image
                  source={{ uri: imageToShow }}
                  style={styles.modalImage}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal> */}

        {/* modal for message display */}
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={closeModal}>
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.modalBackground}>
              <View
                style={styles.modalContentMessage}>
                <Text style={styles.modalText}>
                  {modalText}
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  backgroundImage: {
    width: '100%',
    height: '80%',
    position: 'absolute',
    resizeMode: 'contain',
    top: 90,
    left: 0,
  },
  scrollContainer: {
    alignSelf: 'center',
    width: '100%',
    height: '100%',
  },
  topImage: {
    position: 'absolute',
    top: 0,
    width: '100%',
    resizeMode: 'stretch',
  },
  icon: {
    width: 105,
    height: 105,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    borderColor: '#ffa952',
    borderWidth: 10,
    borderRadius: 60,
    alignSelf: 'center',
    marginTop: 35,
  },
  iconImage: {
    width: 85,
    height: 85,
    borderRadius: 42.5,
    borderColor: '#EF5A5A',
    borderWidth: 4,
  },
  profileInfoContainer: {
    marginTop: 30,
    backgroundColor: '#ffa952',
    opacity: 1,
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
    elevation: 5,
    justifyContent:'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  profileInfoText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#EF5A5A',
    marginBottom: 10,
    alignSelf:'center',
    fontFamily: 'Poppins-Regular',
  },
  gradientBorder: {
    padding: 3, // Border width
    borderRadius: 60,
    alignSelf: 'center',
    marginTop: 52,
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#EF5A5A',
    borderRadius: 60,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  headerText: {
    width: 'auto',
    fontSize: 27,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Poppins-Regular',
  },
  image: {
    marginTop: 100,
    width: '100%',
    resizeMode: 'stretch',
    bottom: 0,
  },
  myView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    marginHorizontal: 20,
  },
  button: {
    width: 150,
    height: 90,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EF5A5A',
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '275',
    color: '#ffffff',
    marginTop: 5,
    fontFamily: 'Poppins-Regular',
  },
  buttonIcon: {
    width: 55,
    height: 55,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContentImage: {
    width: width * 0.9,
    height: height * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  modalContentMessage: {
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  modalImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  modalText: {
    fontSize: 17,
    fontWeight: '300',
    color: 'black',
    fontFamily: 'Poppins-Regular',
  },
});

export default Profile1Screen;
