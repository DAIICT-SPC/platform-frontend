import HTTP from '@/packages/http';

export default {
  all() {
    return HTTP.get('/job_type');
  },

  deleteJobType(job_type_id) {
    // /job_type/2
    let url = '/job_type/' + job_type_id;
    return HTTP.delete(url);
  },

  postJobType(job_type, duration) {
    return HTTP.post('/job_type/create', {
      job_type: job_type,
      duration: duration
    })
  }
}
