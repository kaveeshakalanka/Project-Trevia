import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import categoryAPI from '../api/categoryAPI';

const ShopSidebar = () => {
    const [categories, setCategories] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const activeCategory = searchParams.get('category');
    const activeCategoryId = searchParams.get('categoryId');

    // Sizes
    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    const activeSize = searchParams.get('size');

    useEffect(() => {
        categoryAPI.getAll().then(res => {
            setCategories(res.data);
        });
    }, []);

    const roots = categories.filter(c => !c.parentId);
    const getSubs = (id) => categories.filter(c => c.parentId === id);

    const handleSizeClick = (size) => {
        const newParams = new URLSearchParams(searchParams);
        if (activeSize === size) {
            newParams.delete('size');
        } else {
            newParams.set('size', size);
        }
        setSearchParams(newParams);
    };

    return (
        <div className="sidebar">
            <div style={{ marginBottom: '2rem' }}>
                <h3 className="sidebar-title">Categories</h3>
                <ul className="sidebar-list">
                    <li>
                        <Link to="/shop" className={`sidebar-link ${!activeCategory ? 'active' : ''}`}>
                            All Products
                        </Link>
                    </li>
                    {roots.map(root => (
                        <li key={root.id}>
                            <Link
                                to={`/shop?category=${encodeURIComponent(root.name)}&categoryId=${root.id}`}
                                className={`sidebar-link ${activeCategoryId === String(root.id) ? 'active' : ''}`}
                            >
                                {root.name}
                            </Link>
                            {/* Show subcats if root is active or generic */}
                            <ul className="sidebar-sublist">
                                {getSubs(root.id).map(sub => (
                                    <li key={sub.id}>
                                        <Link
                                            to={`/shop?category=${encodeURIComponent(sub.name)}&categoryId=${sub.id}`}
                                            className={`sidebar-link ${activeCategoryId === String(sub.id) ? 'active' : ''}`}
                                            style={{ color: activeCategoryId === String(sub.id) ? 'var(--accent-color)' : '' }}
                                        >
                                            {sub.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h3 className="sidebar-title">Filter by Size</h3>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {sizes.map(size => (
                        <button
                            key={size}
                            onClick={() => handleSizeClick(size)}
                            className={`size-btn ${activeSize === size ? 'active' : ''}`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShopSidebar;