import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';

import LoginScreen from './src/Screen/LoginScreen';
import SignUpScreen from './src/Screen/SignUpScreen';
import GetStartedScreen from './src/Screen/GetStartedScreen';
import HomeScreen from './src/Screen/HomeScreen';
import TopicScreen from './src/Screen/TopicScreen';
import ProgressScreen from './src/Screen/ProgressScreen';
import QuestionScreen from './src/Screen/QuestionScreen';
import LoadingPavilionScreen from './src/Screen/LoadingPavilionScreen';
import WalletPage from './src/Screen/WalletPage';
import Pavilion from './src/Screen/Pavilion';
import Previous from './src/Screen/Previous';
import LiveScreen from './src/Screen/LiveScreen';
import ProfileScreen from './src/Screen/ProfileScreen';
import UploadPanScreen from './src/Screen/UploadPanScreen';
import UploadBankScreen from './src/Screen/UploadBankScreen';
import PreviousDetails from './src/Screen/PreviousDetails';
import AddMoneyScreen from './src/Screen/AddMoneyScreen';
import PaymentScreen from './src/Screen/PaymentScreen';
import TransactionHistoryScreen from './src/Screen/TransactionHistoryScreen';
import ReferScreen from './src/Screen/ReferScreen';
import WithdrawalScreen from './src/Screen/WithdrawalScreen';
import WithdrawalStatusScreen from './src/Screen/WithdrawalStatusScreen';
import LiveDetailsScreen from './src/Screen/LiveDetailsScreen';
import NewComplaintPage from './src/Screen/NewComplaintPage';
import TicketDetailsPage from './src/Screen/TicketDetailsPage';
import BankDetailsScreen from './src/Screen/BankDetailsScreen';
import PANDetailsScreen from './src/Screen/PANDetailsScreen';
import ContestInfoPage from './src/Screen/ContestInfoPage';
import QuizChoiceScreen from './src/Screen/QuizChoiceScreen';
import CustomContestScreen from './src/Screen/CustomContestScreen';

// Import the DrawerNavigator
import DrawerNavigator from './src/Screen/Drawer';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Provider } from 'react-redux';
import store from './src/Redux/store';

function App() {
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>

      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>


            <Stack.Screen name="Start" component={GetStartedScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Home" component={DrawerNavigator} />
            <Stack.Screen name="Topic" component={TopicScreen} />
            <Stack.Screen name="Progress" component={ProgressScreen} />
            <Stack.Screen name="Question" component={QuestionScreen} />
            <Stack.Screen
              name="LoadingPavilion"
              component={LoadingPavilionScreen}
            />
            <Stack.Screen name="Wallet" component={WalletPage} />
            <Stack.Screen name="Pavilion" component={Pavilion} />
            <Stack.Screen name="Previous" component={Previous} />
            <Stack.Screen name="Live" component={LiveScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="UploadPan" component={UploadPanScreen} />
            <Stack.Screen name="UploadBank" component={UploadBankScreen} />
            <Stack.Screen
              name="PreviousDetails"
              component={PreviousDetails}
            />
            <Stack.Screen name="AddMoney" component={AddMoneyScreen} />
            <Stack.Screen name="Payment" component={PaymentScreen} />
            <Stack.Screen
              name="TransactionHistory"
              component={TransactionHistoryScreen}
            />
            <Stack.Screen name="Refer" component={ReferScreen} />
            <Stack.Screen name="Withdraw" component={WithdrawalScreen} />
            <Stack.Screen name="WithdrawalStatus" component={WithdrawalStatusScreen} />
            <Stack.Screen name="LiveDetails" component={LiveDetailsScreen} />
            <Stack.Screen name="NewComplaint" component={NewComplaintPage} />
            <Stack.Screen name="TicketDetails" component={TicketDetailsPage} />
            <Stack.Screen name="BankDetails" component={BankDetailsScreen} />
            <Stack.Screen name="PANDetails" component={PANDetailsScreen} />
            <Stack.Screen name="ContestInfo" component={ContestInfoPage} />
            <Stack.Screen name="QuizChoice" component={QuizChoiceScreen} />
            <Stack.Screen name="CustomContest" component={CustomContestScreen} />


          </Stack.Navigator>
        </NavigationContainer>
      </View>

    </Provider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
