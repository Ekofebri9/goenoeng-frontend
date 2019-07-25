import React, { Component } from 'react';
import { StyleSheet, KeyboardAvoidingView, ScrollView, AsyncStorage, Image, Text, TextInput, SafeAreaView, View, TouchableOpacity, StatusBar } from 'react-native';
// import firebase from 'firebase'
import { withNavigation } from 'react-navigation';
import { Picker, Form, Container, Header, Left, Body, Right, Button, Icon, Title, Thumbnail, Footer, FooterTab } from 'native-base';
// import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import { registerUser } from '../public/redux/actions/user';

class User extends Component {
	state = {
		email: null,
		name: null,
		address: null,
		password: null,
		passwordConfirm: null,
		phone: null,
		errEmail: false,
		errName: false,
		errAddress: false,
		errPassword: false,
		errPasswordConfirm: false,
		errPhone: false,
		level: 'user'
		// gender: 'Pria',
		// filePath: {},
	}

	// chooseFile = () => {
	// 	let options = {
	// 		title: 'Pilih Gambar',
	// 		storageOptions: {
	// 			skipBackup: true,
	// 			path: 'images',
	// 		},
	// 	};
	// 	ImagePicker.showImagePicker(options, response => {
	// 		if (response.didCancel) {
	// 			alert('Batal Pilih Gambar');
	// 		} else if (response.error) {
	// 			alert('Pilih Gambar Error: ' + response.error);
	// 		} else {
	// 			let source = response;
	// 			this.setState({
	// 				filePath: source,
	// 			});
	// 		}
	// 	});
	// };

	// onValueChange(value) {
	// 	this.setState({
	// 		gender: value
	// 	});
	// }

	changeName = val => {
		if (val.length < 5) {
			this.setState({
				errName: 'nama minimal 5 karakter'
			})
		}
		else {
			this.setState({
				name: val,
				errName: false
			})
		}
	}

	changeEmail = val => {
		if (val.length < 5) {
			this.setState({
				errEmail: 'email minimal 5 karakter'
			})
		}
		else {
			this.setState({
				email: val,
				errEmail: false
			})
		}
	}

	changeAddress = val => {
		
			this.setState({
				address: val,
				errAddress: false
			})
		
	}

	changePassword = val => {
		if (val.length < 6) {
			this.setState({
				errPassword: 'password minimal 6 karakter'
			})
		}
		else {
			this.setState({
				password: val,
				errPassword: false
			})
		}
	}

	changePasswordConfirm = val => {
		if (this.state.password != val) {
			this.setState({
				errPasswordConfirm: 'password tidak sama dengan konfirmasi'
			})
		}
		else {
			this.setState({
				passwordConfirm: val,
				errPasswordConfirm: false
			})
		}
	}

	changePhone = val => {
		if (val.length < 10) {
			this.setState({
				errPhone: 'nomor telepon minimal 10 karakter'
			})
		}
		else {
			this.setState({
				phone: val,
				errPhone: false
			})
		}
	}

	handleSignUp = () => {
		// firebase.auth()
		// 	.createUserWithEmailAndPassword(this.state.email, this.state.password)
		// 	.then(async (response) => {
		// 		await AsyncStorage.setItem('userId', response.user.uid)
		// 		// Users.id = await AsyncStorage.getItem('userId')
		// 		await AsyncStorage.setItem('userPassword', this.state.password)
		// 		let userf = firebase.auth().currentUser;
		// 		userf.updateProfile({ displayName: this.state.name })
		// 		firebase.database().ref('users/' + response.user.uid).set({
		// 			name: this.state.name,
		// 			email: this.state.email,
		// 			role: 'customer',
		// 			status: 'offline'
		// 		})

		// Users.email = this.state.email
		// Users.name = this.state.name
		// Users.role = 'customer'
		// Users.status = 'offline'

		// 	alert("User " + this.state.name + " berhasil dibuat. otomatis login.")
		// 	this.props.navigation.navigate('App')
		// }, function (error) {
		// 	alert("User gagal dibuat. Error: " + error.message);
		// })

		if (this.state.name == null) {
			this.setState({
				errName: 'nama tidak boleh kosong'
			})
		}
		else if (this.state.address == null) {
			this.setState({
				errAddress: 'alamat tidak boleh kosong'
			})
		}
		else if (this.state.email == null) {
			this.setState({
				errEmail: 'email tidak boleh kosong'
			})
		}
		else if (this.state.phone == null) {
			this.setState({
				errPhone: 'nomor telepon tidak boleh kosong'
			})
		}
		else if (this.state.password == null) {
			this.setState({
				errPassword: 'password tidak boleh kosong'
			})
		}
		else if (this.state.password != this.state.passwordConfirm) {
			this.setState({
				errPasswordConfirm: 'password tidak sama dengan konfirmasi'
			})
		}
		else{

		const { email, password, name, address, phone, level } = this.state;
		this.props.dispatch(registerUser(email, password, name, address, phone, level))
			.then(() => {
				this.props.navigation.navigate('Home')
			}, function (error) {
				alert("Email Sudah Terdaftar / Format Email Tidak Benar");
			})
		}
	}

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<View style={[styles.container, { width: '100%' }]}>
					<StatusBar backgroundColor="#fff" barStyle="dark-content" />
					{/* <ScrollView> */}
					{/* <Image
						source={{ uri: this.state.filePath.uri }}
						style={{ width: 250, alignSelf: 'center', marginBottom: '5%', marginTop: '5%', borderWidth: 2, borderColor: '#34c759', height: 250 }}
					/>
					<Button
						style={{ borderWidth: 2, borderColor: '#34c759', width: '90%', backgroundColor: 'white', alignSelf: 'center', justifyContent: 'center', marginBottom:10 }}
						onPress={this.chooseFile.bind(this)}>
						<Text >Pilih Gambar Profil</Text>
					</Button> */}
					{/* <Form style={{alignSelf:'center', width:'100%', alignItems:'center'}}> */}
					{/* <KeyboardAvoidingView> */}
					<ScrollView style={{ width: '100%', marginTop: '20%' }}>
						<View style={[styles.container, { width: '100%' }]}>
							<TextInput
								placeholder="Nama"
								autoCapitalize="none"
								style={[styles.textInput, { marginBottom: 10 }]}
								onChangeText={this.changeName}
								value={this.state.name}
							/>
							{
								this.state.errName !== false ? <Text style={{ marginTop: 10, marginLeft: 5, color: '#ff0000' }}>{this.state.errName}</Text> : null
							}
							<TextInput
								placeholder="Alamat"
								autoCapitalize="none"
								style={[styles.textInput, { marginBottom: 10 }]}
								onChangeText={this.changeAddress}
								value={this.state.address}
								multiline={true}
								numberOfLines={3}
							/>
							{
								this.state.errAddress !== false ? <Text style={{ marginTop: 10, marginLeft: 5, color: '#ff0000' }}>{this.state.errAddress}</Text> : null
							}
							{/* <Picker
						mode="dropdown"
						style={[styles.textInput, { marginBottom: 10 }]}
						iosIcon={<Icon style={{ color: 'white' }} name="md-arrow-dropdown" />}
						placeholder={"Pilih Jenis Kelamin"}
						placeholderStyle={{ color: "grey" }}
						placeholderIconColor="grey"
						// style={{ width: undefined }}
						selectedValue={this.state.gender}
						onValueChange={this.onValueChange.bind(this)}
					>
						<Picker.Item label="Pria" color='grey' value="Pria" />
						<Picker.Item label="Wanita" color='grey' value="Wanita" />
					</Picker> */}
							<TextInput
								placeholder="Email"
								autoCapitalize="none"
								keyboardType="email-address"
								minLength={3}
								style={[styles.textInput, { marginBottom: 10 }]}
								onChangeText={this.changeEmail}
								value={this.state.email}
							/>
							{
								this.state.errEmail !== false ? <Text style={{ marginTop: 10, marginLeft: 5, color: '#ff0000' }}>{this.state.errEmail}</Text> : null
							}
							<TextInput
								placeholder="No Telepon"
								autoCapitalize="none"
								minLength={10}
								keyboardType={'numeric'}
								style={[styles.textInput, { marginBottom: 10 }]}
								onChangeText={this.changePhone}
								value={this.state.phone}
							/>
							{
								this.state.errPhone !== false ? <Text style={{ marginTop: 10, marginLeft: 5, color: '#ff0000' }}>{this.state.errPhone}</Text> : null
							}
							<TextInput
								secureTextEntry
								placeholder="Kata Sandi"
								autoCapitalize="none"
								minLength={6}
								style={[styles.textInput, { marginBottom: 10 }]}
								onChangeText={this.changePassword}
								value={this.state.password}
							/>
							{
								this.state.errPassword !== false ? <Text style={{ marginTop: 10, marginLeft: 5, color: '#ff0000' }}>{this.state.errPassword}</Text> : null
							}
							<TextInput
								secureTextEntry
								placeholder="Konfirmasi Kata Sandi"
								autoCapitalize="none"
								minLength={6}
								style={[styles.textInput, { marginBottom: 10 }]}
								onChangeText={this.changePasswordConfirm}
								value={this.state.passwordConfirm}
							/>
							{
								this.state.errPasswordConfirm !== false ? <Text style={{ marginTop: 10, marginLeft: 5, color: '#ff0000' }}>{this.state.errPasswordConfirm}</Text> : null
							}
						</View>
					</ScrollView>
					{/* </KeyboardAvoidingView> */}
					{/* </Form> */}
				</View>
				<View style={{ padding: 14, width: '100%', alignItems: 'center', alignSelf: 'center', backgroundColor: 'white' }}>
					<Text>
						Already have an account?&nbsp;
							<Text onPress={() => this.props.navigation.navigate('Login')} style={styles.textBtn}>
							Login
							</Text>
					</Text>
				</View>
				<View style={{ width: '100%' }}>
					<TouchableOpacity onPress={this.handleSignUp} style={styles.inputBtn}>
						<Text style={{ fontWeight: '500', color: 'white', fontSize: 16 }}>Sign Up</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	textInput: {
		height: 50,
		width: '80%',
		backgroundColor: '#00000010',
		borderRadius: 4,
		paddingLeft: 15,
		paddingRight: 15,
	},
	inputBtn: {
		backgroundColor: '#34c759',
		justifyContent: 'center',
		alignItems: 'center',
		height: 50,
		width: '100%',
		paddingLeft: 15,
		paddingRight: 15,
	},
	textBtn: {
		color: '#000',
	},
});

const mapStateToProps = state => {
	return {
		user: state.user,
	}
}
export default withNavigation(connect(mapStateToProps)(User))
