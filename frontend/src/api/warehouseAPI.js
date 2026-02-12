import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// Notification helper functions
const setWarehouseNotification = () => {
    localStorage.setItem('warehouseUpdated', Date.now().toString());
};

export const clearWarehouseNotification = () => {
    localStorage.removeItem('warehouseUpdated');
};

export const hasWarehouseNotification = () => {
    return localStorage.getItem('warehouseUpdated') !== null;
};

const warehouseAPI = {
    getAll: () => axios.get(`${API_URL}/warehouses`, { withCredentials: true }),
    getActive: () => axios.get(`${API_URL}/warehouses/active`, { withCredentials: true }),
    getById: (id) => axios.get(`${API_URL}/warehouses/${id}`, { withCredentials: true }),
    create: (data) => {
        setWarehouseNotification();
        return axios.post(`${API_URL}/warehouses`, data, { withCredentials: true });
    },
    update: (id, data) => {
        setWarehouseNotification();
        return axios.put(`${API_URL}/warehouses/${id}`, data, { withCredentials: true });
    },
    delete: (id) => {
        setWarehouseNotification();
        return axios.delete(`${API_URL}/warehouses/${id}`, { withCredentials: true });
    }
};

export default warehouseAPI;
