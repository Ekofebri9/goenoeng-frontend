import React, { Component } from 'react';
import { View, Text, Dimensions, ImageBackground, AsyncStorage, TouchableOpacity, ActivityIndicator } from 'react-native';
import style from '../Assets/Style'
import { connect } from 'react-redux'
import { fetchUser } from '../public/redux/actions/user';
import { withNavigation } from 'react-navigation';

const widthWindow = Dimensions.get('window').width
class StoreProfile extends Component {
    constructor (props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: 'Try Satria',
            image: 'https://res.cloudinary.com/dvyonb6zt/image/upload/v1563542754/Product/ggirl_omijq3.png',
            error: ''
        };
        // this.checkLogin()
    }

    // checkLogin =async()=>{
    //     console.warn('asy',await AsyncStorage.getItem('token'))
    //     if ( !await AsyncStorage.getItem('token') ||await AsyncStorage.getItem('token') ==null ) {
    //         this.props.navigation.navigate('Login')
    //     }
    // }

    // componentWillMount=async()=>{
    //         let token = await AsyncStorage.getItem('token')
    //         this.props.dispatch( getUser( token))
    //         this.subs = [
    //             this.props.navigation.addListener('willFocus',async()=>{
    //                 // this.setState({loading: true})
    //                 this.checkLogin()
    //                 let token = await AsyncStorage.getItem('token')
    //         this.props.dispatch( getUser( token))
            
    //             }),
    //         ]
    // }

    // componentWillUnmount(){
    //     // BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    //     this.subs.forEach(sub => {
    //         sub.remove()
    //     })
    // }

    async componentDidMount(){
        let token = await AsyncStorage.getItem('token')
        // console.log(token)
        this.props.dispatch(fetchUser(token))
    }

    onBackPress = () => {
 
        //Code to display alert message when use click on android device back button.
        Alert.alert(
          ' Exit From App ',
          ' Do you want to exit From App ?',
          [
            { text: 'Yes', onPress: () => BackHandler.exitApp() },
            { text: 'No', onPress: () => console.log('NO Pressed') }
          ],
          { cancelable: false },
        );
     
        return true;
      }

    goback = () => {
        const { navigation } = this.props;
        navigation.goBack()
    }
    goEditProfil = () => {
        const { navigation } = this.props;
        navigation.navigate('EditProfileUser');
    }

    _logOut = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }
    render() {
        // console.warn(this.props.user);
        console.log(this.props.user)
        return (
            <View>
                {/* {
                (!this.props.user.user) ? 
                    <ActivityIndicator/>
                :
                <React.Fragment> */}
                <View style={style.backgroundUp}>
                    <View style={{ flexDirection: 'row' }}>
                        <ImageBackground style={style.imageBox} source={{ uri: this.props.user.image }} />
                        <TouchableOpacity style={style.imageBox2} 
                             onPress={this._logOut}
                        >
                            <ImageBackground  style={{height: 40, width: 40}} source={require('../Assets/Icons/log_out.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={style.loginBox}>
                    { (this.props.user.user) ? <Text style={style.loginText}>{this.props.user.user.name}</Text> : <ActivityIndicator/>}
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
                        <View style={style.iconBox}>
                            <ImageBackground style={style.imageIcon} source={require('../Assets/Icons/gender.png')} />
                        </View>
                        <Text style={style.textTop}>{this.props.user.gender}</Text>
                    </View>
                    <View style={style.detailTextBox}>
                        <View style={[style.iconBox, { height: 70 }]}>
                            <ImageBackground style={style.imageIcon} source={require('../Assets/Icons/ig.png')} />
                            {/* </ImageBackground> */}
                        </View>
                        <Text style={style.textTop}>{this.props.user.user.address}</Text>
                    </View>
                    <TouchableOpacity 
                        style={[style.buttonAddProduct, {alignSelf: 'center'}]} 
                        onPress={() => this.goEditProfil()}>
                        <Text style={[style.loginText, { color: 'white' }]}>Edit</Text>
                    </TouchableOpacity>

                </View>
                {/* </React.Fragment>
                } */}
                <View style={style.backgroundDown} />
            </View>

        );
    }
}
const mapStateToProps= state => {
	return {
		user: state.user,
	}
  }

export default connect(mapStateToProps)(withNavigation(StoreProfile));
