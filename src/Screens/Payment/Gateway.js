import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, SafeAreaView, StatusBar, TouchableOpacity, Picker, Dimensions } from 'react-native';
import { postTransaction } from '../../public/redux/actions/transaction';

export default class Gateway extends Component {
	state = {
		bank: [
			{
				id: 1,
				name: 'BRI'
			},{
				id: 2,
				name: 'BNI'
			},{
				id: 3,
				name: 'Mandiri'
			},{
				id: 4,
				name: 'OCBC NISP'
			},{
				id: 5,
				name: 'BTN'
			},{
				id: 6,
				name: 'CIMB'
			}
		],
		key: '8A764683-589B-4DE6-9A4F-B1D3322575DC',
		norek: '',
		price: '',
		payment: null,
		password: '',
	}

	transaction = () => {
		this.props.dispatch(postTransaction({}))
	}

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<View style={[styles.container, {width: '100%'}]}>
					<StatusBar backgroundColor="transparent" barStyle="dark-content" />
					<View style={{padding: 20, alignItems: 'center'}}>
                        <Text style={[styles.text, {width: Dimensions.get('window').width * 0.8}]}>Metode Pembayaran</Text>
                        <Picker 
	                        style={{width: Dimensions.get('window').width * 0.8}}
	                        selectedValue={this.state.payment}
							style={{height: 50, width: Dimensions.get('window').width * 0.8}}
							onValueChange={(item) => this.setState({payment: item})}>
                        		<Picker.Item style={{width: 300}} label='Pilih' value={null} />
                    			{this.state.bank.map((payment) =>
									<Picker.Item label={payment.name} value={payment.name} />
								)}
						</Picker>
						{this.state.payment &&
							<View>
								<TextInput
									placeholder    ="Masukkan Nomor Rekening"
									autoCapitalize ="none"
									keyboardType   ="numeric"
									maxLength	   ={this.state.payment == 'Mandiri' ? 13 :
													this.state.payment == 'CIMB' ? 13 : 
													this.state.payment == 'BRI' ? 15 : 
													this.state.payment == 'BTN' ? 16 : 
													this.state.payment == 'OCBC NISP' ? 12 : 10}
									style          ={[styles.textInput, {marginBottom: 10}]}
									onChangeText   ={norek => this.setState({ norek })}
									value          ={this.state.norek}
								/>
								<TextInput
									secureTextEntry
									placeholder    ="Kata Sandi"
									autoCapitalize ="none"
									style          ={[styles.textInput]}
									onChangeText   ={password => this.setState({ password })}
									value          ={this.state.password}
								/>
							</View>
						}
                    </View>
				</View>
				<View style={{width: '100%'}}>
					<TouchableOpacity style={styles.inputBtn}>
						<Text style={{fontWeight: '500', fontSize: 16}}>Bayar</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex          : 1,
	},
	text: {
		fontSize: 18,
		color: '#000'
	},
	textInput: {
		height         : 50,
		width          : Dimensions.get('window').width * 0.8,
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