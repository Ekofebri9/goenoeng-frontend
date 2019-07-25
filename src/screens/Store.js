import React, { Component } from 'react';
import { Text, View, Image, FlatList, Picker, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import NumericInput from 'react-native-numeric-input';
import Axios from 'axios';
import { connect } from 'react-redux';
import HeaderBack from '../components/HeaderBack';

class Store extends Component {
    constructor(props) {
        super(props)
        this.state = {
            idStore: props.navigation.getParam('_id'),
            nameStore: '',
            address: '',
            desc: '',
            photo: '',
            product: [],
            duration: 0,
            items: [],
            isLoading: true,
        }
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
    rentCount(id, value) {
        this.setState(prevState => ({
            product: prevState.product.map(obj => (obj._id === id ? Object.assign(obj, { rent: value }) : obj))
        }))
    }
    rent = async () => {
        await this.setState({
            items: this.state.product.filter(item => item.rent > 0)
        })
        console.warn(this.state.items, this.state.duration)
        if (!this.props.user.isLogin) {
            this.props.navigation.navigate('Login')
        } else {
            if (this.state.items.length > 0 && this.state.duration > 0) {
                console.warn(this.state.items.length)
                let rent = { product: this.state.items, day: this.state.duration }
                this.props.navigation.navigate('Transaction', rent)
            } else {
                let message
                if (this.state.items.length === 0) {
                    message = 'Tidak ada barang yang dipilih untuk di sewa\n silahkan pilih barang'
                } else {
                    message = 'Mohon isi durasi untuk di sewa'
                }
                Alert.alert('Peringatan', message)
            }
        }
    }
    async componentDidMount() {
        this.setState({ isLoading: true })
        await Axios.get('https://menung.herokuapp.com/partners/partner/' + this.state.idStore, { headers: { 'x-app-name': 'menung982998372771' } })
            .then(data => {
                //console.warn(data.data.data)
                this.setState({
                    longitude: data.data.data.location.coordinates[0],
                    latitude: data.data.data.location.coordinates[1],
                    nameStore: data.data.data.partner.name,
                    address: data.data.data.partner.address,
                    photo: data.data.data.image,
                    desc: data.data.data.description,
                    product: data.data.data.products
                })
            })
        this.setState({ isLoading: false })
    }
    render() {
        return (
            <View style={{ flex: 1, }}>
                <HeaderBack title={'Toko'} navigation={this.props.navigation} />
                <View style={{ flex: 2, flexDirection: 'row', margin: 10, borderColor: 'black', borderWidth: 2, borderRadius: 10 }}>
                    <Image source={{ uri: this.state.photo }} style={{ height: 100, width: 100, margin: 10, borderRadius: 10 }} />
                    <View style={{ padding: 10, flex: 1 }}>
                        <View style={{ alignSelf: 'flex-end', flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => {
                                let { longitude, latitude, nameStore } = this.state
                                this.props.navigation.navigate('Maps', 
                                { target: [longitude,latitude,nameStore] })
                                }}>
                                <Icon name='map-o' size={20} style={{ color: '#34c759' }} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginLeft: '5%' }} onPress={() => {
                                let { idStore, nameStore, photo } = this.state
                                let store= { idStore: idStore, nameStore: nameStore, photo: photo }
                                
                                let chat = { sender: this.props.user.user, receiver: store }
                                this.props.navigation.navigate('Chat', chat)
                                }}>
                                <Icon name='wechat' size={20} style={{ color: '#34c759' }} />
                            </TouchableOpacity>
                        </View>
                        <Text>{this.state.nameStore}</Text>
                        <Text>{this.state.address}</Text>
                        <Text>{this.state.desc}</Text>
                    </View>
                </View>
                <View style={{ flex: 6 }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <View>
                            <Text>Durasi penyewaan</Text>
                        </View>
                        <View>
                            <Picker
                                selectedValue={this.state.duration}
                                style={{
                                    height: 50,
                                    width: 120,
                                    borderWidth: 1,
                                    elevation: 5
                                }}
                                itemStyle={{ fontWeight: 'bold' }}
                                onValueChange={(itemValue, itemIndex) => { this.setState({ duration: itemValue }) }}>
                                <Picker.Item key={0} label='Hari' value={0} />
                                <Picker.Item key={1} label='1 hari' value={1} />
                                <Picker.Item key={2} label='2 hari' value={2} />
                                <Picker.Item key={3} label='3 hari' value={3} />
                                <Picker.Item key={4} label='4 hari' value={4} />
                                <Picker.Item key={5} label='5 hari' value={5} />
                                <Picker.Item key={6} label='6 hari' value={6} />
                                <Picker.Item key={7} label='7 hari' value={7} />
                            </Picker>
                        </View>
                    </View>
                    <View style={{ flex: 6, borderTopColor: 'black', borderTopWidth: 2 }}>
                        {this.state.isLoading ? <ActivityIndicator size="large" color="blue" /> :
                            <FlatList
                                data={this.state.product}
                                renderItem={({ item }) => {
                                    return (
                                        <View style={{ flexDirection: 'row', margin: 10, backgroundColor: '#34c759', borderRadius: 10 }}>
                                            <Image source={{ uri: item.images_product[0] }} style={{ height: 100, width: 100, margin: 10, borderRadius: 10 }} />
                                            <View style={{ padding: 5, flex: 1 }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <View style={{ flex: 2 }}>
                                                        <Text style={{ color: 'white' }}>Nama Item</Text>
                                                        <Text style={{ color: 'white' }}>Harga Sewa</Text>
                                                        <Text style={{ color: 'white' }}>Ketersediaan</Text>
                                                    </View>
                                                    <View style={{ flex: 3 }}>
                                                        <Text style={{ color: 'white' }} numberOfLines={1}>: {item.name_product}</Text>
                                                        <Text style={{ color: 'white' }}>: {this.priceFormat(item.price)}</Text>
                                                        <Text style={{ color: 'white' }}>: {item.stok}</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <NumericInput
                                                        value={item.stok - item.stok}
                                                        maxValue={item.stok}
                                                        minValue={1}
                                                        onChange={value => this.rentCount(item._id, value)} />
                                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailProduct', item)}
                                                        style={{ backgroundColor: 'white', margin: 10, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                                        <Text style={{ fontSize: 12, padding: 5 }}>Detail</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'row' }}>
                                                <NumericInput
                                                    value={item.stok - item.stok}
                                                    maxValue={item.stok}
                                                    minValue={0}
                                                    onChange={value => this.rentCount(item._id, value)} />
                                                <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailProduct', item)}
                                                    style={{ backgroundColor: 'white', margin: 10, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{ fontSize: 12, padding: 5 }}>Detail</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )
                                }}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        }
                    </View>
                    <View style={{ flex: 1, borderTopColor: 'black', borderTopWidth: 2, backgroundColor: 'white' }}>
                        <TouchableOpacity onPress={this.rent}
                            style={{ backgroundColor: '#34c759', margin: 10, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, padding: 5 }}>Sewa sekarang</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
    }
}
export default connect(mapStateToProps)(Store);