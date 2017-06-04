import HTTP from '@/packages/http';

export default {
  all() {
    return HTTP.get('/job_type');
  },

  postJobType(job_type, duration) {
    return HTTP.post('/job_type/create', {
      job_type: job_type,
      duration: duration
    })
  }
}
