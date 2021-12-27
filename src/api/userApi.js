import axiosClient from './axiosClient';

const userApi = {
  register(data) {
    const url = 'api/auth/register';
    return axiosClient.post(url, data);
  },

  login(data) {
    const url = 'api/auth/login';
    return axiosClient.post(url, data);
  },

  updateUser(data) {
    const id = data.id;
    const url = `api/profile/${id}/edit`;
    return axiosClient.patch(url, data);
  },

  getUser(id) {
    const url = `api/profile/${id}`;
    return axiosClient.get(url);
  },

  updateAvatar(data, id) {
    const url = `api/profile/${id}/avatar`;
    return axiosClient.put(url, data);
  },
};

export default userApi;
