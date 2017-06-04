import HTTP from '@/packages/http';

export default {
  all() {
    return HTTP.get('/education');
  },

  postEducation(name) {
    return HTTP.post('/education/', {
      name: name
    })
  }
}
