import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productApi from '../../api/productApi';
import { toast } from 'react-toastify';

const AdminProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        name: '', description: '', price: '', stock: '', categoryId: '', image: null
    });
    const [categories, setCategories] = useState([]);
    const [currentImage, setCurrentImage] = useState(null);

    useEffect(() => {
        productApi.getCategories().then(res => setCategories(res.data));

        if (isEditMode) {
            productApi.getById(id).then(res => {
                const p = res.data;
                setFormData({
                    name: p.name,
                    description: p.description,
                    price: p.price,
                    stock: p.stock,
                    categoryId: p.category?.id || '',
                    image: null
                });
                setCurrentImage(p.imageUrl);
            }).catch(() => toast.error("Failed to load product"));
        }
    }, [id, isEditMode]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFormData({ ...formData, image: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (formData[key] !== null) {
                data.append(key, formData[key]);
            }
        });

        try {
            if (isEditMode) {
                await productApi.update(id, data);
                toast.success('Product updated!');
            } else {
                await productApi.create(data);
                toast.success('Product created!');
            }
            navigate('/admin'); // Return to dashboard
        } catch (err) {
            console.error(err);
            toast.error(isEditMode ? 'Failed to update product' : 'Failed to create product');
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>{isEditMode ? 'Edit Product' : 'Add Product'}</h2>
                <button onClick={() => navigate('/admin')} className="btn" style={{ background: '#ccc' }}>Cancel</button>
            </div>

            <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
                <div className="form-group">
                    <label>Name</label>
                    <input className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} />
                </div>
                <div className="grid grid-cols-2">
                    <div className="form-group">
                        <label>Price</label>
                        <input className="form-control" type="number" name="price" value={formData.price} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Stock</label>
                        <input className="form-control" type="number" name="stock" value={formData.stock} onChange={handleChange} required />
                    </div>
                </div>
                <div className="form-group">
                    <label>Category</label>
                    <select className="form-control" name="categoryId" value={formData.categoryId} onChange={handleChange} required>
                        <option value="">Select Category</option>
                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label>Image</label>
                    {currentImage && <div style={{ marginBottom: '0.5rem' }}>Current: <a href={`http://localhost:8080/api/products/images/${currentImage}`} target="_blank">View</a></div>}
                    <input className="form-control" type="file" name="image" onChange={handleChange} />
                </div>
                <button className="btn">{isEditMode ? 'Update Product' : 'Save Product'}</button>
            </form>
        </div>
    );
};

export default AdminProductForm;
