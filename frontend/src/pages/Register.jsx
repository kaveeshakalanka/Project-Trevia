import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        companyName: ''
    });
    const [isSupplierRegistering, setIsSupplierRegistering] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        // Determine role base mode
        const roles = isSupplierRegistering ? ['supplier'] : ['user'];

        const payload = {
            username: formData.username.trim(),
            email: formData.email.trim(),
            password: formData.password,
            role: roles
        };

        // Add company name - only a supplier
        if (isSupplierRegistering && formData.companyName) {
            payload.companyName = formData.companyName.trim();
        }

        const result = await register(payload);
        if (result.success) {
            navigate('/login');
        }
    };

    const toggleSupplierMode = (e) => {
        e.preventDefault();
        setIsSupplierRegistering(!isSupplierRegistering);

        // Clear company name when switching back to user
        if (isSupplierRegistering) {
            setFormData(prev => ({ ...prev, companyName: '' }));
        }
    };

    return (
        <div className="container section">
            <div className="auth-container">
                <h2 className="section-title" style={{ marginBottom: '2rem' }}>
                    {isSupplierRegistering ? 'Supplier Registration' : 'Create Account'}
                </h2>
                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-control"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            required
                            minLength="3"
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>

                    {isSupplierRegistering && (
                        <div className="form-group">
                            <label>Company Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={formData.companyName}
                                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                required={isSupplierRegistering}
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                            minLength="6"
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn"
                        style={{ width: '100%' }}
                    >
                        {isSupplierRegistering ? 'Register as Supplier' : 'Register'}
                    </button>

                    <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                        <button
                            type="button"
                            onClick={toggleSupplierMode}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: '#6c757d',
                                textDecoration: 'underline',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                padding: 0
                            }}
                        >
                            {isSupplierRegistering ? 'Register as User' : 'Register as Supplier'}
                        </button>
                    </div>
                </form>
                <p style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                    Already have an account? <Link to="/login" className="auth-link">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
