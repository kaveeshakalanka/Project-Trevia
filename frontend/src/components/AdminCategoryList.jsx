import { useEffect, useState } from 'react';
import categoryAPI from '../api/categoryAPI';

const AdminCategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({ name: '', description: '' });

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const res = await categoryAPI.getAll();
            setCategories(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await categoryAPI.create(newCategory);
            setNewCategory({ name: '', description: '' });
            loadCategories();
        } catch (err) {
            alert('Failed to create category');
        }
    };

    return (
        <div>
            <h2>Categories</h2>

            <div style={{ marginBottom: '2rem', padding: '1rem', background: '#f9f9f9' }}>
                <h3>Add New Category</h3>
                <form onSubmit={handleCreate} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                        <label>Name</label>
                        <input className="form-control" value={newCategory.name} onChange={e => setNewCategory({ ...newCategory, name: e.target.value })} required />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                        <label>Description</label>
                        <input className="form-control" value={newCategory.description} onChange={e => setNewCategory({ ...newCategory, description: e.target.value })} />
                    </div>
                    <button className="btn">Add</button>
                </form>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ textAlign: 'left', borderBottom: '2px solid #ddd' }}>
                        <th style={{ padding: '1rem' }}>ID</th>
                        <th style={{ padding: '1rem' }}>Name</th>
                        <th style={{ padding: '1rem' }}>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(cat => (
                        <tr key={cat.id} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '1rem' }}>{cat.id}</td>
                            <td style={{ padding: '1rem' }}>{cat.name}</td>
                            <td style={{ padding: '1rem' }}>{cat.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminCategoryList;
