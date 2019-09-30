import axios from 'axios';

process.env.NODE_ENV === 'production'
  ? (const baseURL = 'here should be your production endpoint')
  : (const baseURL = 'http://localhost:3000');

const service = axios.create({ withCredentials: true, baseURL });

const MY_SERVICE = {
  test: async () => {
    return await service.get('/');
  }
};

export default MY_SERVICE;
