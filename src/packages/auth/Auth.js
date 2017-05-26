export default {
  //setToken
  setToken(token, user) {
    window.localStorage.setItem('token', token);
    window.localStorage.setItem('user', user);
  },

  getToken() {
    var token = window.localStorage.getItem('token');
    var user = window.localStorage.getItem('user');

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
    window.localStorage.removeItem('user');
  },

  isAuthenticated() {
    if (this.getToken()) {
      return true
    } else {
      return false
    }
  }
};
