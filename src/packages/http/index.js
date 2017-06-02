import axios from 'axios';
import Auth from '@/packages/auth/Auth';
import config from '@/config';


let axiosInstance = axios.create({
  baseURL: config.get('apiUrl')
});

// This interceptor, adds the Authorization Token to the
// Request Header, if the User is logged in.
axiosInstance.interceptors.request.use(function(axiosConfig) {
  // The User is logged in,
  // thus, the token is available.
  if (Auth.isAuthenticated()) {
    // Add token to the Authorization Header of the Request
    axiosConfig.headers.common["Authorization"] = "Bearer " + Auth.getToken();
  }

  return axiosConfig;
}, function(error) {
  // Do something with request error
  return Promise.reject(error);
});

export default axiosInstance;
