import HTTP from '@/packages/http';
import Auth from '@/packages/auth/Auth';

export default {
  login(email, password) {
    return HTTP.post('/authenticate', {
      email: email,
      password: password
    });
  }
};
