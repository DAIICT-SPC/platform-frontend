import HTTP from '@/packages/http';
import Auth from '@/packages/auth/Auth';


export default {

  login(email, password) {
    return HTTP.post('/login', {
      email: email,
      password: password
    });
  },

  registerStudent(name, password, code, enroll_no, contact_no, category_id, temp_address, perm_address, gender, dob, alternate_email) {
    return HTTP.post('/users/registerUser', {
      name: name,
      password: password,
      code: code,
      enroll_no: enroll_no,
      contact_no: contact_no,
      category_id: category_id,
      temp_address: temp_address,
      perm_address: perm_address,
      gender: gender,
      dob: dob,
      alternate_email: alternate_email
    });
  },

  registerCompany(user_name, user_email, user_password, company_name, address, contact_no, company_expertise,
    company_url, alternate_email, code){
    return HTTP.post('/users/registerUser', {
      name: user_name,
      email: user_email,
      password: user_password,
      company_name: company_name,
      address: address,
      contact_no: contact_no,
      company_expertise: company_expertise,
      company_url: company_url,
      alternate_email: alternate_email,
      code: code
    });
  },


  getUserDetails(id) {
    let url = '/users/' + id + '/student/show';
    return HTTP.get(url);
  },

  postUserDetails(id, enroll_no, category_id, temp_address, perm_address, contact_no, dob, gender) {
    // /users/2/student/update
    let url = '/users/' + id + '/student/update'
    return HTTP.patch(url , {
      enroll_no, enroll_no,
      category_id: category_id,
      temp_address: temp_address,
      perm_address: perm_address,
      contact_no: contact_no,
      dob: dob,
      gender: gender
    });
  },

  postUserPersonalName(id, name) {
    // /users/2/student/updatePersonal
    let url = '/users/' + id + '/student/updatePersonal'
    return HTTP.patch(url, {
      name: name
    });
  },

  postUserPersonalPassword(id, password) {
    // /users/2/student/updatePersonal
    let url = '/users/' + id + '/student/updatePersonal'
    return HTTP.patch(url, {
      password: password
    });
  },

  getUserEducation(id) {
    let url = '/users/' + id + '/student/education';
    return HTTP.get(url);
  },

  postNewUserEducation(id, education_id, clg_school, cpi, start_year, end_year, drive_link) {
    // /users/1/student/education
    let url = '/users/' + id + '/student/education';
    return HTTP.post(url, {
      education_id: education_id,
      clg_school: clg_school,
      cpi: cpi,
      start_year: start_year,
      end_year: end_year,
      drive_link: drive_link
    });
  },

  updateUserEducation(id, education_id, clg_school, start_year, end_year, drive_link, cpi) {
    // /users/1/student/education/1 <-{education_id}
    let url = '/users/' + id + '/student/education/' + education_id
    console.log(url);
    return HTTP.patch(url, {
      clg_school: clg_school,
      start_year: start_year,
      end_year: end_year,
      drive_link: drive_link,
      cpi: cpi
    })
  },

  getUserEducationForCategory(id) {
    // /users/13/student/fetchEducationAccordingToCategoryForStudent
    let url = '/users/' + id + '/student/fetchEducationAccordingToCategoryForStudent'
    return HTTP.get(url);
  },

  //dashboard page
  getHomeDashboard(id) {
    let url = '/users/' + id + '/student/dashboard';
    return HTTP.get(url);
  },

  //job profile page
  getUserJobProfile(id) {
    // /api/users/2/student/jobProfile
    let url = '/users/' + id + '/student/jobProfile'
    return HTTP.get(url);
  },

  //get Student's Job Profile Details based on Placement Id
  getUserPlacementDetails(id, pid){
    // /users/2/student/1/showPlacementDetails/
    let url = '/users/' + id + '/student/' + pid + '/showPlacementDetails';
    return HTTP.get(url);
  },

  // apply for placement_id's placement
  applyForPlacement(id, placement_id) {
    // /users/2/student/placementRegistration
    let url = '/users/' + id + '/student/placementRegistration'
    return HTTP.post(url, {
      placement_id: placement_id
    })
  },

  // users/id/student/applyToAppliedButton/{placement_id}
  getUserAppliedForPlacement(id, placement_id) {
    let url = '/users/' + id + '/student/applyToAppliedButton/' + placement_id;
    return HTTP.get(url);
  },

  cancelPlacement(id, placement_id) {
    // /users/2/student/cancelRegistration
    let url = '/users/' + id + '/student/cancelRegistration'
    return HTTP.post(url, {
      placement_id: placement_id
    })
  },

  getRole(id) {
    let url = '/users/show/' + id;
    return HTTP.get(url);
  }

};
