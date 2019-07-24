import React, {Component} from 'react';
import {createAppContainer, createBottomTabNavigator ,createStackNavigator} from 'react-navigation';
import Dummy from '../screens/dummy';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp/Index';
import Gateway from '../screens/Payment/Gateway';
import Receipt from '../screens/Payment/Receipt';

const BottomNavigation = createBottomTabNavigator(
	{
		Dummy: Gateway,
	},
	{
        
  }
);


const AppNavigator = createStackNavigator({
    Dummy: {
      screen: BottomNavigation
    },
    Gateway: {
      screen: Gateway
    },
    Login: {
      screen: Login
    },
    SignUp: {
      screen: SignUp
    },
  }, {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
});

  export default createAppContainer(AppNavigator);