import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import adminUserApi from '../../api/adminUserApi';

const CreateSupplier = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        // Trim whitespace for username and email to prevent login issues
        // For password, we generally preserve spaces if user wants them, but let's be safe for username
        const value = e.target.name === 'password' ? e.target.value : e.target.value;

        setFormData({
            ...formData,
            [e.target.name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            username: formData.username.trim(),
            email: formData.email.trim(),
            password: formData.password // Passwords might explicitly contain spaces
        };

        try {
            await adminUserApi.createSupplier(payload);
            toast.success('Supplier user created successfully!');
            setFormData({ username: '', email: '', password: '' });
            // Optionally navigate to users list
            // navigate('/admin/users');
        } catch (error) {
            console.error('Error creating supplier:', error);
            const errorMsg = error.response?.data?.message || 'Failed to create supplier user';
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-content">
            <div className="admin-header">
                <h1>Create Supplier User</h1>
                <button
                    className="btn btn-secondary"
                    onClick={() => navigate('/admin/users')}
                >
                    Back to Users
                </button>
            </div>

            <div className="form-container" style={{ maxWidth: '600px', margin: '2rem auto' }}>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username *</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="form-control"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            minLength={3}
                            maxLength={50}
                            placeholder="Enter username"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email *</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter email address"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password *</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength={6}
                            placeholder="Enter password (min 6 characters)"
                        />
                    </div>

                    <div className="form-actions" style={{ marginTop: '2rem' }}>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? 'Creating...' : 'Create Supplier'}
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate('/admin/users')}
                            disabled={loading}
                            style={{ marginLeft: '1rem' }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateSupplier;
