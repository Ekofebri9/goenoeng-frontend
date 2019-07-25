import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Dimensions, ImageBackground, FlatList, SectionList } from 'react-native'
import { Product } from '../Assets/dummy'
import { connect } from 'react-redux'
import styles from '../Assets/Style'
import { withNavigation } from 'react-navigation';

class ProductList extends Component {
    constructor(props) {
        super(props);
    }

    renderItem = ({ item, index }) => {
        console.log(item)
        return (
            <View style={styles.itemMount}>
                <View style={styles.itemMount}>
                    <View style={styles.listStyle}>
                        <Text style={styles.productTitle}>{item.name_product}</Text>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ flexDirection: "column" }}>
                                <Text style={styles.statusText} />
                                <ImageBackground style={styles.ProductImage} source={{ uri: item.images_product[0] }}></ImageBackground>
                                {item.status}
                            </View>
                            <View style={{ flexDirection: "column", paddingRight: 120 }}>
                                <Text style={[styles.mountDetail, { color: 'white', marginTop: 32 }]}>{"Price : Rp. " + item.price}</Text>
                                <Text style={[styles.mountDetail, { color: 'white' }]}>{"Stock : " + item.stok}</Text>
                                <Text style={[styles.mountDetail, { color: 'white', textAlign:'justify' }]}>{item.description}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    _keyExtractor = (item, index) => item.id
    render() {
        console.log("this.props.user")
        console.log(this.props.user)
        return (
            <View style={styles.flatMountain}>
                {/* <CheckBox></CheckBox> */}
                <FlatList
                    data={this.props.user.product}
                    renderItem={this.renderItem}
                />
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
      user: state.user,
    }
  }
  export default connect(mapStateToProps)(withNavigation(ProductList));