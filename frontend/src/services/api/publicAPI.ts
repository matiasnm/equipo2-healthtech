import axios from 'axios';

const publicAPI = axios.create({
  baseURL: 'http://api.mbst.online:8010',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default publicAPI;
