import HTTP from '@/packages/http';


export default {

  getUserDetails(id) {
    // /users/2/company/show
    let url = '/users/' + id + '/admin/show'
    return HTTP.get(url);
  },

  postUserDetails(id, name, contact_no, position) {
    let url = '/users/' + id + '/admin/update'
    console.log(url);
    return HTTP.post(url, {
      name: name,
      contact_no: contact_no,
      position: position
    });
  }

}
