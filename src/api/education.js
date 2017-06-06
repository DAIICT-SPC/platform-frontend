import HTTP from '@/packages/http';

export default {
  all() {
    return HTTP.get('/education');
  },

  deleteEducation(education_id) {
    // /education/2
    let url = '/education/' + education_id;
    return HTTP.delete(url);
  },

  postEducation(name) {
    return HTTP.post('/education/', {
      name: name
    })
  }
}
