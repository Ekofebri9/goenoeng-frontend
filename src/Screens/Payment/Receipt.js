import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, SafeAreaView, StatusBar, TouchableOpacity, Dimensions } from 'react-native';

export default class Receipt extends Component {
	state = {
		price: '100000',
		norek: '0123456789123456',
		bank : 'BRI',
		transactionCode: ['D','X','3','8','2','0','0','1','6','6','9']
	}

	priceFormat(number) {

        var number_string = number.toString(),
            sisa = number_string.length % 3,
            rupiah = number_string.substr(0, sisa),
            ribuan = number_string.substr(sisa).match(/\d{3}/g);

        if (ribuan) {
            let separator = sisa ? '.' : '';
            rupiah += separator + ribuan.join('.');
        }
        
        return 'Rp ' + rupiah;
    }

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<View style={[styles.container, {width: '100%'}]}>
					<StatusBar backgroundColor="transparent" barStyle="dark-content" />
					<View>
                        <Text style={[styles.text, {marginBottom: 10}]}>Kode Transaksi</Text>
						<View style={{flexDirection: 'row', width: '80%'}}>
							{
								this.state.transactionCode.map((num) => {
									<TextInput
										style          ={[styles.textInput, styles.text, {width: '100%'}]}
										value          ={num}
										editable	   ={false}
									/>
								})
							}
						</View>
                    </View>
					<View style={{marginBottom: 10}}>
						<Text style={[styles.text, {marginBottom: 10}]}>Total</Text>
						<TextInput
							style          ={[styles.textInput, styles.text]}
							value          ={this.priceFormat(this.state.price)}
							editable	   ={false}
						/>
					</View>
					<View>
                        <Text style={[styles.text, {marginBottom: 10}]}>No. Rekening</Text>
						<TextInput
							style          ={[styles.textInput, styles.text]}
							maxLength	   ={16}
							value          ={this.state.norek}
							editable	   ={false}
						/>
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
		justifyContent: 'center',
		alignItems    : 'center',
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