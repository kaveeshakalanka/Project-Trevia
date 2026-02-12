import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <div className="product-card">
            <Link to={`/shop/${product.id}`}>
                <div className="product-image" style={{
                    backgroundImage: product.imageUrl
                        ? `url(${product.imageUrl.startsWith('http') ? product.imageUrl : `http://localhost:8080/uploads/${product.imageUrl}`})`
                        : 'none',
                }}>
                    {!product.imageUrl && <span>No Image</span>}
                </div>
            </Link>
            <div className="product-info">
                <Link to={`/shop/${product.id}`}>
                    <h3 className="product-name">{product.name}</h3>
                </Link>
                <div className="product-actions">
                    <span className="product-price">${product.price}</span>
                    <button
                        className="btn-secondary btn-sm"
                        onClick={() => addToCart(product)}
                        disabled={product.stock <= 0}
                    >
                        {product.stock > 0 ? 'Add' : 'Out'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;

// Add some styles to index.css or equivalent later, assuming generic styles for now based on classes.
