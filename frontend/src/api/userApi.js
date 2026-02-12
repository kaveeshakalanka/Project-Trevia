 import axiosClient from './axiosClient';

const userAPI = {
    getProfile: () => axiosClient.get('/users/profile'),
    updateProfile: (data) => axiosClient.put('/users/profile', data),

    // Admin
    getAll: () => axiosClient.get('/users'),
    delete: (id) => axiosClient.delete(`/users/${id}`)
};

export default userAPI;
