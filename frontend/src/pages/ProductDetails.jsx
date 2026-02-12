import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import productApi from '../api/productAPI';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imageError, setImageError] = useState(false);
    const { addToCart } = useCart();

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        setLoading(true);
        setError(null);
        setProduct(null);
        setImageError(false);
        setSelectedSize(null);
        setQuantity(1);

        productApi.getById(id, signal)
            .then(res => {
                setProduct(res.data);
                setLoading(false);
                // Pre-select first size if available (optional, but good UX)
                if (res.data.sizes) {
                    const sizes = res.data.sizes.split(',').map(s => s.trim()).filter(s => s);
                    if (sizes.length > 0) setSelectedSize(sizes[0]);
                }
            })
            .catch(err => {
                if (err.name !== 'CanceledError' && err.code !== 'ERR_CANCELED') {
                    console.error(err);
                    setError("Failed to load product details.");
                    setLoading(false);
                }
            });

        return () => controller.abort();
    }, [id]);

    const handleQuantityChange = (val) => {
        if (!product) return;
        let newQty = parseInt(val);
        if (isNaN(newQty) || newQty < 1) newQty = 1;
        if (newQty > product.stock) newQty = product.stock;
        setQuantity(newQty);
    };

    const handleAddToCart = () => {
        if (!product) return;
        if (product.sizes && !selectedSize) {
            alert("Please select a size."); // Consider a better UI alert if possible, but strict validation is key
            return;
        }
        // Pass selectedSize to addToCart context
        const productToAdd = { ...product, selectedSize };
        addToCart(productToAdd, quantity);
    };

    if (loading) {
        return (
            <div className="container section">
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    Loading product details...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container section">
                <div className="error-message">
                    <h3>Oops!</h3>
                    <p>{error}</p>
                    <Link to="/shop" className="btn btn-sm" style={{ marginTop: '1rem' }}>Back to Shop</Link>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container section" style={{ textAlign: 'center', padding: '4rem 0' }}>
                <h2>Product Not Found</h2>
                <p style={{ color: '#666', margin: '1rem 0 2rem' }}>The product you are looking for does not exist or has been removed.</p>
                <Link to="/shop" className="btn">Back to Shop</Link>
            </div>
        );
    }

    const sizeArray = product.sizes ? product.sizes.split(',').map(s => s.trim()).filter(s => s !== '') : [];

    return (
        <div className="container section">
            <Link to="/shop" style={{ display: 'inline-block', marginBottom: '2rem', color: 'var(--text-light)' }}>
                &larr; Back to Shop
            </Link>

            <div className="grid grid-cols-2" style={{ gap: '4rem' }}>
                <div style={{
                    backgroundColor: '#f9f9f9',
                    height: '500px',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    position: 'relative'
                }}>
                    {product.imageUrl && !imageError ? (
                        <img
                            src={product.imageUrl.startsWith('http') ? product.imageUrl : `http://localhost:8080/uploads/${product.imageUrl}`}
                            alt={product.name}
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div style={{ textAlign: 'center', color: '#999' }}>
                            <span style={{ display: 'block', fontSize: '3rem', marginBottom: '1rem' }}>📷</span>
                            <span>No Image Available</span>
                        </div>
                    )}
                    {product.stock === 0 && (
                        <div style={{
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            background: '#ef4444',
                            color: 'white',
                            padding: '0.5rem 1rem',
                            borderRadius: '8px',
                            fontWeight: 'bold',
                            boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)'
                        }}>
                            Out of Stock
                        </div>
                    )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ marginBottom: '0.5rem', color: 'var(--accent-color)', fontWeight: '600', textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '1px' }}>
                        {product.category?.name || 'Uncategorized'}
                    </div>

                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem', lineHeight: '1.1' }}>{product.name}</h1>

                    <p style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--secondary-color)', marginBottom: '2rem' }}>
                        ${product.price}
                    </p>

                    <p style={{ marginBottom: '2.5rem', color: '#555', fontSize: '1.1rem', lineHeight: '1.8' }}>
                        {product.description}
                    </p>

                    {sizeArray.length > 0 && (
                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ fontWeight: '600', display: 'block', marginBottom: '1rem', color: 'var(--primary-color)' }}>
                                Select Size: <span style={{ fontWeight: '400', color: 'var(--accent-color)' }}>{selectedSize}</span>
                            </label>
                            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                {sizeArray.map(s => (
                                    <button
                                        key={s}
                                        onClick={() => setSelectedSize(s)}
                                        className={`size-btn ${selectedSize === s ? 'active' : ''}`}
                                        disabled={product.stock === 0}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center',
                        marginBottom: '2.5rem',
                        padding: '2rem',
                        background: '#f8fafc',
                        borderRadius: '16px',
                        border: '1px solid #e1e8ed'
                    }}>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>Quantity</label>
                            <input
                                type="number"
                                min="1"
                                max={product.stock}
                                value={quantity}
                                onChange={(e) => handleQuantityChange(e.target.value)}
                                className="form-control"
                                style={{ width: '80px', textAlign: 'center' }}
                                disabled={product.stock === 0}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ opacity: 0, fontSize: '0.9rem', marginBottom: '0.25rem', display: 'block' }}>Action</label>
                            <button
                                className="btn"
                                onClick={handleAddToCart}
                                disabled={product.stock === 0}
                                style={{ width: '100%', background: product.stock === 0 ? '#cbd5e1' : undefined, cursor: product.stock === 0 ? 'not-allowed' : 'pointer', boxShadow: product.stock === 0 ? 'none' : undefined }}
                            >
                                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                            </button>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '2rem', fontSize: '0.95rem', color: '#666', borderTop: '1px solid #eee', paddingTop: '1.5rem' }}>
                        <div>
                            <span style={{ fontWeight: '600', color: 'var(--primary-color)' }}>Stock:</span> {product.stock > 0 ? `${product.stock} units` : 'Unavailable'}
                        </div>
                        <div>
                            <span style={{ fontWeight: '600', color: 'var(--primary-color)' }}>SKU:</span> {product.id ? `TRV-${product.id.toString().padStart(6, '0')}` : 'N/A'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
