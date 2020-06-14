import axios from 'axios'


const instance = axios.create({
    baseURL: 'https://finance-manager-9d43a.firebaseio.com/'
});

export default instance;