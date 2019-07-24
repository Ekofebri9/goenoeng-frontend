import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Users from './Users'
import firebase from 'firebase'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class dummy extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: Users.id,
      customer: [],
    }
  }
  componentDidMount = async () => {
    await firebase.database().ref('users/').on('child_added', (value) => {
      let person = value.val()
      // console.warn('masuk', value.val());
      person.userId = value.key
      person.role = value.val().role
      // console.warn('masuk', value.val().manage);
      if (person.userId === Users.id) {
        Users.name = person.name
        Users.email = person.email
        Users.status = person.status
      }
      else {
        // console.warn('id', this.state.mountainData._id)
        // console.warn('person',person.manage)
        if (person.role === 'customer') {
          // console.warn('masuk', person.name);
          this.setState((prevState) => {
            return {
              customer: [...prevState.customer, person]
            }
          })
        }
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.customer.map((item, i) =>
          <TouchableOpacity key={i}
            onPress={() => this.props.navigation.navigate('Chat',
              {
                name: item.name,
                userId: item.userId,
              })
            } style={{ width: 150, marginHorizontal: -20, height: 150, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}
          >
            {/* <Image style={{ width: 80, height: 80, borderRadius: 40, borderColor: 'white', borderWidth: 2 }} source={{ uri: item.avatar }} /> */}
            <Text >{item.name}</Text>
            {/* <Text style={{ textAlign: 'center', padding: 1, backgroundColor: item.status == 'offline' ? 'black' : 'green', borderColor: 'white', borderWidth: 1, borderRadius: 3, color: 'white', fontSize: 12, fontWeight: 'bold' }} numberOfLines={2}>{item.status}</Text> */}
          </TouchableOpacity>
        )}
        {/* <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
