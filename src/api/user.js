import HTTP from '@/packages/http';
import Auth from '@/packages/auth/Auth';

export default {
  login(email, password) {
    return HTTP.post('/authenticate', {
      email: email,
      password: password
    });
  },

  register(code, enroll_no, category_id, temp_address, perm_address, gender, dob) {
    return HTTP.post('/users/registerUser');
  }
};
