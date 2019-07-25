import { AsyncStorage } from 'react-native'

const initialState = {
    product: [],
    token: '',
    isLoading: false,
    inserted: false,
}

export default user = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_PRODUCT_PENDING':
        case 'ADD_PRODUCT_PENDING':
        case 'UPDATE_PRODUCT_PENDING':
        case 'DELETE_PRODUCT_PENDING':
            return {
                ...state,
                isLoading: true,
            }
        case 'FETCH_PRODUCT_REJECTED':
        case 'ADD_PRODUCT_REJECTED':
        case 'UPDATE_PRODUCT_REJECTED':
        case 'DELETE_PRODUCT_REJECTED':
            return {
                ...state,
                isLoading: false,
            }
        case 'FETCH_PRODUCT_FULFILLED':
            return {
                ...state,
                isLoading: false,
                product: action.payload.data.data,  
            }
        case 'ADD_PRODUCT_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isLogin: true,
                product: action.payload.data.data,
                token: action.payload.data.token
            }
        default:
            return state
    }
}