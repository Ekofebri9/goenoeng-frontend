import axios from 'axios';

export const postTransaction = (data) =>{
	let link = `https://my.ipaymu.com/api/getbniva`
	return {
		type: 'TRANSACTION',
		payload: axios.post(link, data)
	}
}