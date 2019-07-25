import axios from 'axios'
const Url = 'https://menung.herokuapp.com'

export const login = (email,password,level) => {
    return {
        type: 'POST_USER',
        payload: axios.post(`${Url}/users/auth/${level}`,
        {
            email: email,
            password: password
        },{ headers: { 'x-app-name': 'menung982998372771' }})
    }
}   
export const register = (email,password,name,address,phone) => {
    return {
        type: 'POST_REGISTER',
        payload: axios.post(`${Url}/users/register`,
        {
            email: email,
            password: password,
            password_confirmation: password,
            name: name,
            address: address,
            phone: phone
        },{ headers: { 'x-app-name': 'menung982998372771' }})
    }
}  

export const fetchPartner = (token) => {
    console.log(token)
    return {
        type: 'FETCH_PARTNER',
        payload: axios.get(`${Url}/partners/details`,
        { headers: { 'x-app-name': 'menung982998372771', 'x-auth-token': token}})
    }
}  

export const fetchUser = (token) => {
    console.log(token)
    return {
        type: 'FETCH_USER',
        payload: axios.get(`${Url}/users/details`,
        { headers: { 'x-app-name': 'menung982998372771', 'x-auth-token': token}})
    }
}  

export const updatePartner = (token, data) => {
    console.log("data")
    console.log(data)
    let body = new FormData();
    body.append('image', {
        uri: data.image.uri,
        name: data.image.filename,
        type: 'image/jpg'
    })
    body.append('name', data.name)
    body.append('description', data.description)
    body.append('address', data.address)
    body.append('phone', data.hp)
    // body.append('phone', data.hp)
    return {
        type: 'UPDATE_PARTNER',
        payload: axios.patch(`${Url}/partners/`, body
        // {
        //     name: data.name,
        //     description: data.description,
        //     address: data.address,
        //     phone: data.hp,
        //     image: data.imageProfile.uri
        // }
        ,{ headers: { 'x-app-name': 'menung982998372771',
         'x-auth-token': token }})
    }
}  

export const updateUser = (token, data) => {
    return {
        type: 'UPDATE_USER',
        payload: axios.patch(`${Url}/users/details`,
        {
            name: data.name,
            // image: data.description,
            address: data.address,
            phone: data.hp,
            gender: data.gender,
            image: data.imageProfile.uri
        },{ headers: { 'x-app-name': 'menung982998372771',
         'x-auth-token': token }})
    }
}  