import axiosClient from './axiosClient';

const positionApi = {
  getALl() {
    const url = '/position';
    return axiosClient.get(url);
  },
};
export default positionApi;
