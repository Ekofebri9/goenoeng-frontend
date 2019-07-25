import React, { Component } from 'react';
import {
    View, Text, StyleSheet, Dimensions, ImageBackground, TextInput, TouchableOpacity, KeyboardAvoidingView, AsyncStorage
} from 'react-native';
import style from '../Assets/Style'
import { connect } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler';
import { updateUser } from '../public/redux/actions/user'
import ImagePicker from 'react-native-image-picker'

const widthWindow = Dimensions.get('window').width
class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.user.user.name,
            // email: 'Try Satria@ymail.com',
            // password: '12456789',
            hp: this.props.user.user.phone,
            gender: this.props.user.gender,
            address: this.props.user.user.address,
            image: this.props.user.image,
            imageProfile: '',
            error: ''
        };
    }

    goback = () => {
        const { navigation } = this.props;
        navigation.goBack()
    }

    save = async () => {
        let data = await AsyncStorage.getItem('token')
        // console.log(data)
        this.props.dispatch(updateUser(data, this.state))
        // this.props.dispatch(fetchPartner(data))
        this.props.navigation.goBack();
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

    render() {
        // console.log("this.state.email");
        // const {state} = this.state
        return (
            <View>
                <View style={style.backgroundUp}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={this.handleUpdateImage}>
                            {this.state.imageProfile !== '' ?
                                <ImageBackground style={style.imageBox} source={this.state.imageProfile} /> :
                                <ImageBackground style={style.imageBox} source={{ uri: this.state.image }} />
                            }
                        </TouchableOpacity>
                        <View style={style.imageBox2}>
                            <ImageBackground style={{ height: 40, width: 40 }} source={require('../Assets/Icons/log_out.png')} />
                        </View>
                    </View>
                </View>
                <KeyboardAvoidingView style={style.loginBox} behavior="padding" enabled keyboardVerticalOffset={20}>
                    <ScrollView>
                        <View style={style.detailTextBox}>
                            <View style={[style.iconBox, { height: 50 }]}>
                                <ImageBackground style={style.imageIcon} source={require('../Assets/Icons/email.png')} />
                            </View>
                            <TextInput
                                onChangeText={text => this.setState({ name: text })}
                                style={style.textTop} >{this.state.name}</TextInput>
                        </View>
                        {/* <View style={style.detailTextBox}>
                            <View style={[style.iconBox, { height: 50 }]}>
                                <ImageBackground style={style.imageIcon} source={require('../Assets/Icons/email.png')} />
                            </View>
                            <TextInput
                                onChangeText={text => this.setState({ email: text })}
                                style={style.textTop} >{this.state.email}</TextInput>
                        </View> */}
                        {/* <View style={style.detailTextBox}>
                            <View style={[style.iconBox, { height: 50 }]}>
                                <ImageBackground style={style.imageIcon} source={require('../Assets/Icons/phone2.png')} />
                            </View>
                            <TextInput
                                onChangeText={text => this.setState({ password: text })}
                                secureTextEntry
                                style={style.textTop} >{this.state.password}</TextInput>
                        </View> */}
                        <View style={style.detailTextBox}>
                            <View style={[style.iconBox, { height: 50 }]}>
                                <ImageBackground style={style.imageIcon} source={require('../Assets/Icons/phone2.png')} />
                            </View>
                            <TextInput
                                onChangeText={text => this.setState({ hp: text })}
                                style={style.textTop} >{this.state.hp}</TextInput>
                        </View>
                        <View style={style.detailTextBox}>
                            <View style={[style.iconBox, { height: 50 }]}>
                                <ImageBackground style={style.imageIcon} source={require('../Assets/Icons/gender.png')} />
                            </View>
                            <TextInput style={style.textTop}>Male</TextInput>
                        </View>
                        <View style={style.detailTextBox}>
                            <View style={[style.iconBox, { height: 50 }]}>
                                <ImageBackground style={style.imageIcon} source={require('../Assets/Icons/gender.png')} />
                            </View>
                            <TextInput
                                onChangeText={text => this.setState({ address: text })}
                                style={style.textTop} >{this.state.address}</TextInput>
                        </View>
                        <View style={style.detailTextBox}>
                            <View style={[style.iconBox, { height: 50 }]}>
                                <ImageBackground style={style.imageIcon} source={require('../Assets/Icons/ig.png')} />
                            </View>
                            <TextInput
                                onChangeText={text => this.setState({ image: text })}
                                style={style.textTop} >{this.state.image}</TextInput>
                        </View>
                        <TouchableOpacity style={[style.buttonAddProduct, { alignSelf: 'center', width: widthWindow - 200, marginBottom: 20 }]} onPress={() => this.save()}>
                            <Text style={[style.loginText, { color: 'white' }]}>Save</Text>
                        </TouchableOpacity>

                    </ScrollView>
                </KeyboardAvoidingView>
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
export default connect(mapStateToProps)(EditProfile);
// export default EditProfile;
