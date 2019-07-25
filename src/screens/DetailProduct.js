import React, { Component } from 'react';
import { Text, View, Image, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import HeaderBack from '../components/HeaderBack';
const { height, width } = Dimensions.get('window')

class DetailProduct extends Component {
    constructor(props) {
        super(props)
        const { navigation } = this.props;
        this.state = {
            id: navigation.getParam('_id'),
            name: navigation.getParam('name_product'),
            rentPrice: navigation.getParam('price'),
            stock: navigation.getParam('stok'),
            desc: navigation.getParam('description'),
            photo: navigation.getParam('images_product'),
            activeIndex: 0,
        }
    }
    _renderItem({ item, index }) {
        return (
            <Image style={{ flex: 1, resizeMode: 'contain', }} source={{ uri: item }} />
        )
    }
    prevCarouselImage = () => {
        this.state.activeIndex > 0 ?
            this.carousel._snapToItem(this.state.activeIndex - 1) : this.carousel._snapToItem(this.state.carouselItems.length - 1)
        this.state.activeIndex < this.state.carouselItems.length - 1 ?
            this.carousel._snapToItem(this.state.activeIndex + 1) : this.carousel._snapToItem(0)
    }
    priceFormat(number) {

        let number_string = number.toString(),
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
            <View style={{ flex: 1, }}>
                <HeaderBack title={'Detail Barang'} navigation={this.props.navigation}/>
                <View style={{ height: 500, flex: 2 }}>
                    <Carousel
                        ref={ref => this.carousel = ref}
                        data={this.state.photo}
                        sliderWidth={width}
                        itemWidth={width}
                        renderItem={this._renderItem}
                        onSnapToItem={
                            index => this.setState({ activeIndex: index })

                        }
                    />
                </View>
                <View style={{ padding: 5, flex: 2 }}>
                    <View style={{ flexDirection: 'row',flex: 1 }}>
                        <View style={{ flex: 2 }}>
                            <Text style={{ color: 'black', fontSize:18, backgroundColor: '#e3e3e3' }}>Nama Item</Text>
                            <Text style={{ color: 'black', fontSize:18 }}>Harga Sewa</Text>
                            <Text style={{ color: 'black', fontSize:18, backgroundColor: '#e3e3e3'  }}>Ketersediaan</Text>
                            <Text style={{ color: 'black', fontSize:18 }}>Deskripsi</Text>
                        </View>
                        <View style={{ flex: 3 }}>
                            <Text style={{ color: 'black', fontSize:18, backgroundColor: '#e3e3e3'  }} numberOfLines={1}>: {this.state.name}</Text>
                            <Text style={{ color: 'black', fontSize:18 }}>: {this.priceFormat(this.state.rentPrice)}</Text>
                            <Text style={{ color: 'black', fontSize:18, backgroundColor: '#e3e3e3'  }}>: {this.state.stock}</Text>
                            <Text style={{ color: 'black', fontSize:18 }}>: {this.state.desc}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
export default DetailProduct;