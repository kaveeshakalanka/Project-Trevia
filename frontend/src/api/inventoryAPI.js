import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// Notification helper - set flag when inventory is updated
const setWarehouseNotification = () => {
    localStorage.setItem('warehouseUpdated', Date.now().toString());
};

const inventoryAPI = {
    recordTransaction: (data) => {
        setWarehouseNotification();
        return axios.post(`${API_URL}/inventory/transactions`, data, { withCredentials: true });
    },
    getProductTransactions: (productId) => axios.get(`${API_URL}/inventory/transactions/product/${productId}`, { withCredentials: true }),
    getWarehouseTransactions: (warehouseId) => axios.get(`${API_URL}/inventory/transactions/warehouse/${warehouseId}`, { withCredentials: true }),
    getTransactionsByDateRange: (startDate, endDate) => axios.get(`${API_URL}/inventory/transactions/date-range`, {
        params: { startDate, endDate },
        withCredentials: true
    }),
    getCurrentStock: (productId, warehouseId) => axios.get(`${API_URL}/inventory/stock/${productId}/${warehouseId}`, { withCredentials: true }),
    getAllTransactions: () => axios.get(`${API_URL}/inventory/transactions`, { withCredentials: true }),
    getLowStockProducts: () => axios.get(`${API_URL}/inventory/low-stock`, { withCredentials: true })
};

export default inventoryAPI;
