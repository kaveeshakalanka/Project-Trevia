import axiosClient from './axiosClient';

const authApi = {
    login: (credentials) => axiosClient.post('/auth/signin', credentials),
    register: (data) => axiosClient.post('/auth/signup', data),
    logout: () => axiosClient.post('/auth/logout'),
    getProfile: () => axiosClient.get('/users/profile'),
    updateProfile: (data) => axiosClient.put('/users/profile', data),
};

export default authApi;
