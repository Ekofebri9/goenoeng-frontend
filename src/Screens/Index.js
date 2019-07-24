import React, { Component } from 'react';
import { StyleSheet, AsyncStorage,Text, TextInput, View, Button, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import UserScreen from './User';
import MitraScreen from './Mitra';

const User = () => (
  <UserScreen/>
);

const Mitra = () => (
  <MitraScreen/>
);

export default class SignUp extends Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'User' },
      { key: 'second', title: 'Mitra' },
    ],
  };

  renderTabBar = (props) => {
    return (
      <TabBar
        {...props}
        pressColor='00000010'
        indicatorStyle={{ backgroundColor: '#34c759' }}
        style={{ backgroundColor: '#fff' }}
        labelStyle={{ color: '#111' }}
      />
    )
  }

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderTabBar={this.renderTabBar}
        renderScene={ SceneMap({ first: User, second: Mitra }) }
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
      />
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});