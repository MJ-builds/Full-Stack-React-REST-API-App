import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// base url for all API requests
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// intercept all responses and check for 500 status code (as part of Exceeds Expectations for this project)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const navigate = useNavigate();

    if (error.response && error.response.status === 500) {
      navigate('/error');
    }

    return Promise.reject(error);
  }
);

export default apiClient;
