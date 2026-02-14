import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AdminSidebar.css';

const SupplierSidebar = () => {
    const { user, logout, loading } = useAuth();
    const location = useLocation();

    // Get cached user for loading state
    const getCachedUser = () => {
        try {
            const savedUser = localStorage.getItem('user');
            return savedUser ? JSON.parse(savedUser) : null;
        } catch {
            return null;
        }
    };

    const displayUser = loading ? getCachedUser() : user;

    const hasSupplierRole = displayUser?.roles?.some(r => r === 'ROLE_SUPPLIER' || r?.name === 'ROLE_SUPPLIER');

    if (!displayUser || !hasSupplierRole) {
        return null;
    }

    const isActive = (path) => {
        if (path === '/supplier') {
            return location.pathname === '/supplier';
        }
        return location.pathname.startsWith(path);
    };

    return (
        <div className="supplier-sidebar">
            <div className="supplier-sidebar-header">
                <h3 style={{ marginBottom: '0.25rem' }}>Trevia Enterprise</h3>
                <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.8, fontWeight: '400' }}>Supplier Dashboard</p>
            </div>

            {/* Supplier Menu */}
            <ul className="supplier-sidebar-menu">
                <li>
                    <Link
                        to="/supplier"
                        className={`supplier-sidebar-link ${isActive('/supplier') ? 'active' : ''}`}
                    >
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link
                        to="/supplier/warehouse"
                        className={`supplier-sidebar-link ${isActive('/supplier/warehouse') ? 'active' : ''}`}
                    >
                        Warehouse
                    </Link>
                </li>
                <li>
                    <Link
                        to="/supplier/categories"
                        className={`supplier-sidebar-link ${isActive('/supplier/categories') ? 'active' : ''}`}
                    >
                        Categories
                    </Link>
                </li>
            </ul>

            {/* Bottom Section */}
            <div className="admin-sidebar-bottom">
                <div className="sidebar-section-label">Help & Support</div>
                <ul className="supplier-sidebar-menu">
                    <li>
                        <Link to="/" className="supplier-sidebar-link">
                            Back to Home
                        </Link>
                    </li>
                </ul>
                <button onClick={logout} className="sidebar-logout-btn">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default SupplierSidebar;
