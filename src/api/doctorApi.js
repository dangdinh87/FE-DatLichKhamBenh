import axiosClient from './axiosClient';

const doctorApi = {
  getALl(filter) {
    const url = '/doctor';
    return axiosClient.get(url, { params: filter });
  },

  getById({ id }) {
    const url = `/doctor/${id}`;
    return axiosClient.get(url);
  },

  getALlFromAdmin() {
    const url = '/doctor/doctor-admin';
    return axiosClient.get(url);
  },

  getTopDoctor() {
    const url = '/doctor/top-doctor';
    return axiosClient.get(url);
  },
  getNewClinic() {
    const url = '/doctor/new-clinic';
    return axiosClient.get(url);
  },

  update(id, data) {
    const url = `/doctor/${id}`;
    return axiosClient.put(url, data);
  },
};

export default doctorApi;
