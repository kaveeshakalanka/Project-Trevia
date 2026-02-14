import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import productApi from '../api/productAPI';
import { useCart } from '../context/CartContext';
import ShopSidebar from '../components/ShopSidebar';
import Pagination from '../components/Pagination';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();

    // URL Params
    const category = searchParams.get('category');
    const categoryId = searchParams.get('categoryId');
    const searchParam = searchParams.get('search') || '';
    const sizeParam = searchParams.get('size');
    const pageParam = parseInt(searchParams.get('page')) || 0;

    // Local state for search input
    const [searchTerm, setSearchTerm] = useState(searchParam);

    const { addToCart } = useCart();

    // Sync state with URL params
    useEffect(() => {
        setCurrentPage(pageParam);
        setSearchTerm(searchParam);
    }, [pageParam, searchParam]);

    // Scroll to top when filters change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [category, categoryId, searchParam, sizeParam]);

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const params = {
                    category: category,
                    categoryId: categoryId,
                    search: searchParam,
                    page: currentPage,
                    size: 9 // items per page
                };

                const res = await productApi.getAll(params, signal);

                // Handle different response structures
                let fetched = [];
                if (res.data.content) {
                    fetched = res.data.content;
                    setTotalPages(res.data.totalPages);
                } else if (Array.isArray(res.data)) {
                    fetched = res.data;
                    setTotalPages(1);
                } else {
                    fetched = [];
                }

                // Client-side filtering for size (if backend doesn't support it yet)
                if (sizeParam) {
                    fetched = fetched.filter(p => {
                        if (!p.sizes) return false;
                        const productSizes = p.sizes.split(',').map(s => s.trim()).filter(s => s !== '');
                        return productSizes.includes(sizeParam);
                    });
                }

                setProducts(fetched);
            } catch (err) {
                if (err.name !== 'CanceledError' && err.code !== 'ERR_CANCELED') {
                    console.error("Failed to fetch products", err);
                    setError("Failed to load products. Please try again later.");
                }
            } finally {
                if (!signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchProducts();

        return () => {
            controller.abort();
        };
    }, [category, categoryId, searchParam, sizeParam, currentPage]);

    const handlePageChange = (newPage) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', newPage);
        setSearchParams(newParams);
        window.scrollTo(0, 0);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const newParams = new URLSearchParams(searchParams);
        if (searchTerm.trim()) {
            newParams.set('search', searchTerm.trim());
        } else {
            newParams.delete('search');
        }
        newParams.set('page', 0); // Reset to first page
        setSearchParams(newParams);
    };

    return (
        <div className="container section" style={{ display: 'flex', gap: '2rem' }}>
            <aside>
                <ShopSidebar />
            </aside>

            <div className="product-grid">
                <h2 className="section-title product-header-title">
                    {category ? `${category}` : 'All Products'} {sizeParam && `(${sizeParam})`}
                </h2>

                {/* Search Form */}
                <form onSubmit={handleSearchSubmit} className="product-search-form">
                    <input
                        type="text"
                        placeholder="🔍 Search products..."
                        className="product-search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit" className="btn-search">
                        <span>Search</span>
                    </button>
                    {searchParam && (
                        <button
                            type="button"
                            className="btn-clear"
                            onClick={() => {
                                setSearchTerm('');
                                const newParams = new URLSearchParams(searchParams);
                                newParams.delete('search');
                                setSearchParams(newParams);
                            }}
                        >
                            <span>✕ Clear</span>
                        </button>
                    )}
                </form>

                {error && <div className="error-message">{error}</div>}

                {loading ? (
                    <div className="loading-spinner">
                        <div className="spinner"></div> {/* You might want to add a spinner css animation later or use a library */}
                        Loading products...
                    </div>
                ) : (
                    <>
                        {products.length === 0 ? (
                            <p style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
                                No products found matching your criteria.
                            </p>
                        ) : (
                            <>
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                />
                                <div className="grid grid-cols-3">
                                    {products.map(product => (
                                        <div key={product.id} className="card product-card-container">
                                            <Link to={`/shop/${product.id}`}>
                                                <div
                                                    className="product-image-container"
                                                    style={{
                                                        backgroundImage: product.imageUrl
                                                            ? `url(${product.imageUrl.startsWith('http') ? product.imageUrl : `http://localhost:8080/uploads/${product.imageUrl}`})`
                                                            : 'none'
                                                    }}
                                                >
                                                    {!product.imageUrl && <span className="product-no-image">No Image</span>}
                                                    {product.sizes && <span className="product-size-tag">{product.sizes}</span>}
                                                </div>
                                            </Link>
                                            <div className="product-card-info">
                                                <Link to={`/shop/${product.id}`}>
                                                    <h3 className="product-card-title">{product.name}</h3>
                                                </Link>
                                                <div className="product-card-meta">
                                                    <span className="product-card-price">${product.price}</span>
                                                    <button
                                                        className="btn btn-sm"
                                                        onClick={() => addToCart(product)}
                                                        disabled={product.stock <= 0}
                                                        style={{ minWidth: '110px' }}
                                                    >
                                                        Add to Cart
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default Product;
