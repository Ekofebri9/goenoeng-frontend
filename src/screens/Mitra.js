import React, { Component } from 'react';
import { StyleSheet,ScrollView, AsyncStorage, Text,Image, TextInput, SafeAreaView, View, TouchableOpacity, StatusBar } from 'react-native';

import firebase from 'firebase'
import { withNavigation } from 'react-navigation';
import { Picker, Form, Container, Header, Left, Body, Right, Button, Icon, Title, Thumbnail, Footer, FooterTab } from 'native-base';
// import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import { registerPartner } from '../public/redux/actions/user';
import MapView from 'react-native-maps';

class Mitra extends Component {
	state = {
		email: '',
		name: '',
		address: '',
		password: '',
		phone: 0,
		level: 'partner',
		latitude: -6.270565,
		longitude: 106.759550,
	  	// mountain: '',
		// filePath: {},
	}

	mergeLot() {
		if (this.state.latitude != null && this.state.longitude != null) {
		  let concatLot = this.state.latitude + "," + this.state.longitude
		  this.setState({
			concat: concatLot
		  }, () => {
			this.getDirections(concatLot, "-6.270565,106.759550");
		  });
		}
	
	  }
	
	async getDirections(startLoc, destinationLoc) {
	
		try {
		  let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}`)
		  let respJson = await resp.json();
		  let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
		  let coords = points.map((point, index) => {
			return {
			  latitude: point[0],
			  longitude: point[1]
			}
		  })
		  this.setState({ coords: coords })
		  this.setState({ x: "true" })
		  return coords
		} catch (error) {
		  console.log('masuk fungsi')
		  this.setState({ x: "error" })
		  return error
		}
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
	// 	  mountain: value
	// 	});
	//   }

	handleSignUp = () => {
		// firebase.auth()
		// 	.createUserWithEmailAndPassword(this.state.email, this.state.password)
		// 	.then(async (response) => {
		// 		await AsyncStorage.setItem('userId', response.user.uid)
		// 		//Users.id = await AsyncStorage.getItem('userId')
		// 		await AsyncStorage.setItem('userPassword', this.state.password)
		// 		let userf = firebase.auth().currentUser;
		// 		userf.updateProfile({ displayName: this.state.name })
		// 		firebase.database().ref('users/' + response.user.uid).set({
		// 			name: this.state.name,
		// 			email: this.state.email,
		// 			role: 'partner',
		// 			manage: '5d3642762084e22404f9f2d2',
		// 			status: 'offline'
		// 		})

				// Users.email = this.state.email
				// Users.name = this.state.name
				// Users.role = 'partner'
				// Users.status = 'offline'

			// 	alert("User " + this.state.name + " berhasil dibuat. otomatis login.")
			// 	this.props.navigation.navigate('App')
			// }, function (error) {
			// 	alert("User gagal dibuat. Error: " + error.message);
			// })
			navigator.geolocation.getCurrentPosition(
				(position) => {
				  this.setState({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
					error: null,
				  });
				  this.mergeLot();
				},
				(error) => this.setState({ error: error.message }),
				{ enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
			  );

		const { email,password,name,address,phone,level, latitude, longitude } = this.state;
		this.props.dispatch( registerPartner( email,password,name,address,phone,level, latitude, longitude )).then(()=> this.props.navigation.navigate('Home'))
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
						<Text >Pilih Gambar Toko</Text>
					</Button> */}
					{/* <Form style={{alignSelf:'center', width:'100%', alignItems:'center'}}> */}
					<TextInput
						placeholder="Nama Toko"
						autoCapitalize="none"
						style={[styles.textInput, { marginBottom: 10 }]}
						onChangeText={name => this.setState({ name })}
						value={this.state.name}
					/>
					<TextInput
						placeholder="Alamat"
						autoCapitalize="none"
						style={[styles.textInput, { marginBottom: 10 }]}
						onChangeText={address => this.setState({ address })}
						value={this.state.address}
						multiline={true}
						numberOfLines={3}
					/>
					{/* <Picker
						mode="dropdown"
						style={[styles.textInput, { marginBottom: 10 }]}
						iosIcon={<Icon style={{ color: 'white' }} name="md-arrow-dropdown" />}
						placeholder={"Pilih Gunung Terdekat"}
						placeholderStyle={{ color: "grey" }}
						placeholderIconColor="grey"
						// style={{ width: undefined }}
						selectedValue={this.state.mountain}
						onValueChange={this.onValueChange.bind(this)}
					>
						<Picker.Item label="Gunung Slamet" color='grey' value="Slamet ID" />
						<Picker.Item label="Gunung Semeru" color='grey' value="Semeru ID" />
					</Picker> */}
					<TextInput
						placeholder="Email"
						autoCapitalize="none"
						keyboardType="email-address"
						style={[styles.textInput, { marginBottom: 10 }]}
						onChangeText={email => this.setState({ email })}
						value={this.state.email}
					/>
					<TextInput
						placeholder="No Telepon"
						autoCapitalize="none"
						keyboardType={'numeric'}
						style={[styles.textInput, { marginBottom: 10 }]}
						onChangeText={phone => this.setState({ phone })}
						value={this.state.phone}
					/>
					<TextInput
						secureTextEntry
						placeholder="Kata Sandi"
						autoCapitalize="none"
						style={[styles.textInput, { marginBottom: 10 }]}
						onChangeText={password => this.setState({ password })}
						value={this.state.password}
					/>
					{/* </Form>
					</ScrollView> */}
				</View>
				<View style={{ padding: 14, alignSelf:'center' }}>
						<Text>
							Already have an account?&nbsp;
							<Text onPress={() => this.props.navigation.navigate('Login')} style={styles.textBtn}>
								Login
							</Text>
						</Text>
					</View>
					
				<View style={{ width: '100%' }}>
					<TouchableOpacity onPress={this.handleSignUp} style={styles.inputBtn}>
						<Text style={{ fontWeight: '500', color:'white', fontSize: 16 }}>Sign Up</Text>
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

const mapStateToProps= state => {
	return {
		user: state.user,
	}
  }
export default withNavigation(connect(mapStateToProps)(Mitra))
