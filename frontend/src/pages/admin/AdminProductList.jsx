import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import productApi from '../../api/productApi';
import categoryAPI from '../../api/categoryAPI';
import { toast } from 'react-toastify';

const AdminProductList = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const fetchProducts = () => {
        setLoading(true);
        Promise.all([
            productApi.getAll({ size: 1000 }),
            categoryAPI.getAll()
        ])
            .then(([productsRes, categoriesRes]) => {
                const productData = productsRes.data.content || productsRes.data || [];
                setProducts(productData);
                setFilteredProducts(productData);
                setCategories(categoriesRes.data || []);
            })
            .catch(err => toast.error("Failed to load products"))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Filter products when search term or category changes
    useEffect(() => {
        let filtered = products;

        // Filter by search term
        if (searchTerm.trim()) {
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by category
        if (selectedCategory) {
            filtered = filtered.filter(p =>
                p.category?.id === parseInt(selectedCategory) ||
                p.category?.name === selectedCategory
            );
        }

        setFilteredProducts(filtered);
    }, [searchTerm, selectedCategory, products]);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            productApi.delete(id)
                .then(() => {
                    toast.success("Product deleted");
                    fetchProducts();
                })
                .catch(err => toast.error("Failed to delete product"));
        }
    };

    const styles = {
        container: {
            padding: '1rem'
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
            gap: '1rem'
        },
        title: {
            fontSize: '1.75rem',
            fontWeight: '700',
            color: '#001D39',
            margin: 0
        },
        searchContainer: {
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            flexWrap: 'wrap'
        },
        searchInput: {
            padding: '0.75rem 1rem',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '0.9rem',
            minWidth: '250px',
            outline: 'none',
            transition: 'border-color 0.2s, box-shadow 0.2s'
        },
        categorySelect: {
            padding: '0.75rem 1rem',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '0.9rem',
            minWidth: '180px',
            outline: 'none',
            background: '#fff',
            cursor: 'pointer'
        },
        addButton: {
            padding: '0.75rem 1.5rem',
            background: 'linear-gradient(135deg, #0A4174, #001D39)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '0.9rem',
            fontWeight: '600',
            cursor: 'pointer',
            textDecoration: 'none',
            display: 'inline-block'
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            background: '#fff',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        },
        tableHeader: {
            padding: '1rem',
            textAlign: 'left',
            background: '#f8fafc',
            fontWeight: '600',
            color: '#001D39',
            fontSize: '0.85rem',
            borderBottom: '2px solid #e2e8f0'
        },
        tableCell: {
            padding: '0.875rem 1rem',
            borderBottom: '1px solid #f1f5f9',
            color: '#334155'
        },
        editLink: {
            color: '#0A4174',
            textDecoration: 'none',
            fontWeight: '500',
            marginRight: '1rem'
        },
        deleteBtn: {
            color: '#dc2626',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            fontWeight: '500'
        },
        resultCount: {
            fontSize: '0.85rem',
            color: '#64748b',
            marginBottom: '1rem'
        }
    };

    if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Products</h2>
                <div style={styles.searchContainer}>
                    <input
                        type="text"
                        placeholder="🔍 Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={styles.searchInput}
                    />
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        style={styles.categorySelect}
                    >
                        <option value="">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                    <Link to="/admin/products/new" style={styles.addButton}>+ Add Product</Link>
                </div>
            </div>

            <div style={styles.resultCount}>
                Showing {filteredProducts.length} of {products.length} products
            </div>

            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.tableHeader}>ID</th>
                        <th style={styles.tableHeader}>Name</th>
                        <th style={styles.tableHeader}>Price</th>
                        <th style={styles.tableHeader}>Stock</th>
                        <th style={styles.tableHeader}>Category</th>
                        <th style={styles.tableHeader}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(p => (
                            <tr key={p.id}>
                                <td style={styles.tableCell}>#{p.id}</td>
                                <td style={styles.tableCell}>{p.name}</td>
                                <td style={styles.tableCell}>${p.price}</td>
                                <td style={styles.tableCell}>{p.stock}</td>
                                <td style={styles.tableCell}>{p.category?.name || '-'}</td>
                                <td style={styles.tableCell}>
                                    <Link to={`/admin/products/edit/${p.id}`} style={styles.editLink}>Edit</Link>
                                    <button onClick={() => handleDelete(p.id)} style={styles.deleteBtn}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" style={{ ...styles.tableCell, textAlign: 'center', color: '#94a3b8' }}>
                                No products found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AdminProductList;
