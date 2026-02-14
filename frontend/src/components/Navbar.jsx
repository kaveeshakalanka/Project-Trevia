import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FaShoppingBag, FaUser, FaSignOutAlt, FaBox } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import orderApi from '../api/orderApi';
import './Navbar.css';

const Navbar = () => {
    const { user, loading, logout } = useAuth();
    const { cartCount } = useCart();
    const [orderNotifications, setOrderNotifications] = useState(0);

    // Get cached user from localStorage to prevent flashing on refresh
    const getCachedUser = () => {
        try {
            const savedUser = localStorage.getItem('user');
            return savedUser ? JSON.parse(savedUser) : null;
        } catch {
            return null;
        }
    };

    // Use cached user during loading, then actual user after loading completes
    const displayUser = loading ? getCachedUser() : user;

    const isAdmin = displayUser?.roles?.some(r => r === 'ROLE_ADMIN' || r?.name === 'ROLE_ADMIN');
    const isSupplier = displayUser?.roles?.some(r => r === 'ROLE_SUPPLIER' || r?.name === 'ROLE_SUPPLIER');
    const isRegularUser = displayUser && !isAdmin && !isSupplier;

    // Check for order status updates when user is logged in
    useEffect(() => {
        if (!displayUser || isAdmin || isSupplier) return;

        const checkOrderUpdates = async () => {
            try {
                const res = await orderApi.getMyOrders();
                const orders = res.data || [];

                // Get last seen statuses from localStorage
                const lastSeenKey = `orderStatuses_${displayUser.id || displayUser.username}`;
                const lastSeenRaw = localStorage.getItem(lastSeenKey);
                const lastSeen = lastSeenRaw ? JSON.parse(lastSeenRaw) : {};

                // Count orders with status changes
                let updatedCount = 0;
                const currentStatuses = {};

                orders.forEach(order => {
                    currentStatuses[order.id] = order.status;
                    
                    if (lastSeen[order.id] && lastSeen[order.id] !== order.status) {
                        updatedCount++;
                    } else if (!lastSeen[order.id] && order.status !== 'PENDING') {
                        
                        updatedCount++;
                    }
                });

                setOrderNotifications(updatedCount);
            } catch (err) {
                console.error('Failed to check order updates:', err);
            }
        };

        checkOrderUpdates();
        
        const interval = setInterval(checkOrderUpdates, 30000);
        return () => clearInterval(interval);
    }, [displayUser, isAdmin, isSupplier]);

    
    const markOrdersAsSeen = async () => {
        if (!displayUser) return;
        try {
            const res = await orderApi.getMyOrders();
            const orders = res.data || [];
            const lastSeenKey = `orderStatuses_${displayUser.id || displayUser.username}`;
            const currentStatuses = {};
            orders.forEach(order => {
                currentStatuses[order.id] = order.status;
            });
            localStorage.setItem(lastSeenKey, JSON.stringify(currentStatuses));
            setOrderNotifications(0);
        } catch (err) {
            console.error('Failed to mark orders as seen:', err);
        }
    };

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <Link to="/" className="navbar-logo">TREVIA</Link>

                <ul className="navbar-menu">
                    {!isSupplier && (
                        <>
                            <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
                            <li><NavLink to="/shop" className={({ isActive }) => isActive ? 'active' : ''}>Shop</NavLink></li>
                        </>
                    )}
                    <li><NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink></li>
                    <li><NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink></li>

                    {isAdmin && (
                        <li><NavLink to="/admin" className={({ isActive }) => `admin-link ${isActive ? 'active' : ''}`}>Admin</NavLink></li>
                    )}

                    {isSupplier && (
                        <li><NavLink to="/supplier" className={({ isActive }) => `supplier-link ${isActive ? 'active' : ''}`}>Supplier</NavLink></li>
                    )}

                </ul>

                <div className="navbar-actions">
                    {}
                    {isRegularUser && (
                        <NavLink
                            to="/orders"
                            className="action-icon orders-link"
                            onClick={markOrdersAsSeen}
                            title="My Orders"
                        >
                            <FaBox />
                            {orderNotifications > 0 && (
                                <span className="orders-badge">{orderNotifications}</span>
                            )}
                        </NavLink>
                    )}

                    {!isSupplier && (
                        <Link to="/cart" className="action-icon">
                            <FaShoppingBag />
                            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                        </Link>
                    )}

                    {displayUser ? (
                        <div className="user-menu">
                            <Link to="/profile" className="action-icon"><FaUser /></Link>
                            <button onClick={logout} className="action-btn"><FaSignOutAlt /></button>
                        </div>
                    ) : (
                        <Link to="/login" className="login-link">Sign In</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;