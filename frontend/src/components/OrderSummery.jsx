import { useCart } from '../context/CartContext';

const OrderSummary = ({ actionButton }) => {
    const { cartItems } = useCart();

    // Calculate totals
    const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const shipping = 10.00; // Flat rate shipping
    const tax = subtotal * 0.10; // 10% tax
    const total = subtotal + shipping + tax;

    return (
        <div className="order-summary-card">
            <h3>Order Summary</h3>

            {/* Cart Items */}
            <div className="order-items">
                {cartItems.map((item) => (
                    <div key={item.product.id} className="order-item">
                        <img
                            src={item.product.imageUrl || '/placeholder.png'}
                            alt={item.product.name}
                            className="order-item-image"
                        />
                        <div className="order-item-details">
                            <h4>{item.product.name}</h4>
                            <p className="order-item-quantity">Qty: {item.quantity}</p>
                        </div>
                        <div className="order-item-price">
                            ${(item.product.price * item.quantity).toFixed(2)}
                        </div>
                    </div>
                ))}
            </div>

            {/* Price Breakdown */}
            <div className="order-totals">
                <div className="order-total-row">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="order-total-row">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="order-total-row">
                    <span>Tax (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                </div>
                <div className="order-total-row order-total-final">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>
            </div>

            {/* Security Badge */}
            <div className="security-badge">
                🔒 Secure Checkout
            </div>

            {actionButton && <div className="summary-action">{actionButton}</div>}
        </div>
    );
};

export default OrderSummary;
