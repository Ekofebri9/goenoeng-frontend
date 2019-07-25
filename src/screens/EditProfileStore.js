import React, { Component } from 'react';
import {
    Alert, View, Text, AsyncStorage, Dimensions, ImageBackground, TextInput, TouchableOpacity, KeyboardAvoidingView
} from 'react-native';
import style from '../Assets/Style'
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux'
import { updatePartner, fetchPartner } from '../public/redux/actions/user'
import ImagePicker from 'react-native-image-picker'
// import console = require('console');

const widthWindow = Dimensions.get('window').width
const heightWindow = Dimensions.get('window').height
class EditProfileStore extends Component {
    constructor(props) {
        super(props);
        // const {user} = this.props.user.user
        console.log(this.props.user.user)
        this.state = {
            name: this.props.user.user.name,
            // email: this.props.user.user.email,
            description: this.props.user.user.description,
            hp: this.props.user.user.phone,
            address: this.props.user.user.address,
            image: this.props.user.image,
            imageProfile: '',
            error: 'user.name',
        };
    }

    goback = () => {
        const { navigation } = this.props;
        navigation.goBack()
    }

    save = async () => {
        let data = await AsyncStorage.getItem('token')
        // console.log(data)
        this.props.dispatch(updatePartner(data, this.state))
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
        // console.log(this.state)
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
                        {/* <View style={style.imageBox2}>
                            <ImageBackground style={{ height: 40, width: 40 }} source={require('../Assets/Icons/log_out.png')} />
                        </View> */}
                    </View>
                </View>
                <KeyboardAvoidingView style={[style.loginBox, { height: heightWindow / 1.6, width: widthWindow - 80 }]} behavior="padding" enabled keyboardVerticalOffset={20}>
                    <ScrollView>
                        <View style={style.detailTextBox}>
                            <View style={[style.iconBox, { height: 50 }]}>
                                <ImageBackground style={style.imageIcon} source={require('../Assets/Icons/email.png')} />
                            </View>
                            <TextInput
                                onChangeText={text => this.setState({ name: text })}
                                style={style.textTop} >{this.props.user.user.name}</TextInput>
                        </View>
                        <View style={style.detailTextBox}>
                            <View style={[style.iconBox, { height: 50 }]}>
                                <ImageBackground style={style.imageIcon} source={require('../Assets/Icons/phone2.png')} />
                            </View>
                            <TextInput
                                onChangeText={text => this.setState({ hp: text })}
                                style={style.textTop} >{this.props.user.user.phone}</TextInput>
                        </View>
                        <View style={style.detailTextBox}>
                            <View style={[style.iconBox, { height: 50 }]}>
                                <ImageBackground style={style.imageIcon} source={require('../Assets/Icons/gender.png')} />
                            </View>
                            <TextInput
                                onChangeText={text => this.setState({ address: text })}
                                style={style.textTop} >{this.props.user.user.address}</TextInput>
                        </View>
                        <View style={style.detailTextBox}>
                            <View style={[style.iconBox, { height: 50 }]}>
                                <ImageBackground style={style.imageIcon} source={require('../Assets/Icons/ig.png')} />
                            </View>
                            <TextInput
                                onChangeText={text => this.setState({ description: text })}
                                style={style.textTop} >{this.props.user.description}</TextInput>
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
export default connect(mapStateToProps)(EditProfileStore);
