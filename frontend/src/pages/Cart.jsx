import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="container section" style={{ textAlign: 'center' }}>
                <h2>Your cart is empty</h2>
                <Link to="/shop" className="btn" style={{ marginTop: '1rem' }}>Start Shopping</Link>
            </div>
        );
    }

    return (
        <div className="container section">
            <h2 className="section-title">Your Shopping Cart</h2>

            <div className="grid" style={{ gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                        <button
                            onClick={() => {
                                if (window.confirm('Are you sure you want to clear your cart?')) {
                                    clearCart();
                                }
                            }}
                            style={{
                                background: 'transparent',
                                border: '1px solid var(--error, #ef4444)',
                                color: 'var(--error, #ef4444)',
                                padding: '0.5rem 1rem',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = 'var(--error, #ef4444)';
                                e.target.style.color = 'white';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = 'transparent';
                                e.target.style.color = 'var(--error, #ef4444)';
                            }}
                        >
                            Clear Cart
                        </button>
                    </div>
                    {cartItems.map((item) => (
                        <div key={item.product.id} style={{ display: 'flex', gap: '1rem', padding: '1rem', borderBottom: '1px solid #eee', alignItems: 'center' }}>
                            <div style={{ width: '80px', height: '80px', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                {item.product.imageUrl ? (
                                    <img
                                        src={item.product.imageUrl.startsWith('http') ? item.product.imageUrl : `http://localhost:8080/uploads/${item.product.imageUrl}`}
                                        alt={item.product.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                ) : (
                                    <span style={{ fontSize: '1.5rem' }}>📷</span>
                                )}
                            </div>
                            <div style={{ flex: 1 }}>
                                <h3>{item.product.name}</h3>
                                <p style={{ color: '#666' }}>${item.product.price}</p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value))}
                                    style={{ width: '60px', padding: '0.3rem' }}
                                />
                                <button onClick={() => removeFromCart(item.product.id)} style={{ color: 'var(--error)', background: 'none', border: 'none', cursor: 'pointer' }}>
                                    <FaTrash />
                                </button>
                            </div>
                            <div style={{ width: '80px', textAlign: 'right', fontWeight: 'bold' }}>
                                ${(item.product.price * item.quantity).toFixed(2)}
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ backgroundColor: '#f9f9f9', padding: '2rem', height: 'fit-content' }}>
                    <h3 style={{ marginBottom: '1rem' }}>Order Summary</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <span>Subtotal</span>
                        <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontWeight: 'bold', fontSize: '1.2rem' }}>
                        <span>Total</span>
                        <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <Link to="/checkout" className="btn" style={{ width: '100%', textAlign: 'center' }}>Proceed to Checkout</Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;
