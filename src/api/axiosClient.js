import axios from 'axios';
import { toast } from 'react-toastify';
import { STATIC_HOST } from '../constants';
// import nProgress from 'nprogress';

const axiosClient = axios.create({
  baseURL: STATIC_HOST,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token') || null;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    const statusCode = error.response.status;
    // if (statusCode === 404) {
    //   window.location.href = '/not-found';
    //   return;
    // }
    if (statusCode === 401) {
      window.location.href = '/login';
      return;
    }
    if (statusCode === 403) {
      window.location.href = '/forbidden';
      return;
    }
    if (statusCode === 500) {
      // show notification
      toast.error('Lỗi hệ thống');
      console.log('error', error);
      return;
    }
    return Promise.reject(error.response.data || error);
  }
);

export default axiosClient;
