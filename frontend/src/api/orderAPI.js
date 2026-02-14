import axiosClient from './axiosClient';

const orderApi = {
    create: (data) => axiosClient.post('/orders', data), // data: { items: [{productId, quantity}] }
    getMyOrders: () => axiosClient.get('/orders'),

    // Admin
    getAll: () => axiosClient.get('/orders/all'),
    updateStatus: (id, status) => axiosClient.put(`/orders/${id}/status`, null, { params: { status } }),
    delete: (id) => axiosClient.delete(`/orders/${id}`)
};

export default orderApi;
