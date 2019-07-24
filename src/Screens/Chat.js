import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
// import firebase from 'firebase';
import { TouchableOpacity, Image,AsyncStorage } from 'react-native';
import { View, Text } from 'native-base';
import Users from './Users'
import firebase from 'firebase'

export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            person: props.navigation.getParam("name"),
            uid: props.navigation.getParam("userId"),
            // person: "Toko/Gunung",
            // uid: "user",
            myUid: '',
            myName: '',
            myAvatar: '',
            text: '',
            messagesList: []
        }
    }
    // static navigationOptions = ({ navigation }) => {
    //     return {
    //         headerVisible: true,
    //         headerTitle: navigation.getParam("name", null),
    //         // headerTitle: "Toko/Gunung",
    //         headerTitleStyle: {
    //             width: '90%',
    //             textAlign: 'right',
    //             color: 'white'
    //         },
    //         headerTintColor: 'white',
    //         headerStyle: {
    //             elevation: null,
    //             backgroundColor: '#34c759'
    //         },
    //         headerRight: (
    //             <TouchableOpacity
    //                 // onPress={() => navigation.navigate('Profil'
    //                 //     ,
    //                 //     {
    //                 //         name: navigation.getParam("name"),
    //                 //         email: navigation.getParam("email"),
    //                 //         gender: navigation.getParam("gender"),
    //                 //         birthday: navigation.getParam("birthday"),
    //                 //         avatar: navigation.getParam("avatar"),
    //                 //         userId: navigation.getParam("userId"),
    //                 //         status: navigation.getParam("status"),
    //                 //         info: navigation.getParam("info"),
    //                 //         phone: navigation.getParam("phone"),
    //                 //     }
    //                 // )}
    //             >
    //                 <Image style={{ borderWidth: 2, borderColor: 'white', borderRadius: 15, height: 32, width: 32, marginRight: 7 }}
    //                     // source={{ uri: navigation.getParam("avatar") }} 
    //                 />
    //             </TouchableOpacity>
    //         )
    //     }
    // }

    componentDidMount = async () => {
        this.setState({
            myUid: Users.id,
            myName: Users.name,
            myAvatar: 'Users.avatar'
        })

        await firebase.database().ref('messages/').child(Users.id).child(this.state.uid).on('child_added', (val) => {
            this.setState((prevState) => {
                return {
                    messagesList: GiftedChat.append(prevState.messagesList, val.val())
                }
            })
        })
    }

    // sendMessage = async () => {}

    sendMessage = async () => {
        if (this.state.text.length > 0) {
            let msgId = firebase.database().ref('messages').child(this.state.myUid).child(this.state.uid).push().key;
            let updates = {};
            let message = {
                _id: msgId,
                text: this.state.text,
                createdAt: firebase.database.ServerValue.TIMESTAMP,
                user: {
                    _id: this.state.myUid,
                    name: this.state.myName,
                    avatar: this.state.myAvatar
                },
            }
            updates["messages/" + this.state.myUid + '/' + this.state.uid + '/' + msgId] = message;
            updates["messages/" + this.state.uid + '/' + this.state.myUid + '/' + msgId] = message;
            firebase.database().ref().update(updates);
            this.setState({ text: '' })

        }
        else {
            alert('Please type a message first')
        }

    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text style={{ textAlign: 'center', padding: 10, fontWeight: 'bold', fontSize: 20, color: 'white', backgroundColor: '#34c759' }}>
                    {this.state.person}
                </Text>
            <GiftedChat
                text={this.state.text}
                messages={this.state.messagesList}
                user={{
                    _id: this.state.myUid
                }}
                onInputTextChanged={(text) => { this.setState({ text: text }) }}
                onSend={this.sendMessage}
            />
            </View>
        );
    }
}