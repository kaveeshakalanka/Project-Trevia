import axiosClient from './axiosClient';

const adminUserApi = {
    createSupplier: (data) => axiosClient.post('/admin/users/supplier', data),
};

export default adminUserApi;