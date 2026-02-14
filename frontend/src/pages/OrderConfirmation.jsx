import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const OrderConfirmation = () => {
    return (
        <div className="container section" style={{ textAlign: 'center', padding: '4rem 0' }}>
            <FaCheckCircle size={80} color="var(--success)" style={{ marginBottom: '1rem' }} />
            <h1>Order Confirmed!</h1>
            <p style={{ fontSize: '1.2rem', margin: '1rem 0 2rem' }}>
                Thank you for your purchase. Your order has been received and is being processed.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <Link to="/orders" className="btn">View Orders</Link>
                <Link to="/shop" className="btn btn-secondary">Continue Shopping</Link>
            </div>
        </div>
    );
};

export default OrderConfirmation;
