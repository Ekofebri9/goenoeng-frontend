import React, { Component } from 'react';
import { createAppContainer, createBottomTabNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { Image, StyleSheet } from 'react-native';
import Login from '../screens/Login';
// import SignUp from '../screens/Index';
import SignUp from '../screens/SignUp/Index';
import Gateway from '../screens/Payment/Gateway';
import Receipt from '../screens/Payment/Receipt';
import Store from '../screens/Store';
import DetailProduct from '../screens/DetailProduct';
import Maps from '../screens/Maps';
import Home from '../screens/Home'
import Mountain from '../screens/Mountain'
import ProfileUser from '../screens/Profile'
import ProfileStore from '../screens/StoreProfile'
import EditProfileUser from '../screens/EditProfile'
import EditProfileStore from '../screens/EditProfileStore'
import ManageProduct from '../screens/ManageProduct'
import Transaction from '../screens/Transaction'
import AddProduct from '../screens/AddProduct'
import MountainDetail from '../screens/MountainDetail'
import BookingMountain from '../screens/BookingMountain'
import Chat from '../screens/Chat'
import AuthLoading from '../screens/AuthLoading';
import Mitra from '../screens/SignUp/Mitra'
import User from '../screens/SignUp/User'
// import User from '../screens/User';
// import Mitra from '../screens/Mitra';
import History from '../screens/History'
import MidProfile from '../screens/MidProfile'

const BottomNavigation = createBottomTabNavigator(
  {
    Home: Home, 
    History: History,
    Profile: MidProfile,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === 'Home') {
          return (
            focused ?
              <Image style={styles.icon}
                source={require('../../src/Assets/Icons/Green_Home_100px.png')} /> :
              <Image style={styles.icon} source={require('../../src/Assets/Icons/Home_100px.png')} />
          );
        } else if (routeName === 'History') {
          return (
            focused ?
              <Image style={styles.icon}
                source={require('../../src/Assets/Icons/Green_US_Dollar_100px.png')} /> :
              <Image style={styles.icon} source={require('../../src/Assets/Icons/US_Dollar_100px.png')} />
          );
        } else if (routeName === 'Profile') {
          return (
            focused ?
              <Image style={styles.icon}
                source={require('../../src/Assets/Icons/Green_User_100px.png')} /> :
              <Image style={styles.icon} source={require('../../src/Assets/Icons/User_100px.png')} />
          );
        }
      },
      tabBarOptions: {
        activeTintColor: '#34c759',
        style: {
          paddingVertical: 6,
        },
        keyboardHidesTabBar: true,
      }
    })
  }
);
const AppNavigator = createStackNavigator({
  Home: {
    screen: BottomNavigation
  },
  Store: {
    screen: Store
  },
  DetailProduct: {
    screen: DetailProduct
  },
  Maps: {
    screen: Maps
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
  ManageProduct: {
    screen: ManageProduct
  },
  AddProduct: {
    screen: AddProduct
  },
  MidProfile: {
    screen: BottomNavigation
  },
  ProfileStore: {
    screen: ProfileStore
  },
  Store: {
    screen: Store
  },
  DetailProduct: {
    screen: DetailProduct
  },
  Maps: {
    screen: Maps
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
  ManageProduct: {
    screen: ManageProduct
  },
  Mountain: {
    screen: Mountain
  },
  ManageProduct: {
    screen: ManageProduct
  },
  EditProfileStore: {
    screen: EditProfileStore
  },
  EditProfileUser: {
    screen: EditProfileUser
  },
  ProfileUser: {
    screen: BottomNavigation
  },
  Transaction: {
    screen: Transaction
  },
  Receipt: {
    screen: Receipt
  },
  MountainDetail: {
    screen: MountainDetail
  },
  BookingMountain: {
    screen: BookingMountain
  },
  Chat: {
    screen: Chat
  }
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
  User: {
    screen: User
  },
  Mitra: {
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
const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
  }
});
