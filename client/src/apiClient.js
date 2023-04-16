import axios from "axios";

//to flesh out later on - trying to include a global 500 server error handler here but may be the wrong place.

// for now, this component simply provides a base URL for the API

//NB: CHANGE BELOW ADDRESS TO http://localhost:5000/api IF YOU ARE TESTING OUT ON YOUR LOCAL MACHINE
const apiClient = axios.create({
  baseURL: "https://full-stack-react-rest-api-app-production.up.railway.app/api",
});

export default apiClient;
