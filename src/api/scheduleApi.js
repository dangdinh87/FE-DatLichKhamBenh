import axiosClient from './axiosClient';

const scheduleApi = {
  create(data) {
    const url = '/schedule';
    return axiosClient.post(url, data);
  },

  getByDate(data) {
    const url = '/schedule/get-schedule-by-date';
    return axiosClient.get(url, { params: data });
  },
};

export default scheduleApi;
