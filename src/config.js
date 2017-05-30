import ENV from './env';

export default {
  apiUrl: ENV.url,
  apiKey: ENV.key,

  get(key) {
    return this[key];
  }
};
