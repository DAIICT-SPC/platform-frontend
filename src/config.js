import ENV from './env';

export default {
  apiUrl: ENV.url,   //127.0.0.1:8000/api step 2
  apiKey: ENV.key,   //abcd1234 step 2

  get(key) {
    return this[key];
  }
};
