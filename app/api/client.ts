import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://192.168.18.116:9000/api',
});
