export default {
  //setToken
  setToken(token) {
    window.localStorage.setItem('token', token);
  },

  getToken() {
    var token = window.localStorage.getItem('token');

    if (window.localStorage.getItem('token') != null) {
      return token
    } else {
      return null
    }
    // if(Date.now() >  parseInt(expiration))  then destroyToken
  },
  //destroyToken
  destroyToken() {
    window.localStorage.removeItem('token');
  },

  isAuthenticated() {
    if (this.getToken()) {
      return true
    } else {
      return false
    }
  }
};
