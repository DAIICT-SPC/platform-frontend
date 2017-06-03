import HTTP from '@/packages/http';

export default {
  all() {
    return HTTP.get('/categories');
  },

  postCategory(name) {
    // /categories/create
    let url = '/categories/create'
    return HTTP.post(url, {
      name: name
    })
  }
}
