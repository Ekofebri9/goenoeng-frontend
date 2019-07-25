import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity,
} from "react-native";
import moment from 'moment'

let total = 0

class Transaction extends Component {

    constructor(props) {
        // console.disableYellowBox = true;
        super(props)
        this.state = {
            total: 0,
            lama: this.props.navigation.state.params.day,
            transaction: this.props.navigation.state.params,
        }
    }

    componentWillMount() {
        this.state.transaction.product.map((item) => {
            total += parseInt(item.price * item.rent)
        })
    }

    componentWillUnmount() {
        total = 0
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

    keyExtractor = (item, index) => item.id

    render() {
        const date = new Date();
        dateNow = moment(date).format('YYYY-MM-DD');
        dateAgo = moment(date).add(this.state.lama, 'day').format('YYYY-MM-DD');
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>Detail transaksi</Text>
                </View>
                <FlatList
                    data={this.state.transaction.product}
                    keyExtractor={this.keyExtractor}
                    renderItem={({ item, total }) => {
                        return (
                            <View style={styles.flatList}>
                                <Image
                                    source={{ uri: item.images_product[0] }}
                                    style={styles.image}
                                />
                                <View style={styles.containerText}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 17, color: '#ffffff', flex: 6}}>{item.name_product}</Text>
                                        <Text style={{ fontSize: 17, color: '#ffffff', flex: 1}}>{item.rent}x</Text>
                                    </View>
                                    <Text style={{ fontSize: 20, color: '#ffff00', }}>{this.priceFormat(item.price * item.rent)}</Text>
                                    <Text style={{ fontSize: 15, color: '#ffffff', }}>Tanggal pinjam {dateNow}</Text>
                                    <Text style={{ fontSize: 15, color: '#ffffff', }}>Tanggal kembali {dateAgo}</Text>
                                </View>
                            </View>
                        )
                    }
                    }
                />
                <View style={styles.total}>
                    <Text style={styles.textTotal}>Total Price</Text>
                    < Text style={styles.numberTotal} >{this.priceFormat(total)}</Text>
                </View>
                <TouchableOpacity style={styles.button}>
                    <Text style={{ fontSize: 25 }}>SEWA</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default Transaction;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        margin: 10,
    },
    title: {
        fontSize: 20,
        marginBottom: 10,
    },
    flatList: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#34c759',
        borderRadius: 10,
    },
    image: {
        flex: 3,
        margin: 10,
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 5,
    },
    containerText: {
        flex: 7,
        margin: 10,
        marginLeft: 5,
        color: '#111',
    },
    total: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 10,
    },
    textTotal: {
        flex: 5,
        alignSelf: 'flex-start',
        fontSize: 15,
    },
    numberTotal: {
        flex: 6,
        alignSelf: 'flex-end',
        fontSize: 22,
    },
    button: {
        backgroundColor: '#34c759',
        alignItems: 'center',
        padding: 5,
        borderRadius: 10,
    }
});