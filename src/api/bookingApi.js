import axiosClient from './axiosClient';

const bookingApi = {
  getById({ id }) {
    const url = `/booking/${id}`;
    return axiosClient.get(url);
  },

  getALl() {
    const url = '/booking';
    return axiosClient.get(url);
  },

  create(data) {
    const url = '/booking';
    return axiosClient.post(url, data);
  },

  getByDoctorId(id) {
    const url = `/booking/doctor/${id}`;
    return axiosClient.get(url);
  },

  getByPatientId(id) {
    const url = `/booking/patient/${id}`;
    return axiosClient.get(url);
  },

  updateStatus(id, status, doctorId) {
    const url = `/booking/update-status/${id}`;
    return axiosClient.put(url, { params: status, doctorId: doctorId });
  },

  verifyBooking(bookingId, status) {
    const url = `/booking/verify-booking`;
    return axiosClient.post(url, { idBooking: bookingId });
  },
};

export default bookingApi;
