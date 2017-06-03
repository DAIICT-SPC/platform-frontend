import HTTP from '@/packages/http';
import Auth from '@/packages/auth/Auth';


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


  getUserDetails(id) {
    let url = '/users/' + id + '/student/show';
    return HTTP.get(url);
  },

  postUserDetails(id, category_id, temp_address, perm_address, contact_no, dob, gender) {
    // /users/2/student/update
    let url = '/users/' + id + '/student/update'
    return HTTP.post(url , {
      category_id: category_id,
      temp_address: temp_address,
      perm_address: perm_address,
      contact_no: contact_no,
      dob: dob,
      gender: gender
    });
  },

  getUserEducation(id) {
    let url = '/users/' + id + '/student/education';
    return HTTP.get(url);
  },

  getHomeDashboard(id) {
    let url = '/users/' + id + '/student/dashboard';
    return HTTP.get(url);
  },

  getUserJobProfile(id) {
    // /api/users/2/student/jobProfile
    let url = '/users/' + id + '/student/jobProfile'
    return HTTP.get(url);
  },

  //get Student's Job Profile Details based on Placement Id
  getUserPlacementDetails(id, pid){
    // /users/3/company/1/showPlacementDetails/
    let url = '/users/' + id + '/student/' + pid + '/showPlacementDetails';
    return HTTP.get(url);
  }


};
