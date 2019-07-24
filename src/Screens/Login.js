import React, { Component } from 'react';
import { Text, AsyncStorage,View, StyleSheet, TextInput, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { Picker, Form, Container, Header, Left, Body, Right, Button, Icon, Title, Thumbnail, Footer, FooterTab } from 'native-base';
import Users from './Users'
import firebase from 'firebase'

export default class Login extends Component {
	state = { 
		email       : '',
		password    : '',
		privilege:'Customer',
	}

	handleLogin = async() => {
		await firebase.auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((async (response) => {
        let userf = firebase.auth().currentUser;
        await AsyncStorage.setItem('userId', userf.uid)
        await AsyncStorage.setItem('userPassword', this.state.password)
        Users.id = await AsyncStorage.getItem('userId');
        await firebase.database().ref('users/' + userf.uid)
          .update({
            status: 'online'
          })

        alert('login berhasil, selamat datang di menung.');
        this.props.navigation.navigate('App');
      }),
        function (error) {
          alert('login gagal. Error: ' + error.message)
        })
	}

	onValueChange(value) {
		this.setState({
		  privilege: value
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
						// style={{ width: undefined }}
						selectedValue={this.state.privilege}
						onValueChange={this.onValueChange.bind(this)}
					>
						<Picker.Item label="Customer" color='grey' value="Customer" />
						<Picker.Item label="Partner" color='grey' value="Partner" />
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
const styles = StyleSheet.create({
	container: {
		flex          : 1,
		justifyContent: 'center',
		// alignItems    : 'center',
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