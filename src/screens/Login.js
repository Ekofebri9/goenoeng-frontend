import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { Picker, Form, Icon } from 'native-base';
import { connect } from 'react-redux';
import { login } from '../public/redux/actions/user';
// import console = require('console');


class Login extends Component {
	state = {
		email: '',
		password: '',
		level: 'user',
	}

	handleLogin = async () => {
		const { email, password, level } = this.state;
		// const {navigation} = this.props.na
		let navigator = ''

		// console.log(navigator)
		this.props.dispatch(login(email, password, level)).then(() =>{
			this.props.user.user.level === 'partner' ? navigator = "ProfileUser" : navigator = "ProfileStore"
			this.props.navigation.navigate(navigator)
			// console.log(this.props.user.user.level)
		}
		)
	}

	componentWillMount() {
		BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
	  }
	
	  componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
	  }
	
	  onBackPress = () => {
	 
		//Code to display alert message when use click on android device back button.
		// Alert.alert(
		//   ' Exit From App ',
		//   ' Do you want to exit From App ?',
		//   [
		// 	{ text: 'Yes', onPress: () => this.props.navigation.navigate('Home') },
		// 	{ text: 'No', onPress: () => console.log('NO Pressed') }
		//   ],
		//   { cancelable: false },
		// );
	 
		// // Return true to enable back button over ride.
		// return true;
		return this.props.navigation.navigate('Home')
	  }

	onValueChange(value) {
		this.setState({
		  level: value
		});
	  }
	render() {
		return (
			<SafeAreaView style={styles.container}>
				<View style={[styles.container, {width: '100%'}]}>
					<StatusBar backgroundColor="transparent" barStyle="dark-content" />
					<Form style={{alignSelf:'center', width:'100%', alignItems:'center'}}>
					<TextInput
						placeholder    ="Email"
						autoCapitalize ="none"
						keyboardType   ="email-address"
						style          ={[styles.textInput, {marginBottom: 10}]}
						onChangeText   ={email => this.setState({ email })}
						value          ={this.state.email}
					/>
					<Picker
						mode="dropdown"
						style={[styles.textInput, { marginBottom: 10 }]}
						iosIcon={<Icon style={{ color: 'black' }} name="md-arrow-dropdown" />}
						placeholder="Pilih Sebagai"
						placeholderStyle={{ color: "white" }}
						placeholderIconColor="white"
						selectedValue={this.state.level}
						onValueChange={this.onValueChange.bind(this)}
					>
						<Picker.Item label="Customer" color='grey' value="user" />
						<Picker.Item label="Partner" color='grey' value="partner" />
					</Picker>
					<TextInput
						secureTextEntry
						placeholder    ="Kata Sandi"
						autoCapitalize ="none"
						style          ={[styles.textInput]}
						onChangeText   ={password => this.setState({ password })}
						value          ={this.state.password}
					/>
					<View style={{padding: 14}}>
						<Text>
							Don't have an account?&nbsp;
							<Text onPress={() => this.props.navigation.navigate('SignUp')} style={styles.textBtn}> 
								SignUp
							</Text>
						</Text>
					</View>
					</Form>
					
				</View>
				<View style={{width: '100%'}}>
					<TouchableOpacity onPress={this.handleLogin} style={styles.inputBtn}>
						<Text style={{fontWeight: '500', color:'white', fontSize: 16}}>Log in</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		)
	}
}

const mapStateToProps= state => {
	return {
		user: state.user,
	}
  }
export default connect(mapStateToProps)(Login);

const styles = StyleSheet.create({
	container: {
		flex          : 1,
		justifyContent: 'center',
	},
	textInput: {
		height         : 50,
		width          : '80%',
		backgroundColor: '#00000010',
		borderRadius   : 4,
		paddingLeft    : 15,
		paddingRight   : 15,
	},
	inputBtn: {
		backgroundColor: '#34c759',
		justifyContent: 'center',
		alignItems: 'center',
		height: 50,
		width: '100%',
		paddingLeft    : 15,
		paddingRight   : 15,
	},
	textBtn: {
		color   : '#000',
	},
});