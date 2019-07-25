import React, {Component} from 'react';
import {Platform, Text, View} from 'react-native';
import styles from '../Assets/Style';
import Carousel from '../components/Carousel'
import ShopSectionList from '../components/ShopSection'
 
export default class test extends Component{
  render() {
    return (
      <View style={styles.container}>
          <Carousel navigation={this.props.navigation}/>
          <ShopSectionList navigation={this.props.navigation}/>
      </View>
    );
  }
}

