import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { cartItems, cartTotal } = useCart();
    const navigate = useNavigate();

    const handleProceedToPayment = () => {
        navigate('/payment');
    };

    if (cartItems.length === 0) return <div className="container section">Cart is empty</div>;

    return (
        <div className="container section" style={{ maxWidth: '600px' }}>
            <h2 className="section-title">Checkout</h2>
            <div style={{ marginBottom: '2rem' }}>
                <h3>Order Review</h3>
                {cartItems.map(item => (
                    <div key={item.product.id} style={{ display: 'flex', justifyContent: 'space-between', margin: '0.5rem 0' }}>
                        <span>{item.product.name} x {item.quantity}</span>
                        <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                ))}
                <div style={{ borderTop: '1px solid #ddd', marginTop: '1rem', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                </div>
            </div>

            <button className="btn" style={{ width: '100%' }} onClick={handleProceedToPayment}>
                Proceed to Payment
            </button>
        </div>
    );
};

export default Checkout;
