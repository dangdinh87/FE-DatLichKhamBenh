import axiosClient from './axiosClient';

const patientApi = {
  getById(id) {
    const url = `/patient/${id}`;
    return axiosClient.get(url);
  },

  update(id, data) {
    const url = `/patient/${id}`;
    return axiosClient.put(url, data);
  },
};

export default patientApi;
