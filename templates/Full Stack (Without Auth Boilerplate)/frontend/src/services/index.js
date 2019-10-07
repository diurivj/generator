import axios from 'axios';
let baseURL;

process.env.NODE_ENV === 'production'
  ? (baseURL = 'here should be your production endpoint')
  : (baseURL = 'http://localhost:3000');

const service = axios.create({ withCredentials: true, baseURL });

const MY_SERVICE = {
  test: async () => {
    return await service.get('/');
  }
};

export default MY_SERVICE;
