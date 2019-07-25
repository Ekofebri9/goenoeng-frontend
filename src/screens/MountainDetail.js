import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Dimensions, TextInput, SafeAreaView, Image, ScrollView, AsyncStorage } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Carousel from 'react-native-snap-carousel'
import { Container, Header, Left, Body, Right, Button, Icon, Title, Thumbnail, Footer, FooterTab } from 'native-base';
import axios from 'axios'
import NumberFormat from 'react-number-format';
import firebase from 'firebase'
import { connect } from 'react-redux';

const { height, width } = Dimensions.get('window')

class MountainDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeIndex: 0,
            MountainPhotos: [
                'https://i.pinimg.com/564x/e5/6a/e1/e56ae1f08cd16acb2c47b53f5edc299f.jpg',
                'https://i.pinimg.com/564x/5e/3c/6b/5e3c6b968ac1ba5463f96fc370270b8a.jpg',
                'https://i.pinimg.com/564x/b6/3f/59/b63f590d457d01e7659b509e85acede9.jpg'
            ],
            mountainData: this.props.navigation.state.params,
            shops: [],
            userId: 0,
            partner: [],
            partnerId: 'user',
            partnerName: 'Gunung'
        }
    }
    // static navigationOptions = ({navigation}) => ({
    //   headerTitle: 'Nama Gunung',
    //   headerTitleStyle: { 
    //       width: '100%',
    //       textAlign: 'left',

    //   },
    // })

    _renderItem({ item, index }) {
        return (
            <Image style={{ flex: 1, resizeMode: 'contain', }} source={{ uri: item }} />
        )
    }

    prevCarouselImage = () => {
        this.state.activeIndex > 0 ?
            this.carousel._snapToItem(this.state.activeIndex - 1) : this.carousel._snapToItem(this.state.mountainData.images.length - 1)
    }

    nextCarouselImage = () => {
        this.state.activeIndex < this.state.mountainData.images.length - 1 ?
            this.carousel._snapToItem(this.state.activeIndex + 1) : this.carousel._snapToItem(0)
    }

    componentDidMount = async () => {
        await axios.get(`https://menung.herokuapp.com/partners/mountain/${this.state.mountainData._id}`, {
            headers: {
                'x-app-name': 'menung982998372771'
            }
        })
            .then((response) => { //use arrow to get setState on this call without any extra binding or placeholder variable
                console.warn('shop1', response.data.data);
                this.setState({
                    shops: response.data.data,
                })
            })
            // .then( async ()=>{
            .catch((error) => {
                console.warn(error)
            })

        // console.warn('nama', this.state.partner);
    }

    // realtimeListener = async () => {
    //     await firebase.database().ref('users/').on('child_added', (value) => {
    //         let person = value.val()
    //         // console.warn('masuk', value.val());
    //         person.userId = value.key
    //         person.manage = value.val().manage
    //         // console.warn('masuk', value.val().manage);
    //         if (person.userId === Users.id) {
    //             Users.name = person.name
    //             Users.email = person.email
    //             Users.status = person.status
    //         }
    //         else {
    //             // console.warn('id', this.state.mountainData._id)
    //             // console.warn('person',person.manage)
    //             if (person.manage === this.state.mountainData._id) {
    //                 // console.warn('masuk', person.name);
    //                 this.setState((prevState) => {
    //                     return {
    //                         partner: [...prevState.partner, person]
    //                     }
    //                 })
    //             }
    //         }
    //     })
    // }

    // fetchMountain = async () => {
    //     await axios.get(`https://menung.herokuapp.com/mountains/5d3642762084e22404f9f2d2`)
    //         .then(function (response) {
    //         //    this.setState({mountainData: response.data.data})
    //         console.warn('data',response.data.data);
    //         return response.data.data
    //         })
    //         .catch(function (error) {
    //             console.warn('error',error);
    //         });
    // }

    // _logOut = async () => {
    //     await firebase.database().ref('users/' + Users.id).update({
    //         status: 'offline'
    //     })
    //     await AsyncStorage.clear();
    //     Users.email = null
    //     Users.name = null
    //     Users.id = null
    //     Users.status = null
    //     Users.role = null
    //     this.props.navigation.navigate('Auth');
    // }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text style={{ textAlign: 'center', padding: 10, fontWeight: 'bold', fontSize: 20, color: 'white', backgroundColor: '#34c759' }}>
                    {this.state.mountainData.name}
                </Text>
                <ScrollView style={{ backgroundColor: 'white' }}>
                    <View style={{ height: 250, backgroundColor: 'white', flex: 5 }}>
                        <Carousel
                            ref={ref => this.carousel = ref}
                            data={this.state.mountainData.images}
                            sliderWidth={width}
                            itemWidth={width}
                            renderItem={this._renderItem}
                            onSnapToItem={
                                index => this.setState({ activeIndex: index })
                            }
                        />
                        <View style={{ flexDirection: 'row', alignSelf: 'center', top: 3, bottom: 20, left: 10 }}>
                            {this.state.mountainData.images.map((item, i) =>
                                <View key={i} style={{ width: 8, height: 8, borderRadius: 25, backgroundColor: this.state.activeIndex == i ? '#34c759' : '#e8eaed', margin: 3 }} />
                            )}
                        </View>

                    </View>
                    <View style={{ backgroundColor: 'white', width: '100%', flex: 1, padding: 20, justifyContent: 'space-evenly' }}>
                        <View style={{ flex: 2, flexDirection: 'row' }}>
                            <Text style={{ fontSize: 16, color: '#34c759', fontWeight: 'bold' }}>Detail</Text>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        let { _id, name, images } = this.state.mountainData
                                        let store = { idStore: _id, nameStore: name, photo: images }
                                        let chat = { sender: this.props.user.user, receiver: store }
                                        this.props.navigation.navigate('Chat', chat)
                                    }
                                    }>
                                    <FontAwesome style={{ fontSize: 20, color: '#34c759' }} name="wechat" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Maps',
                                    {
                                        target: [this.state.mountainData.location.coordinates[0], this.state.mountainData.location.coordinates[1], this.state.mountainData.name],
                                        shops: this.state.shops,
                                    })}
                                    style={{ marginLeft: '5%' }}>
                                    <FontAwesome style={{ fontSize: 20, color: '#34c759' }} name="map-o" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flex: 1, padding: 20, backgroundColor: 'white', marginBottom: 10 }}>
                            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                                <View style={{ flex: 1 }}>
                                    <Text>Ketinggian Puncak</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text>: {this.state.mountainData.summit} m</Text>
                                </View>
                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                                <View style={{ flex: 1 }}>
                                    <Text>Sisa Kuota Pendaki</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text>: {this.state.mountainData.quota} orang</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                                <View style={{ flex: 1 }}>
                                    <Text>Harga per-Pendaki</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <NumberFormat
                                        value={this.state.mountainData.price}
                                        displayType={'text'}
                                        thousandSeparator={true} prefix={'Rp '}
                                        renderText={value => <Text>: {value}</Text>}
                                    />
                                    {/* <Text>: {this.state.mountainData.price} orang</Text> */}
                                </View>
                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                                <View style={{ flex: 1 }}>
                                    <Text>Jenis Gunung</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text>: {this.state.mountainData.mountainType}</Text>
                                </View>
                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                                <View style={{ flex: 1 }}>
                                    <Text>Letak Gunung</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text>: {this.state.mountainData.address}</Text>
                                </View>
                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                                <View style={{ flex: 1 }}>
                                    <Text>Rute Termudah</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text>: {this.state.mountainData.easiestRoute}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Button
                                    onPress={() => this.props.navigation.navigate('BookingMountain', {
                                        userId: this.state.userId,
                                        userName: Users.name,
                                        mountainId: this.state.mountainData._id,
                                        mountainPrice: this.state.mountainData.price
                                    })}
                                    style={{ backgroundColor: '#34c759', justifyContent: 'center', width: 100, borderRadius: 10 }} >
                                    <Text style={{ fontSize: 16, color: 'white' }}>Booking</Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                    <View
                        style={{
                            borderBottomColor: '#34c759',
                            borderBottomWidth: 2,
                        }}
                    />
                    {console.warn('mountain', this.state.mountainData)}
                    <View style={{ backgroundColor: 'white', width: '100%', flex: 1, padding: 20, alignContent: 'space-around' }}>
                        <Text style={{ fontSize: 16, color: '#34c759', fontWeight: 'bold' }}>Saran Toko</Text>
                        {this.state.shops.map((item, i) =>
                            (
                                <View key={i} style={{ flex: 1, marginTop: 10, borderColor: '#34c759', borderWidth: 2, backgroundColor: 'white', width: '100%', height: '100%' }}>
                                    <TouchableOpacity
                                        // onPress={() => this.props.navigation.navigate('ProductCategory', { categoryId: item._id })} 
                                        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                                        <View style={{ flex: 1 }}><Text style={{ fontSize: 20 }}>{item.partner.name}</Text></View>
                                        <View style={{ right: 0 }}><Text style={{ color: 'grey' }}>{item.address}</Text></View>
                                    </TouchableOpacity>
                                    <ScrollView style={{ padding: 10, marginBottom: 20 }} horizontal={true}>
                                        {item.products.map((item, i) =>
                                            <TouchableOpacity key={i} style={{ flex: 1, width: 150, height: 150, backgroundColor: 'white', borderColor: '#34c759', borderWidth: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }}
                                            // onPress={() => this.props.navigation.navigate('DetailProduct', { productId: item._id })}
                                            >
                                                <Image style={{ width: 100, height: 100 }} source={{ uri: item.images_product[0] }} />
                                                <View style={{ width: '100%' }}>
                                                    <Text style={{ color: 'grey' }} numberOfLines={2}>{item.name_product}</Text>
                                                    {/* <Text style={{ color: '#dce1e6', fontSize: 15, marginTop: 15 }}>Rp {Math.ceil(item.product_price * 100 / (100 - 30))}</Text>
                                                    <Text style={{ fontSize: 15, marginTop: 5 }}>Rp {item.product_price}</Text>
                                                    <View style={{ backgroundColor: 'orange', padding: 3, width: '40%', marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text style={{ color: 'white' }}>30%</Text>
                                                    </View> */}
                                                </View>
                                            </TouchableOpacity>
                                        )}
                                    </ScrollView>
                                </View>
                            )
                        )}
                    </View>
                </ScrollView>
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        user: state.user,
    }
}
export default connect(mapStateToProps)(MountainDetail);
