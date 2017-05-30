import axios from 'axios';
import Auth from '@/packages/auth/Auth';
import config from '@/config';

export default axios.create({
  baseURL: config.get('apiUrl'),
  headers: {
    Authorization: 'Bearer ' + Auth.getToken()
  }
});
