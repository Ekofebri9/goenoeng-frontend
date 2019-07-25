import React, { Component } from 'react'
import firebase from 'firebase'
import { GiftedChat } from 'react-native-gifted-chat'
import User from '../Api/User'
import { db } from '../Api/Config'


export default class DetailChat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            uid: '',
            oid: this.props.navigation.state.params,
            text: '',
            messagesList: [],
        }
    } 
    async componentWillMount() {
            await db.ref('messages').child(this.state.uid).child(this.state.oid)
                .on('child_added', (value) => {
                    this.setState((previousState) => {
                        return {
                            messagesList: GiftedChat.append(previousState.messagesList, value.val()),
                        }
                    })
                    // console.warn(messages)
                })
    }
    sendMessage = async () => {
        if (this.state.text.length > 0) {
            let msgId = db.ref('messages').child(this.state.uid).child(this.state.oid).push().key;
            let updates = {};
            let message = {
                _id: msgId,
                text: this.state.text,
                createdAt: firebase.database.ServerValue.TIMESTAMP,
                user: {
                    _id: this.state.uid
                }
            }
            updates['messages/' + this.state.uid + '/' + this.state.oid + '/' + msgId] = message;
            updates['messages/' + this.state.oid + '/' + this.state.uid + '/' + msgId] = message;
            db.ref().update(updates)
            this.setState({ text: '' })

        }

        
    }
    render() {
        return (
            <GiftedChat
                text={this.state.text}
                messages={this.state.messagesList}
                onSend={this.sendMessage}
                user={{
                    _id: this.state.uid
                }}
                onInputTextChanged={(value) => this.setState({ text: value })}
            />
        )
    }
}