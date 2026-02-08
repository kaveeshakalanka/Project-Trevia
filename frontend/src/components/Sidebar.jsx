import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { hasWarehouseNotification, clearWarehouseNotification } from '../api/warehouseAPI';
import './AdminSidebar.css';

const Sidebar = () => {
    const { logout, user, loading } = useAuth();
    const location = useLocation();
    const [hasNotification, setHasNotification] = useState(false);

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

    // Check for warehouse notifications
    useEffect(() => {
        const checkNotification = () => {
            setHasNotification(hasWarehouseNotification());
        };

        checkNotification();

        // Check periodically for updates
        const interval = setInterval(checkNotification, 3000);
        return () => clearInterval(interval);
    }, []);

    // Clear notification when visiting warehouse
    useEffect(() => {
        if (location.pathname.startsWith('/admin/warehouse')) {
            clearWarehouseNotification();
            setHasNotification(false);
        }
    }, [location.pathname]);

    if (!displayUser || !displayUser.roles?.some(r => r === 'ROLE_ADMIN' || r?.name === 'ROLE_ADMIN')) return null;

    const isActive = (path) => {
        if (path === '/admin') {
            return location.pathname === '/admin';
        }
        return location.pathname.startsWith(path);
    };

    return (
        <div className="admin-sidebar">
            <div className="admin-sidebar-header">
                <h3>Trevia Enterprise</h3>
                <p className="sidebar-subtitle">Admin Dashboard</p>
            </div>

            {/* Main Menu */}
            <ul className="admin-sidebar-menu">
                <li>
                    <Link
                        to="/admin"
                        className={`admin-sidebar-link ${isActive('/admin') ? 'active' : ''}`}
                    >
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link
                        to="/admin/products"
                        className={`admin-sidebar-link ${isActive('/admin/products') ? 'active' : ''}`}
                    >
                        Products
                    </Link>
                </li>
                <li>
                    <Link
                        to="/admin/orders"
                        className={`admin-sidebar-link ${isActive('/admin/orders') ? 'active' : ''}`}
                    >
                        Orders
                    </Link>
                </li>
                <li>
                    <Link
                        to="/admin/users"
                        className={`admin-sidebar-link ${isActive('/admin/users') ? 'active' : ''}`}
                    >
                        Users
                    </Link>
                </li>
                <li>
                    <Link
                        to="/admin/categories"
                        className={`admin-sidebar-link ${isActive('/admin/categories') ? 'active' : ''}`}
                    >
                        Categories
                    </Link>
                </li>
                <li>
                    <Link
                        to="/admin/warehouse"
                        className={`admin-sidebar-link ${isActive('/admin/warehouse') ? 'active' : ''}`}
                    >
                        Warehouse
                        {hasNotification && <span className="notification-dot"></span>}
                    </Link>
                </li>
            </ul>

            {/* Bottom Section */}
            <div className="admin-sidebar-bottom">
                <div className="sidebar-section-label">Help & Support</div>
                <ul className="admin-sidebar-menu">
                    <li>
                        <Link to="/" className="admin-sidebar-link">
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

export default Sidebar;