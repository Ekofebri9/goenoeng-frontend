import axios from 'axios'
// import console = require('console');

export const fetchDummy = () =>{
    let link = `https://mermaidid.herokuapp.com/manual/cart/`+id
    // let link = `http://192.168.100.5:3001/manual/cart`
    console.log(link)
    return {
        type: 'DUMMY',
        payload: axios.get(link)
    }
}

export const transaction = () =>{
	let link = `https://my.ipaymu.com/api/getbniva`
	return {
		type: 'TRANSACTION',
		payload: axios.post(link)
	}
}