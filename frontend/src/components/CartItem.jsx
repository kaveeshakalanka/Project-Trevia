import { FaTrash } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const CartItem = ({ item, readOnly = false }) => {
    const { updateQuantity, removeFromCart } = useCart();
    const { product, quantity } = item;

    return (
        <div className="cart-item">
            <div className="cart-thumb">
                {product.imageUrl ? (
                    <img
                        src={product.imageUrl.startsWith('http') ? product.imageUrl : `http://localhost:8080/uploads/${product.imageUrl}`}
                        alt={product.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                ) : (
                    <span>📷</span>
                )}
            </div>
            <div className="cart-details">
                <h4>{product.name}</h4>
                <p>${product.price}</p>
            </div>

            {!readOnly && (
                <div className="cart-actions">
                    <input
                        type="number"
                        min="1"
                        max={product.stock}
                        value={quantity}
                        onChange={(e) => updateQuantity(product.id, parseInt(e.target.value))}
                        className="qty-input"
                    />
                    <button onClick={() => removeFromCart(product.id)} className="remove-btn">
                        <FaTrash />
                    </button>
                </div>
            )}

            {readOnly && <div className="cart-qty">x {quantity}</div>}

            <div className="cart-total">
                ${(product.price * quantity).toFixed(2)}
            </div>
        </div>
    );
};

export default CartItem;
