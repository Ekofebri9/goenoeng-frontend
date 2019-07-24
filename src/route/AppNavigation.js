import React, {Component} from 'react';
import {createAppContainer, createBottomTabNavigator ,createSwitchNavigator,createStackNavigator} from 'react-navigation';
import Dummy from '../screens/dummy'
import MountainDetail from '../screens/MountainDetail'
import BookingMountain from '../screens/BookingMountain'
import Chat from '../screens/Chat'
import Login from '../screens/Login';
import SignUp from '../screens/Index';
import AuthLoading from '../screens/AuthLoading';
import User from '../screens/User';
import Mitra from '../screens/Mitra';

const BottomNavigation = createBottomTabNavigator(
	{
    Dummy: Dummy,
    MountainDetail:MountainDetail,
  },
	{
        
    }
);


const AppNavigator = createStackNavigator(
  {
    MountainDetail: {
      screen: BottomNavigation
    },
    BookingMountain:{
      screen: BookingMountain
    },
    Chat:{
      screen: Chat
    },
    User:{
      screen: User
    },
    Mitra:{
      screen: Mitra
    },
    Dummy: {
      screen: BottomNavigation
    },
    // Login: {
    //   screen: Login
    // },
    // SignUp: {
    //   screen: SignUp
    // },
  }, 
  {
    headerMode: 'none',
    navigationOptions: {
      header: null,
      headerVisible: false,
    }
});

const AuthStack = createStackNavigator({
  Login: {
    screen: Login
  },
});
const RegisterStack = createStackNavigator({
  SignUp: {
    screen: SignUp
  },
  User:{
    screen: User
  },
  Mitra:{
    screen: Mitra
  },
});

export default createAppContainer(createSwitchNavigator(
  {
    // SplashScreen: SplashScreen,
    AuthLoading: AuthLoading,
    App: AppNavigator,
    Register: RegisterStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
// export default createAppContainer(AppNavigator);