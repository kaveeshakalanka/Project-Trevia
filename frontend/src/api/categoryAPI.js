import axiosClient from './axiosClient';

const categoryAPI = {
    getAll: () => axiosClient.get('/categories'),
    create: (data) => axiosClient.post('/categories', data),
    // Add update/delete if endpoints exist in future
};

export default categoryAPI;
