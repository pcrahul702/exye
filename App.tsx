import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import 'react-native-gesture-handler'


import LoginScreen from './src/Screen/LoginScreen'
import SignUpScreen from './src/Screen/SignUpScreen'
import GetStartedScreen from './src/Screen/GetStartedScreen'
import HomeScreen from './src/Screen/HomeScreen'
import TopicScreen from './src/Screen/TopicScreen'
import ProgressScreen from './src/Screen/ProgressScreen'
import QuestionScreen from './src/Screen/QuestionScreen'
import LoadingPavilionScreen from './src/Screen/LoadingPavilionScreen'
import WalletPage from './src/Screen/WalletPage'
import Pavilion from './src/Screen/Pavilion'
import Previous from './src/Screen/Previous'
import LiveScreen from './src/Screen/LiveScreen'
import Profile1Screen from './src/Screen/Profile1Screen'
import Profile2Screen from './src/Screen/Profile2Screen'
import Profile3Screen from './src/Screen/Profile3Screen'
import UploadPanScreen from './src/Screen/UploadPanScreen'
import UploadBankScreen from './src/Screen/UploadBankScreen'
import PreviousDetails from './src/Screen/PreviousDetails'
import AddMoneyScreen from './src/Screen/AddMoneyScreen'
import PaymentScreen from './src/Screen/PaymentScreen'
import TransactionHistoryScreen from './src/Screen/TransactionHistoryScreen'
import ReferScreen from './src/Screen/ReferScreen'
import WithdrawalScreen from './src/Screen/WithdrawalScreen'
import LiveDetailsScreen from './src/Screen/LiveDetailsScreen'

// Import the DrawerNavigator
import DrawerNavigator from './src/Screen/Drawer'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



function App() {
  const Stack = createStackNavigator();
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Start" component={GetStartedScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />

          {/* Replacing HomeScreen with DrawerNavigator */}
          <Stack.Screen name="Home" component={DrawerNavigator} />

          <Stack.Screen name="Topic" component={TopicScreen} />
          <Stack.Screen name="Progress" component={ProgressScreen} />
          <Stack.Screen name="Question" component={QuestionScreen} />
          <Stack.Screen name="LoadingPavilion" component={LoadingPavilionScreen} />
          <Stack.Screen name="Wallet" component={WalletPage} />
          <Stack.Screen name="Pavilion" component={Pavilion} />
          <Stack.Screen name="Previous" component={Previous} />
          <Stack.Screen name="Live" component={LiveScreen} />
          <Stack.Screen name="Profile1" component={Profile1Screen} />
          <Stack.Screen name="Profile2" component={Profile2Screen} />
          <Stack.Screen name="Profile3" component={Profile3Screen} />
          <Stack.Screen name="UploadPan" component={UploadPanScreen} />
          <Stack.Screen name="UploadBank" component={UploadBankScreen} />
          <Stack.Screen name="PreviousDetails" component={PreviousDetails} />
          <Stack.Screen name="AddMoney" component={AddMoneyScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="TransactionHistory" component={TransactionHistoryScreen} />
          <Stack.Screen name="Refer" component={ReferScreen} />
          <Stack.Screen name="Withdraw" component={WithdrawalScreen} />
          <Stack.Screen name="LiveDetails" component={LiveDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>

    </View>
  )
}

export default App

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  }
})