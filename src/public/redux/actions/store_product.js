import axios from 'axios'
// import console = require('console');
const Url = 'https://menung.herokuapp.com'

export const fetchProduct = (email,password,level) => {
    return {
        type: 'FETCH_PRODUCT',
        payload: axios.post(`${Url}/users/auth/${level}`,
        {
            email: email,
            password: password
        },{ headers: { 'x-app-name': 'menung982998372771' }})
    }
}   
export const addProduct = (token, data) => {
    console.log(token)
    console.log(data)
    return {
        type: 'ADD_PRODUCT',
        payload: axios.post(`${Url}/partners/product/add`,
        {
            images_product: data.imageProfile.uri ,
            name_product: data.name,
            price: data.price,
            stok: data.stock,
            description: data.description
        },{ headers: { 'x-app-name': 'menung982998372771', 'x-auth-token': token }})
    }
}  

export const updateProduct = (token, data) => {
    return {
        type: 'UPDATE_PRODUCT',
        payload: axios.post(`${Url}/users/register`,
        {
            name: data.name,
            email: data.email,
            address: data.address,
            phone: data.hp,
            image: data.image
        },{ headers: { 'x-app-name': 'menung982998372771' }})
    }
}  

export const deleteProduct = (token, data) => {
    return {
        type: 'DELETE_PRODUCT',
        payload: axios.post(`${Url}/users/register`,
        {
            name: data.name,
            email: data.email,
            address: data.address,
            phone: data.hp,
            image: data.image
        },{ headers: { 'x-app-name': 'menung982998372771' }})
    }
}  