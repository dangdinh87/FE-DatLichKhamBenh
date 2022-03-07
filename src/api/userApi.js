import axiosClient from './axiosClient';

const userApi = {
  register(data) {
    const url = 'auth/register';
    return axiosClient.post(url, data);
  },

  login(data) {
    const url = 'auth/login';
    return axiosClient.post(url, data);
  },

  updateUser(data) {
    const id = data.id;
    const url = `profile/${id}/edit`;
    return axiosClient.patch(url, data);
  },

  getUser(id) {
    const url = `profile/${id}`;
    return axiosClient.get(url);
  },

  updateAvatar(data, id) {
    const url = `profile/${id}/avatar`;
    return axiosClient.put(url, data);
  },
};

export default userApi;
