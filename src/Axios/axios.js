import axios from "axios";
// import * as dotenv from "dotenv";

const backendinstance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL,
  timeout: 5000,
});

// dotenv.config();

backendinstance.interceptors.request.use(
  function (req) {
    const user = JSON.parse(localStorage.getItem("user")) || {};

    const newobj = {
      ...req,
      headers: {
        ...req.headers,
        accesstoken: user.accesstoken,
      },
    };
    return newobj;
  },
  function (error) {
    return Promise.reject(error);
  }
);

backendinstance.interceptors.response.use((response, error) => {
  if (error) {
    return Promise.reject.error;
  } else {
    return response;
  }
});

export default backendinstance;
