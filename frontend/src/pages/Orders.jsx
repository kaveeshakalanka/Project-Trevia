import { useEffect, useState } from 'react';
import orderApi from '../api/orderApi';
import { FaBox, FaCreditCard, FaTruck, FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await orderApi.getMyOrders();
                // Sort orders by newest first
                const sortedOrders = res.data.sort((a, b) =>
                    new Date(b.createdAt) - new Date(a.createdAt)
                );
                setOrders(sortedOrders);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const getStatusConfig = (status) => {
        switch (status) {
            case 'PENDING':
                return { color: '#f59e0b', bg: '#fef3c7', icon: <FaSpinner />, label: 'Pending' };
            case 'SHIPPED':
                return { color: '#3b82f6', bg: '#dbeafe', icon: <FaTruck />, label: 'Shipped' };
            case 'DELIVERED':
                return { color: '#22c55e', bg: '#dcfce7', icon: <FaCheckCircle />, label: 'Delivered' };
            case 'CANCELLED':
                return { color: '#ef4444', bg: '#fee2e2', icon: <FaTimesCircle />, label: 'Cancelled' };
            default:
                return { color: '#6b7280', bg: '#f3f4f6', icon: <FaBox />, label: status };
        }
    };

    const styles = {
        orderCard: {
            background: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '1.5rem',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
            transition: 'box-shadow 0.2s ease'
        },
        orderHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid #f3f4f6'
        },
        orderId: {
            fontWeight: '700',
            fontSize: '1.1rem',
            color: 'var(--primary)'
        },
        orderDate: {
            fontSize: '0.9rem',
            color: '#6b7280'
        },
        statusBadge: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.4rem 0.8rem',
            borderRadius: '20px',
            fontSize: '0.85rem',
            fontWeight: '600'
        },
        paymentBadge: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.3rem 0.6rem',
            borderRadius: '6px',
            fontSize: '0.8rem',
            fontWeight: '500'
        },
        itemRow: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.75rem 0',
            borderBottom: '1px solid #f9fafb'
        },
        itemName: {
            fontWeight: '500',
            color: '#374151'
        },
        itemQty: {
            fontSize: '0.9rem',
            color: '#6b7280',
            marginLeft: '0.5rem'
        },
        itemPrice: {
            fontWeight: '600',
            color: '#111827'
        },
        totalRow: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '1rem',
            paddingTop: '1rem',
            borderTop: '2px solid #e5e7eb'
        },
        totalLabel: {
            fontWeight: '600',
            fontSize: '1rem',
            color: '#374151'
        },
        totalAmount: {
            fontWeight: '700',
            fontSize: '1.25rem',
            color: 'var(--primary)'
        },
        emptyState: {
            textAlign: 'center',
            padding: '4rem 2rem',
            color: '#6b7280'
        }
    };

    if (loading) {
        return (
            <div className="container section" style={{ textAlign: 'center', padding: '4rem' }}>
                <FaSpinner size={40} style={{ animation: 'spin 1s linear infinite' }} />
                <p style={{ marginTop: '1rem', color: '#6b7280' }}>Loading your orders...</p>
            </div>
        );
    }

    return (
        <div className="container section">
            <h2 className="section-title">My Orders</h2>

            {orders.length === 0 ? (
                <div style={styles.emptyState}>
                    <FaBox size={60} style={{ color: '#d1d5db', marginBottom: '1rem' }} />
                    <h3 style={{ marginBottom: '0.5rem', color: '#374151' }}>No orders yet</h3>
                    <p>When you place an order, it will appear here.</p>
                </div>
            ) : (
                <div>
                    {orders.map(order => {
                        const statusConfig = getStatusConfig(order.status);
                        return (
                            <div key={order.id} style={styles.orderCard}>
                                {/* Order Header */}
                                <div style={styles.orderHeader}>
                                    <div>
                                        <span style={styles.orderId}>Order #{order.id}</span>
                                        <div style={styles.orderDate}>
                                            {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                        {/* Payment Method Badge */}
                                        <span style={{
                                            ...styles.paymentBadge,
                                            background: order.paymentMethod === 'CASH_ON_DELIVERY' ? '#fef3c7' : '#dbeafe',
                                            color: order.paymentMethod === 'CASH_ON_DELIVERY' ? '#92400e' : '#1e40af'
                                        }}>
                                            {order.paymentMethod === 'CASH_ON_DELIVERY' ? (
                                                <><FaTruck size={12} /> COD</>
                                            ) : (
                                                <><FaCreditCard size={12} /> Card</>
                                            )}
                                        </span>
                                        {/* Status Badge */}
                                        <span style={{
                                            ...styles.statusBadge,
                                            background: statusConfig.bg,
                                            color: statusConfig.color
                                        }}>
                                            {statusConfig.icon} {statusConfig.label}
                                        </span>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div>
                                    {order.items?.map(item => (
                                        <div key={item.id} style={styles.itemRow}>
                                            <div>
                                                <span style={styles.itemName}>{item.product?.name || 'Product'}</span>
                                                <span style={styles.itemQty}>× {item.quantity}</span>
                                            </div>
                                            <span style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Order Total */}
                                <div style={styles.totalRow}>
                                    <span style={styles.totalLabel}>Total</span>
                                    <span style={styles.totalAmount}>${order.totalAmount?.toFixed(2)}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Orders;
