import { useEffect, useState } from 'react';
import orderApi from '../../api/orderApi';
import { toast } from 'react-toastify';

const AdminOrderList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = () => {
        setLoading(true);
        orderApi.getAll()
            .then(res => {
                setOrders(res.data);
            })
            .catch(err => toast.error("Failed to load orders"))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusUpdate = (id, status) => {
        orderApi.updateStatus(id, status)
            .then(() => {
                toast.success("Order status updated");
                fetchOrders();
            })
            .catch(err => toast.error("Failed to update status"));
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this order? This action cannot be undone.")) {
            orderApi.delete(id)
                .then(() => {
                    toast.success("Order deleted successfully");
                    fetchOrders();
                })
                .catch(err => toast.error("Failed to delete order"));
        }
    };

    if (loading) return <div>Loading...</div>;

    const statusOptions = ['PENDING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

    return (
        <div>
            <h2>Orders</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                <thead>
                    <tr style={{ background: '#f5f5f5', textAlign: 'left' }}>
                        <th style={{ padding: '0.5rem' }}>ID</th>
                        <th style={{ padding: '0.5rem' }}>User</th>
                        <th style={{ padding: '0.5rem' }}>Date</th>
                        <th style={{ padding: '0.5rem' }}>Total</th>
                        <th style={{ padding: '0.5rem' }}>Payment</th>
                        <th style={{ padding: '0.5rem' }}>Status</th>
                        <th style={{ padding: '0.5rem' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(o => (
                        <tr key={o.id} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '0.5rem' }}>{o.id}</td>
                            <td style={{ padding: '0.5rem' }}>{o.user?.username}</td>
                            <td style={{ padding: '0.5rem' }}>{new Date(o.createdAt).toLocaleDateString()}</td>
                            <td style={{ padding: '0.5rem' }}>${o.totalAmount}</td>
                            <td style={{ padding: '0.5rem' }}>
                                <span style={{
                                    padding: '0.2rem 0.5rem',
                                    borderRadius: '4px',
                                    background: o.paymentMethod === 'CASH_ON_DELIVERY' ? '#fef3c7' : '#dbeafe',
                                    color: o.paymentMethod === 'CASH_ON_DELIVERY' ? '#92400e' : '#1e40af',
                                    fontSize: '0.85rem',
                                    fontWeight: '500'
                                }}>
                                    {o.paymentMethod === 'CASH_ON_DELIVERY' ? 'COD' : (o.paymentMethod ? 'Card' : 'N/A')}
                                </span>
                            </td>
                            <td style={{ padding: '0.5rem' }}>
                                <span style={{
                                    padding: '0.2rem 0.5rem',
                                    borderRadius: '4px',
                                    background: o.status === 'PENDING' ? '#fff3cd' : o.status === 'DELIVERED' ? '#d4edda' : '#f8d7da',
                                    color: o.status === 'PENDING' ? '#856404' : o.status === 'DELIVERED' ? '#155724' : '#721c24'
                                }}>
                                    {o.status}
                                </span>
                            </td>
                            <td style={{ padding: '0.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                <select
                                    value={o.status}
                                    onChange={(e) => handleStatusUpdate(o.id, e.target.value)}
                                    style={{ padding: '0.2rem' }}
                                >
                                    {statusOptions.map(s => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                                <button
                                    onClick={() => handleDelete(o.id)}
                                    style={{
                                        padding: '0.25rem 0.5rem',
                                        background: '#ef4444',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontSize: '0.8rem'
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminOrderList;
