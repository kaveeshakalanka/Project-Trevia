import axiosClient from './axiosClient';

const productApi = {
    getAll: (params, signal) => axiosClient.get('/products', { params, signal }), // params: { page, size, category, search }
    getById: (id, signal) => axiosClient.get(`/products/${id}`, { signal }),
    getCategories: (signal) => axiosClient.get('/categories', { signal }),

    // Admin
    create: (data) => axiosClient.post('/products', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    update: (id, data) => axiosClient.put(`/products/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    delete: (id) => axiosClient.delete(`/products/${id}`),
};

export default productApi;
