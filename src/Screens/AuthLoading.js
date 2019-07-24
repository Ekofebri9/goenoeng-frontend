import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
} from 'react-native';
import Users from './Users'
import firebase from 'firebase'

export default class AuthLoading extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  componentDidMount() {

    firebase.initializeApp({
      apiKey: "AIzaSyBv5OX83XUtiH3GBlG9l1sAi-PoVuF6gzk",
      authDomain: "menung.firebaseapp.com",
      databaseURL: "https://menung.firebaseio.com",
      projectId: "menung",
      storageBucket: "",
      messagingSenderId: "1090453867365",
      appId: "1:1090453867365:web:970bd49f762c0de5"
    });
    this.subs = [
      this.props.navigation.addListener('willFocus', () => {
        this._bootstrapAsync();
      }),
    ]
  }

  componentWillUnmount() {
    this.subs.forEach(sub => {
      sub.remove()
    })
  }

  _bootstrapAsync = async () => {
    Users.id = await AsyncStorage.getItem('userId');
    // User.avatar = await AsyncStorage.getItem('userAvatar');
    this.props.navigation.navigate(Users.id ? 'App' : 'Auth');
  };

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}