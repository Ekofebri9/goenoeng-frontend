import { AsyncStorage } from 'react-native'
// import console = require('console');

const initialState = {
    isLogin: false,
    user: {},
    location: {},
    product: [],
    image: '',
    description: '',
    token: '',
    isLoading: false,
    inserted: false,
}

export default user = (state = initialState, action) => {
    switch (action.type) {
        case 'POST_USER_PENDING':
        case 'POST_REGISTER_PENDING':
        case 'UPDATE_PARTNER_PENDING':
        case 'FECTH_PARTNER_PENDING':
        case 'UPDATE_USER_PENDING':
        case 'FECTH_USER_PENDING':
            return {
                ...state,
                isLoading: true,
            }
        case 'POST_USER_REJECTED':
        case 'POST_REGISTER_REJECTED':
        case 'UPDATE_PARTNER_REJECTED':
        case 'FECTH_PARTNER_REJECTED':
        case 'UPDATE_USER_REJECTED':
        case 'FECTH_USER_REJECTED':
            return {
                ...state,
                isLoading: false,
            }
        case 'POST_USER_FULFILLED':
        case 'POST_REGISTER_FULFILLED':
            // console.log(action.payload.data.data.user.level)
            AsyncStorage.setItem('token', action.payload.data.token)
            AsyncStorage.setItem('level', action.payload.data.data.user.level)
            return {
                ...state,
                isLoading: false,
                isLogin: true,
                user: action.payload.data.data.user,
                location: action.payload.data.data.location,
                image: action.payload.data.data.image,
                description: action.payload.data.data.description,
                gender: action.payload.data.data.gender
                // token: action.payload.data
            }
        case 'UPDATE_PARTNER_FULFILLED':
            // console.log(action.payload)
            return {
                ...state,
                isLoading: false,
                user: action.payload.data.data.partner,
                location: action.payload.data.data.location,
                image: action.payload.data.data.image,
                description: action.payload.data.data.description
            }
        case 'UPDATE_USER_FULFILLED':
            // console.log(action.payload)
            return {
                ...state,
                isLoading: false,
                user: action.payload.data.data.user,
                location: action.payload.data.data.location,
                image: action.payload.data.data.image,
                description: action.payload.data.data.description,
                gender: action.payload.data.data.gender,
            }
        case 'FETCH_PARTNER_FULFILLED':
            return {
                ...state,
                user: action.payload.data.data.partner,
                location: action.payload.data.data.location,
                image: action.payload.data.data.image,
                description: action.payload.data.data.description,
                product: action.payload.data.data.products
            }
        case 'FETCH_USER_FULFILLED':
            return {
                ...state,
                user: action.payload.data.data.user,
                location: action.payload.data.data.location,
                image: action.payload.data.data.image,
                description: action.payload.data.data.description,
                gender: action.payload.data.data.gender
            }
        default:
            return state
    }
}