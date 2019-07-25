import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Dimensions, ImageBackground, TextInput, TouchableOpacity, AsyncStorage
} from 'react-native';
import style from '../Assets/Style'
import {connect} from 'react-redux'
import {fetchPartner} from '../public/redux/actions/user'
import UserProfile from './Profile'
import StoreProfile from './StoreProfile'
// import console = require('console');


const fullHeight = Dimensions.get('window').height
const fullWidth = Dimensions.get('window').width
class MidProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user  : false,
      partner: false
    };
  }

  async componentDidMount(){
    this.setState({
        level : await AsyncStorage.getItem('level'),
        token : await AsyncStorage.getItem('token')
    })

    if (this.state.level === null) {
            this.props.navigation.navigate('Login')
    }else if (this.state.level === 'user'){
        this.setState({user : true})
        // await this.props.dispatch(fetchPartner(this.state.token))
    }else{
        this.setState({partner : true})
    }
    // console.log(AsyncStorage.getItem('level'))
  }

  render() {
    // console.log("this.props.user");
    console.log(this.state.user);
    return (
      <View>
          {this.state.user === true &&  <UserProfile/>} 
          {this.state.partner === true && <StoreProfile/> } 
      </View>

    );
  }
}

const mapStateToProps= state => {
	return {
		user: state.user,
	}
  }
export default connect(mapStateToProps)(MidProfile);
