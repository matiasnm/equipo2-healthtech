import axios from 'axios';

const publicAPI = axios.create({
  baseURL: 'https://api.mbst.online',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default publicAPI;
