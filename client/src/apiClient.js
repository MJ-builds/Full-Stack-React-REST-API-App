import axios from 'axios';

//to flesh out later on - trying to include a global 500 server error handler here but may be the wrong place.

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export default apiClient;
