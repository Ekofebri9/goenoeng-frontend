import React, { Component } from 'react';
import { Alert, AsyncStorage, Platform, Text, View, TextInput, ImageBackground, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import styles from '../Assets/Style'
import ImagePicker from 'react-native-image-picker'
import {addProduct} from '../public/redux/actions/store_product'
import {connect} from 'react-redux'
// import console = require('console');

class AddProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stock: 0,
            imagephoto: require('../Assets/Icons/Placeholder.jpg'),
            imageProfile: '',
            name: '',
            price: '',
            description: ''

        }
    }
    back = () => {
        const { navigation } = this.props
        navigation.goBack()
    }
    handleUpdateImage = async () => {
        const options = {
            noData: true,
            mediaType: 'photo'
        }
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                Alert.alert('User cancelled image picker');
            } else if (response.error) {
                Alert.alert('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                Alert.alert('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri }
                const sendSource = response
                this.setState({
                    imageProfile: source,
                    image: sendSource
                });
            }
        })
    }

    save = async () => {
        const {state} = this
        let data = await AsyncStorage.getItem('token')
        // let data = await AsyncStorage.getItem('level')
        console.log(state)
        if(state.name !== '' && state.price !== '' && state.description !== '' && state.imageProfile !== ''){
            this.props.dispatch(addProduct(data, this.state))
        }else{
            Alert.alert('Input All Data');
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={styles.iconBox3} onPress={() => this.back()}>
                        <ImageBackground style={{ height: 40, width: 40 }}
                            source={require('../Assets/Icons/back.png')} />
                    </TouchableOpacity>
                    <View style={styles.headBox}>
                        <Text style={styles.headTitle} >Add Product</Text>
                    </View>
                </View>
                {/* <View style={}> */}
                <KeyboardAvoidingView style={styles.addBox} behavior="padding" enabled keyboardVerticalOffset={20}>
                    <ScrollView>
                        <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center', justifyContent: 'flex-start' }}>
                            <View style={styles.inputBox}>
                                <TouchableOpacity onPress={this.handleUpdateImage}>
                                    {this.state.imageProfile !== '' ?
                                        <ImageBackground
                                            style={styles.inputBoxImage}
                                            source={this.state.imageProfile}></ImageBackground> :
                                        <ImageBackground
                                            style={styles.inputBoxImage}
                                            source={this.state.imagephoto}></ImageBackground>
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.inputBox}>
                            <Text style={{ fontSize: 18 }}>Name</Text>
                            <TextInput style={styles.inputTextAdd} 
                            onChangeText={text => this.setState({name: text})}
                            placeholder={"Product Name..."}></TextInput>
                        </View>
                        <View style={styles.inputBox}>
                            <Text style={{ fontSize: 18 }}>Price</Text>
                            <TextInput style={styles.inputTextAdd}
                                keyboardType="number-pad"
                                onChangeText={text => this.setState({price: text})}
                                placeholder={"Product Price..."}></TextInput>
                        </View>
                        <View style={styles.inputBox}>
                            <Text style={{ fontSize: 18 }}>Description</Text>
                            <TextInput style={styles.inputTextAdd} 
                            onChangeText={text => this.setState({description: text})}
                            placeholder={"Product Description..."}></TextInput>
                        </View>
                        {/* <View style={styles.inputBox}>
                        <Text style={{ fontSize: 18 }}>Image</Text>
                        <TextInput style={styles.inputTextAdd} placeholder={"Image Link..."}></TextInput>
                    </View> */}

                        <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 20, alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                <Text style={{ fontSize: 18 }}>Stock: </Text>
                                <TouchableOpacity onPress={() => this.setState({ stock: this.state.stock - 1 })}>

                                    <Text style={{ marginLeft: 10, color: '#03AC0E', fontSize: 15, borderColor: '#03AC0E', borderRadius: 100, borderWidth: 2, textAlign: 'center', paddingLeft: 7, paddingRight: 7, fontWeight: 'bold' }}>-</Text>
                                </TouchableOpacity>
                                <TextInput keyboardType="number-pad"
                                onChangeText={text => this.setState({stock: text})}
                                 style={[styles.inputTextAdd, { marginLeft: 5, fontSize: 12, borderColor: 'white' }]} placeholder={"0"}>{this.state.stock}</TextInput>
                                <TouchableOpacity onPress={() => this.setState({ stock: this.state.stock + 1 })}>
                                    <Text style={{ color: '#03AC0E', fontSize: 15, borderColor: '#03AC0E', borderRadius: 100, borderWidth: 2, textAlign: 'center', paddingLeft: 7, paddingRight: 7, fontWeight: 'bold' }}>+</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={[styles.buttonAddProduct, { alignSelf: 'center', width: 100, backgroundColor: 'rgb(45, 173, 78)', marginRight: 20, marginBottom: 20 }]} onPress={() => this.save()}>
                                <Text style={[styles.loginText, { color: 'white' }]}>Add</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                {/* </View> */}
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        store_product: state.store_product,
    }
}
export default connect(mapStateToProps)(AddProduct);