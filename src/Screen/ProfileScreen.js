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
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { getData, postData, putData } from '../Utils/api';
import { TextInput } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

const ProfileScreen = () => {
  const [profileData, setProfileData] = useState([]);
  const [bankData, setBankData] = useState([]);
  const [panCardUploaded, setPanCardUploaded] = useState(false);
  const [bankDetailsUploaded, setBankDetailsUploaded] = useState(false);
  const [modalText, setmodalText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editableName, setEditableName] = useState(profileData.name); // Assuming profileData is available


  const navigation = useNavigation();

  useFocusEffect(
      React.useCallback(() => {
        getProfiledata();
      }, [])
    );

  const getProfiledata = async () => {
    try {
      const response = await getData('/api/v1/profile')
      setProfileData(response)

      // Check if Pan Card is uploaded
      if (response.document?.panDetails?.url) {
        setPanCardUploaded(true);
      } else {
        setPanCardUploaded(false);
      }

      // Check if Bank is uploaded
      if (response.document?.bankDetails?.url) {
        setBankDetailsUploaded(true);
      } else {
        setBankDetailsUploaded(false);
      }

      console.log("response.data", response)
    } catch (error) {
      console.log('error', error);
      Alert.alert(error?.response?.data?.message);
    }
  }

  const getBankdata = async () => {

    try {
      const bankResponse = await getData('/api/v1/profile/bank-details')
      console.log(JSON.stringify(bankResponse));
      setBankData(bankResponse);

      if (bankData?.accountHolderName) {
        setBankDetailsUploaded(true);
      } else {
        setBankDetailsUploaded(false);
      }

      // console.log("response", bankResponse);
    } catch (error) {
      console.log('error', error);
    }
  }

  // Function to handle the edit button press
  const handleEditName = () => {
    setIsEditing(true); // Enable editing
  };

  const handleNameChange = (text) => {
    setEditableName(text); // Update name as user types
  };

  const handleSaveName = async () => {
    setIsEditing(false);
    console.log(editableName);

    if (!editableName) {
      Alert.alert('Error', 'Please enter name');
      return;
    }
    else {
      const payload = {
        userInfo: {
          name: editableName,
          phoneNo: profileData.phoneNo,
          email: profileData.email
        }
      };
      console.log("payload data".payload);
      try {
        const data = await putData('/api/v1/profile', payload);

        console.log(data);

        getProfiledata();

      } catch (error) {
        console.error('Error during name update:', error);
      }
    }

  };


  const handlePanButtonPress = () => {
    if (!panCardUploaded) {
      navigation.navigate('PANDetails'); // Navigate to the Pan Card upload screen
    }
    else {
      setmodalText("PAN Card Uplaoded");
      setModalVisible(true);
    }
  };

  const handleBankButtonPress = () => {
    if (!bankDetailsUploaded) {
      navigation.navigate('BankDetails'); // Navigate to the Bank Details upload screen
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
    <View style={styles.scrollContainer}>
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
          <Text style={styles.label}>Name:</Text>
          {isEditing ? (
            <View style={styles.editableNameContainer}>
              <TextInput
                style={styles.editableNameInput}
                value={editableName}
                onChangeText={handleNameChange}
                autoFocus
              />
              <TouchableOpacity onPress={handleSaveName}>
                <Text style={styles.saveButton}>Save</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.nameDisplayContainer}>
              <Text style={styles.detailText}>{profileData.name}</Text>
              <TouchableOpacity onPress={handleEditName}>
                <Image
                  source={require('../assets/editIcon.png')} // Replace with your edit icon path
                  style={styles.editIcon}
                />
              </TouchableOpacity>
            </View>
          )}
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.detailText}> {profileData.email}</Text>
          <Text style={styles.label}>Mobile No:</Text>
          <Text style={styles.detailText}> {profileData.phoneNo}</Text>

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
    </View>
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
    padding: 12,
    marginHorizontal: 20,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  profileInfoText: {
    fontSize: width * 0.06,
    fontWeight: '700',
    color: 'black',
    margin: 8,
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
  },
  label: {
    marginTop: 8,
    fontSize: width * 0.04,
    fontWeight: '700',
    color: '#000000',
    marginTop: 6,
    marginLeft: 6,
    fontFamily: 'Poppins-Regular',
  },
  detailText: {
    fontSize: width * 0.05,
    color: '#000000',
    fontWeight: '700',
    marginBottom: 5,
    fontFamily: 'Poppins-Regular',
  },
  editableNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  editableNameInput: {
    marginRight: 10,
    marginLeft: 6,
    fontSize: width * 0.05,
    color: 'red',
    fontWeight: '700',
    width: '80%',
  },
  nameDisplayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 6,
  },
  editIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  saveButton: {
    fontSize: 16,
    color: 'red',
    fontWeight: '600',
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
  modalContentMessage: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 50,
  },
  modalText: {
    fontSize: 20,
    fontWeight: '300',
    color: 'black',
    fontFamily: 'Poppins-Regular',
  },
});

export default ProfileScreen;
