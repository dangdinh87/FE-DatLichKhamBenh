import axiosClient from './axiosClient';

const specialistApi = {
  getALl() {
    const url = '/specialist';
    return axiosClient.get(url);
  },
};
export default specialistApi;
