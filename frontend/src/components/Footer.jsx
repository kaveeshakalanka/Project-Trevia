import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-section">
                    <h3 className="footer-logo">TREVIA</h3>
                    <p className="footer-text">
                        Elevating your style with the latest trends. Quality fashion for everyone.
                    </p>
                    <div className="social-icons">
                        <a href="#" className="social-icon"><FaFacebook /></a>
                        <a href="#" className="social-icon"><FaTwitter /></a>
                        <a href="#" className="social-icon"><FaInstagram /></a>
                        <a href="#" className="social-icon"><FaLinkedin /></a>
                    </div>
                </div>

                <div className="footer-section">
                    <h4 className="footer-title">Quick Links</h4>
                    <ul className="footer-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/shop">Shop</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4 className="footer-title">Customer Care</h4>
                    <ul className="footer-links">
                        <li><Link to="/profile">My Account</Link></li>
                        <li><Link to="/cart">Cart</Link></li>
                        <li><Link to="/orders">Order History</Link></li>
                        <li><Link to="/faq">FAQ</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4 className="footer-title">Find us on</h4>
                    <div className="footer-text">
                        <p style={{ margin: '0.25rem 0' }}>Colombo Main Branch</p>
                        <p style={{ margin: '0.25rem 0' }}>Kandy Branch</p>
                        <p style={{ margin: '0.25rem 0' }}>Galle Hub</p>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} Trevia. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
