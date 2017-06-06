import HTTP from '@/packages/http';

export default {
  all() {
    return HTTP.get('/categories');
  },

  deleteCategory(category_id) {
    // /categories/4
    let url = '/categories/' + category_id;
    return HTTP.delete(url);
  },

  postCategory(name) {
    // /categories/create
    let url = '/categories/create'
    return HTTP.post(url, {
      name: name
    })
  }
}
