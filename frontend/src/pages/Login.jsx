import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            username: formData.username.trim(),
            password: formData.password
        };
        const result = await login(payload);
        if (result.success) {
            // Redirect for roles
            const userRoles = result.user?.roles || [];
            if (userRoles.includes('ROLE_ADMIN')) {
                navigate('/admin');
            } else if (userRoles.includes('ROLE_SUPPLIER')) {
                navigate('/supplier');
            } else {
                navigate('/');
            }
        }
    };

    return (
        <div className="container section">
            <div className="auth-container">
                <h2 className="section-title" style={{ marginBottom: '2rem' }}>Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-control"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>
                    <button type="submit" className="btn" style={{ width: '100%' }}>Login</button>
                </form>
                <p style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                    Don't have an account? <Link to="/register" className="auth-link">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
