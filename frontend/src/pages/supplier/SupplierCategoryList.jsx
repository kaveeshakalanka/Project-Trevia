import { useEffect, useState } from 'react';
import categoryAPI from '../../api/categoryAPI';

const SupplierCategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const response = await categoryAPI.getAll();
            setCategories(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error loading categories:', error);
            setLoading(false);
        }
    };

    // Group categories by parent
    const rootCategories = categories.filter(c => !c.parentId);
    const getSubCategories = (parentId) => categories.filter(c => c.parentId === parentId);

    // Color coding helper
    const getCategoryColor = (name) => {
        const lowerName = name.toLowerCase();
        if (lowerName.includes('men') && !lowerName.includes('women')) return { bg: '#eff6ff', border: '#bfdbfe', text: '#1e40af' }; // Blue for Men
        if (lowerName.includes('women')) return { bg: '#fff1f2', border: '#fecdd3', text: '#9f1239' }; // Pink for Women
        if (lowerName.includes('kid') || lowerName.includes('child')) return { bg: '#f0fdf4', border: '#bbf7d0', text: '#166534' }; // Green for Kids
        if (lowerName.includes('access')) return { bg: '#faf5ff', border: '#e9d5ff', text: '#6b21a8' }; // Purple for Accessories
        return { bg: '#f8f9fa', border: '#e9ecef', text: '#343a40' }; // Default Gray
    };

    if (loading) {
        return <div>Loading categories...</div>;
    }

    return (
        <div>
            <h1>Product Categories</h1>
            <p style={{ color: '#666', marginBottom: '2rem' }}>View all product categories and their subcategories</p>

            <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                {rootCategories.map(category => {
                    const colors = getCategoryColor(category.name);
                    return (
                        <div key={category.id} style={{ marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid #eee' }}>
                            <div style={{
                                padding: '1rem',
                                background: colors.bg,
                                border: `1px solid ${colors.border}`,
                                borderRadius: '8px',
                                marginBottom: '1rem'
                            }}>
                                <h3 style={{ margin: 0, color: colors.text }}>{category.name}</h3>
                                {category.description && (
                                    <p style={{ margin: '0.5rem 0 0 0', color: colors.text, opacity: 0.8, fontSize: '0.9rem' }}>
                                        {category.description}
                                    </p>
                                )}
                            </div>

                            {/* Subcategories */}
                            {getSubCategories(category.id).length > 0 && (
                                <div style={{ marginLeft: '2rem' }}>
                                    <h4 style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Subcategories:</h4>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                                        {getSubCategories(category.id).map(subCat => (
                                            <div
                                                key={subCat.id}
                                                style={{
                                                    padding: '0.75rem',
                                                    background: 'white',
                                                    border: '1px solid #ddd',
                                                    borderLeft: `4px solid ${colors.bg === '#eff6ff' ? '#3b82f6' : colors.bg === '#fff1f2' ? '#f43f5e' : colors.bg === '#f0fdf4' ? '#22c55e' : '#9ca3af'}`,
                                                    borderRadius: '4px'
                                                }}
                                            >
                                                <strong>{subCat.name}</strong>
                                                {subCat.description && (
                                                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8rem', color: '#666' }}>
                                                        {subCat.description}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}

                {rootCategories.length === 0 && (
                    <p style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>
                        No categories found.
                    </p>
                )}
            </div>
        </div>
    );
};

export default SupplierCategoryList;
