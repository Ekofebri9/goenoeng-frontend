import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Dimensions, ImageBackground, TextInput, TouchableOpacity, AsyncStorage, ScrollView
} from 'react-native';
import style from '../Assets/Style'
import { connect } from 'react-redux'
import {fetchPartner} from '../public/redux/actions/user'
import { withNavigation } from 'react-navigation';


const fullHeight = Dimensions.get('window').height
const fullWidth = Dimensions.get('window').width
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: 'Mermaid Store',
      image: 'https://res.cloudinary.com/dvyonb6zt/image/upload/v1563856184/Product/stop-shop-strike-vote-t_voj3z7.jpg',
      error: ''
    };
  }

  async componentDidMount(){
    this.setState({
        level : await AsyncStorage.getItem('level'),
        token : await AsyncStorage.getItem('token')
    })
    await this.props.dispatch(fetchPartner(this.state.token))
            // console.log(AsyncStorage.getItem('level'))
  }

  product = () => {
    const { navigation } = this.props;
    navigation.navigate('ManageProduct')
  }

  editPress = () => {
    const { navigation } = this.props;
    navigation.navigate("EditProfileStore")
  }

  render() {
    // console.log("this.props.user");
    // const {user} = this.props.user
    // console.log(user.data.image_mitra);
    return (
      <View style={{flex:1, height: 600}}>
        <View style={style.backgroundUp}>
          <View style={{ flexDirection: 'row' }}>
          
            <ImageBackground style={style.imageBox} source={{ uri: this.props.user.image }} />
            
            <TouchableOpacity style={style.imageBox2}>
              <ImageBackground style={{ height: 40, width: 40 }} source={require('../Assets/Icons/log_out.png')} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={[style.loginBox, { height: fullHeight / 1.7, width: fullWidth - 80}]}>
          <ScrollView>
          <Text style={style.loginText}>{this.props.user.user.name}</Text>

          <View style={style.detailTextBox}>
            <View style={style.iconBox}>
              <ImageBackground style={style.imageIcon} source={require('../Assets/Icons/email.png')} />
            </View>
            <Text style={style.textTop}>{this.props.user.user.email}</Text>
          </View>
          <View style={style.detailTextBox}>
            <View style={style.iconBox}>
              <ImageBackground style={style.imageIcon} source={require('../Assets/Icons/phone2.png')} />
            </View>
            <Text style={style.textTop}>{this.props.user.user.phone}</Text>
          </View>
          <View style={style.detailTextBox}>
            <View style={[style.iconBox, { height: 70 }]}>
              <ImageBackground style={style.imageIcon} source={require('../Assets/Icons/ig.png')} />
              {/* </ImageBackground> */}
            </View>
            <Text style={style.textTop} >{this.props.user.user.address} </Text>
          </View>
          <View style={style.detailTextBox}>
            <View style={[style.iconBox, { height: 70 }]}>
              <ImageBackground style={style.imageIcon} source={require('../Assets/Icons/ig.png')} />
              {/* </ImageBackground> */}
            </View>
            <Text style={style.textTop} >{this.props.user.description} </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20}}>

            <TouchableOpacity style={style.buttonAddProduct} disabled={false} onPress={() => this.product()}>
              <Text style={[style.loginText, { color: 'white' }]}>Products</Text>
            </TouchableOpacity>

            <TouchableOpacity style={style.buttonAddProduct} onPress={() => this.editPress()}>
              <Text style={[style.loginText, { color: 'white' }]}>Edit</Text>
            </TouchableOpacity>
          </View>
          </ScrollView>
        </View>
        <View style={style.backgroundDown} />
      </View>

    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
  }
}
export default connect(mapStateToProps)(withNavigation(Profile));
