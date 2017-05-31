export default {
  //setToken
  setToken(token) {
    window.localStorage.setItem('token', token);
  },

  setUserToken(id) {
    window.localStorage.setItem('user_id', id);
  },

  getUserToken() {
    var user_id = window.localStorage.getItem('user_id');

    if (window.localStorage.getItem('user_id') != null) {
      return user_id
    } else {
      return null
    }
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
    window.localStorage.removeItem('user_id');
  },

  isAuthenticated() {
    if (this.getToken()) {
      return true
    } else {
      return false
    }
  }
};
