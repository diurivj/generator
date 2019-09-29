import axios from 'axios';

const baseURL = 'http://localhost:3000';
const service = axios.create({ withCredentials: true, baseURL });

const AUTH_SERVICE = {
  test: async () => {
    return await service.get('/');
  }
};

export default AUTH_SERVICE;
