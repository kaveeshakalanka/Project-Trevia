import { useNavigate } from 'react-router-dom';
import PaymentForm from '../components/PaymentForm';
import OrderSummary from '../components/OrderSummary';
import { useCart } from '../context/CartContext';
import orderApi from '../api/orderApi';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { FaCreditCard, FaTruck, FaCheckCircle } from 'react-icons/fa';

const Payment = () => {
    const { cartItems, clearCart } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' or 'cod'
    const [shippingData, setShippingData] = useState({
        fullName: '',
        email: '',
        phone: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States'
    });

    const handleShippingChange = (e) => {
        setShippingData({ ...shippingData, [e.target.name]: e.target.value });
    };

    const validateShipping = () => {
        if (!shippingData.fullName || !shippingData.email || !shippingData.phone ||
            !shippingData.addressLine1 || !shippingData.city || !shippingData.state ||
            !shippingData.zipCode) {
            toast.error("Please fill in all required shipping fields");
            return false;
        }
        return true;
    };

    const createOrder = async (method) => {
        const orderRequest = {
            items: cartItems.map(item => ({
                productId: item.product.id,
                quantity: item.quantity
            })),
            paymentMethod: method
        };

        await orderApi.create(orderRequest);
        clearCart();
        toast.success(method === 'CARD' ? "Payment Successful!" : "Order Placed Successfully!");
        navigate('/order-confirmation');
    };

    const handleCardPaymentSubmit = async (cardDetails) => {
        if (!validateShipping()) return;

        setLoading(true);
        // Simulate payment processing delay
        setTimeout(async () => {
            try {
                await createOrder('CARD');
            } catch (error) {
                console.error(error);
                toast.error("Payment failed or Order creation failed.");
            } finally {
                setLoading(false);
            }
        }, 1500);
    };

    const handleCODSubmit = async () => {
        if (!validateShipping()) return;

        setLoading(true);
        try {
            await createOrder('CASH_ON_DELIVERY');
        } catch (error) {
            console.error(error);
            toast.error("Order creation failed.");
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="container section">
                <div className="empty-cart">
                    <h2>No items to checkout</h2>
                    <p>Your cart is empty. Add some items to proceed with payment.</p>
                    <button className="btn btn-primary" onClick={() => navigate('/shop')}>
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    // Payment method card styles
    const paymentMethodStyles = {
        container: {
            display: 'flex',
            gap: '1rem',
            marginBottom: '1.5rem'
        },
        card: {
            flex: 1,
            padding: '1.25rem',
            borderRadius: '12px',
            border: '2px solid #e0e0e0',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.75rem',
            background: '#fff'
        },
        cardActive: {
            borderColor: 'var(--primary)',
            background: 'linear-gradient(135deg, rgba(0, 29, 57, 0.03) 0%, rgba(78, 142, 162, 0.08) 100%)',
            boxShadow: '0 4px 12px rgba(0, 29, 57, 0.1)'
        },
        icon: {
            fontSize: '2rem',
            color: 'var(--primary)'
        },
        label: {
            fontWeight: '600',
            color: 'var(--text-dark)',
            fontSize: '1rem'
        },
        description: {
            fontSize: '0.85rem',
            color: '#666',
            textAlign: 'center'
        },
        checkmark: {
            position: 'absolute',
            top: '10px',
            right: '10px',
            color: 'var(--success)',
            fontSize: '1.2rem'
        }
    };

    const codButtonStyles = {
        width: '100%',
        padding: '1rem 2rem',
        fontSize: '1.1rem',
        fontWeight: '600',
        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)'
    };

    return (
        <div className="container section">
            <h2 className="section-title">Checkout</h2>

            <div className="payment-container">
                {/* Left Column - Shipping & Payment Forms */}
                <div className="payment-forms">
                    {/* Shipping Address Section */}
                    <div className="shipping-section">
                        <h3>Shipping Address</h3>

                        <div className="form-group">
                            <label>Full Name *</label>
                            <input
                                type="text"
                                name="fullName"
                                value={shippingData.fullName}
                                onChange={handleShippingChange}
                                required
                                className="form-control"
                                placeholder="your name"
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={shippingData.email}
                                    onChange={handleShippingChange}
                                    required
                                    className="form-control"
                                    placeholder="example@gmail.com"
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone *</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={shippingData.phone}
                                    onChange={handleShippingChange}
                                    required
                                    className="form-control"
                                    placeholder="+94 70 123 4567"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Address Line 1 *</label>
                            <input
                                type="text"
                                name="addressLine1"
                                value={shippingData.addressLine1}
                                onChange={handleShippingChange}
                                required
                                className="form-control"
                                placeholder="123 Main Street"
                            />
                        </div>

                        <div className="form-group">
                            <label>Address Line 2</label>
                            <input
                                type="text"
                                name="addressLine2"
                                value={shippingData.addressLine2}
                                onChange={handleShippingChange}
                                className="form-control"
                                placeholder=" (optional)"
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>City *</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={shippingData.city}
                                    onChange={handleShippingChange}
                                    required
                                    className="form-control"
                                    placeholder="Colombo"
                                />
                            </div>
                            <div className="form-group">
                                <label>State/Province *</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={shippingData.state}
                                    onChange={handleShippingChange}
                                    required
                                    className="form-control"
                                    placeholder="Western"
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>ZIP/Postal Code *</label>
                                <input
                                    type="text"
                                    name="zipCode"
                                    value={shippingData.zipCode}
                                    onChange={handleShippingChange}
                                    required
                                    className="form-control"
                                    placeholder="10001"
                                />
                            </div>
                            <div className="form-group">
                                <label>Country *</label>
                                <select
                                    name="country"
                                    value={shippingData.country}
                                    onChange={handleShippingChange}
                                    required
                                    className="form-control"
                                >
                                    <option value="Sri Lanka">Sri Lanka</option>
                                    <option value="Canada">Canada</option>
                                    <option value="United Kingdom">United Kingdom</option>
                                    <option value="Australia">Australia</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Payment Method Selection */}
                    <div className="payment-section">
                        <h3>Payment Method</h3>
                        <div style={paymentMethodStyles.container}>
                            {/* Card Payment Option */}
                            <div
                                style={{
                                    ...paymentMethodStyles.card,
                                    ...(paymentMethod === 'card' ? paymentMethodStyles.cardActive : {}),
                                    position: 'relative'
                                }}
                                onClick={() => setPaymentMethod('card')}
                            >
                                {paymentMethod === 'card' && (
                                    <FaCheckCircle style={paymentMethodStyles.checkmark} />
                                )}
                                <FaCreditCard style={paymentMethodStyles.icon} />
                                <span style={paymentMethodStyles.label}>Card Payment</span>
                                <span style={paymentMethodStyles.description}>
                                    Pay securely with credit or debit card
                                </span>
                            </div>

                            {/* Cash on Delivery Option */}
                            <div
                                style={{
                                    ...paymentMethodStyles.card,
                                    ...(paymentMethod === 'cod' ? paymentMethodStyles.cardActive : {}),
                                    position: 'relative'
                                }}
                                onClick={() => setPaymentMethod('cod')}
                            >
                                {paymentMethod === 'cod' && (
                                    <FaCheckCircle style={paymentMethodStyles.checkmark} />
                                )}
                                <FaTruck style={paymentMethodStyles.icon} />
                                <span style={paymentMethodStyles.label}>Cash on Delivery</span>
                                <span style={paymentMethodStyles.description}>
                                    Pay when you receive your order
                                </span>
                            </div>
                        </div>

                        {/* Conditional Payment Forms */}
                        {paymentMethod === 'card' ? (
                            <>
                                <PaymentForm onSubmit={handleCardPaymentSubmit} />
                                {loading && <p style={{ textAlign: 'center', marginTop: '1rem' }}>Processing Payment...</p>}
                            </>
                        ) : (
                            <div style={{ marginTop: '1rem' }}>
                                <div style={{
                                    background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                                    border: '1px solid #f59e0b',
                                    borderRadius: '8px',
                                    padding: '1rem',
                                    marginBottom: '1.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem'
                                }}>
                                    <FaTruck style={{ color: '#d97706', fontSize: '1.5rem' }} />
                                    <div>
                                        <strong style={{ color: '#92400e' }}>Cash on Delivery</strong>
                                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#78350f' }}>
                                            You will pay the delivery person when your order arrives.
                                        </p>
                                    </div>
                                </div>
                                <button
                                    style={codButtonStyles}
                                    onClick={handleCODSubmit}
                                    disabled={loading}
                                    onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                                    onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                                >
                                    {loading ? 'Placing Order...' : (
                                        <>
                                            <FaTruck /> Place Order
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column - Order Summary */}
                <div className="payment-summary">
                    <OrderSummary />
                </div>
            </div>
        </div>
    );
};

export default Payment;
