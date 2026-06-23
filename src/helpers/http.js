import axios from 'axios';

//TODO: remember to uncommenet this withCredentila before shipping to production
const http = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  //withCredentials: true
});


export default http;
