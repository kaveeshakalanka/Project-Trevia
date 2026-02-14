import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminProductList from './pages/admin/AdminProductList';
import AdminUserList from './pages/admin/AdminUserList';
import AdminOrderList from './pages/admin/AdminOrderList';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Product from './pages/Product';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCategoryList from './components/AdminCategoryList';
import AdminProductForm from './pages/admin/AdminProductForm';
import Payment from './pages/Payment';
import OrderConfirmation from './pages/OrderConfirmation';
import InventoryDashboard from './pages/admin/InventoryDashboard';
import SupplierLayout from './pages/supplier/SupplierLayout';
import SupplierDashboard from './pages/supplier/SupplierDashboard';
import SupplierCategoryList from './pages/supplier/SupplierCategoryList';
import CreateSupplier from './pages/admin/CreateSupplier';
import { useAuth } from './context/AuthContext';
import Footer from './components/Footer';

// get user from localstorage
const getCachedUser = () => {
  try {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  } catch {
    return null;
  }
};

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  // Use cached user during loading to prevent redirect flash
  const effectiveUser = loading ? getCachedUser() : user;

  if (loading && !effectiveUser) return <div>Loading...</div>;
  return effectiveUser ? children : <Navigate to="/login" />;
}

function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  // Use cached user during loading to prevent redirect  
  const effectiveUser = loading ? getCachedUser() : user;

  if (loading && !effectiveUser) return <div>Loading...</div>;

  if (!effectiveUser) {
    return <Navigate to="/login" />;
  }

   // Check user (if a ROLE_ADMIN)
  const isAdmin = effectiveUser.roles && effectiveUser.roles.some(r => r === 'ROLE_ADMIN' || r?.name === 'ROLE_ADMIN');

  if (!isAdmin) {
    toast.error('Access denied. Admin privileges required.');
    return <Navigate to="/" />;
  }

  return children;
}

function SupplierRoute({ children }) {
  const { user, loading } = useAuth();

  const effectiveUser = loading ? getCachedUser() : user;

  if (loading && !effectiveUser) return <div>Loading...</div>;

  if (!effectiveUser) {
    return <Navigate to="/login" />;
  }

  // Check user (if a ROLE_SUPPLIER)
  const isSupplier = effectiveUser.roles && effectiveUser.roles.some(r => r === 'ROLE_SUPPLIER' || r?.name === 'ROLE_SUPPLIER');

  if (!isSupplier) {
    toast.error('Access denied. Supplier privileges required.');
    return <Navigate to="/" />;
  }

  return children;
}

function App() {
  const location = useLocation();
  const hideFooter = location.pathname.startsWith('/admin') || location.pathname.startsWith('/supplier');

  return (
    <>
      <Navbar />
      <main style={{ minHeight: 'calc(100vh - 80px - 400px)' }}> {/* Push footer down */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Product />} />
          <Route path="/shop/:id" element={<ProductDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/cart" element={<Cart />} />

          {/* Protected Routes */}
          <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
          <Route path="/payment" element={<PrivateRoute><Payment /></PrivateRoute>} />
          <Route path="/order-confirmation" element={<PrivateRoute><OrderConfirmation /></PrivateRoute>} />
          <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<div style={{ width: '100%' }}><AdminProductList /></div>} />{/* ensure full width though Outlet handles */}
            <Route path="products/new" element={<AdminProductForm />} />
            <Route path="products/edit/:id" element={<AdminProductForm />} />
            <Route path="orders" element={<AdminOrderList />} />
            <Route path="users" element={<AdminUserList />} />
            <Route path="users/create-supplier" element={<CreateSupplier />} />
            <Route path="categories" element={<AdminCategoryList />} />
            <Route path="warehouse" element={<InventoryDashboard />} />
          </Route>

          {/* Supplier Routes */}
          <Route path="/supplier" element={<SupplierRoute><SupplierLayout /></SupplierRoute>}>
            <Route index element={<SupplierDashboard />} />
            <Route path="warehouse" element={<InventoryDashboard />} />
            <Route path="categories" element={<SupplierCategoryList />} />
          </Route>
        </Routes>
      </main>
      {!hideFooter && <Footer />}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}

export default App;
