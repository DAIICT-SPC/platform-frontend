import HTTP from '@/packages/http';
import Auth from '@/packages/auth/Auth';

let id = Auth.getUserToken();
export default {

  login(email, password) {
    return HTTP.post('/login', {
      email: email,
      password: password
    });
  },

  registerStudent(name, password, code, enroll_no, category_id, temp_address, perm_address, gender, dob) {
    return HTTP.post('/users/registerUser', {
      name: name,
      password: password,
      code: code,
      enroll_no: enroll_no,
      category_id: category_id,
      temp_address: temp_address,
      perm_address: perm_address,
      gender: gender,
      dob: dob
    });
  },

  registerCompany(user_name, user_email, user_password, company_name, address, contact_no, company_expertise, company_url, code){
    return HTTP.post('/users/registerUser', {
      name: user_name,
      email: user_email,
      password: user_password,
      company_name: company_name,
      address: address,
      contact_no: contact_no,
      company_expertise: company_expertise,
      company_url: company_url,
      code: code
    });
  },

  getHomeDashboard() {
    // users/2/student/dashboard
    let url = '/users/' + id + '/student/dashboard'
    return HTTP.get(url);
  },

  getUserDetails() {

  },

  getUserEducation() {
    let url = '/users/' + id + '/student/education'
    return HTTP.get(url);
  }
};
