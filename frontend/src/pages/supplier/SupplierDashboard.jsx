import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import productApi from '../../api/productApi';
import inventoryAPI from '../../api/inventoryAPI';
import warehouseAPI from '../../api/warehouseAPI';

const SupplierDashboard = () => {
    const [stats, setStats] = useState({
        totalProducts: 0,
        lowStockItems: 0,
        activeWarehouses: 0,
        totalWarehouses: 0
    });
    const [lowStockProducts, setLowStockProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsRes, lowStockRes, warehousesRes] = await Promise.all([
                    productApi.getAll(),
                    inventoryAPI.getLowStockProducts(),
                    warehouseAPI.getAll()
                ]);

                const products = productsRes.data.content || productsRes.data;
                const warehouses = warehousesRes.data;

                setStats({
                    totalProducts: products.length,
                    lowStockItems: lowStockRes.data.length,
                    activeWarehouses: warehouses.filter(w => w.active).length,
                    totalWarehouses: warehouses.length
                });

                setLowStockProducts(lowStockRes.data.slice(0, 5));
            } catch (error) {
                console.error("Error fetching supplier dashboard data", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Supplier Dashboard</h1>

            {/* Statistics Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
                <div style={{ padding: '1.5rem', background: '#f8f9fa', borderRadius: '8px', border: '1px solid #e9ecef' }}>
                    <h3 style={{ fontSize: '1rem', color: '#6c757d', marginBottom: '0.5rem' }}>Total Products</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{stats.totalProducts}</p>
                </div>
                <div style={{ padding: '1.5rem', background: '#fff3cd', borderRadius: '8px', border: '1px solid #ffc107' }}>
                    <h3 style={{ fontSize: '1rem', color: '#856404', marginBottom: '0.5rem' }}>Low Stock Items</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#e74c3c' }}>{stats.lowStockItems}</p>
                </div>
                <div style={{ padding: '1.5rem', background: '#d4edda', borderRadius: '8px', border: '1px solid #28a745' }}>
                    <h3 style={{ fontSize: '1rem', color: '#155724', marginBottom: '0.5rem' }}>Active Warehouses</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#28a745' }}>{stats.activeWarehouses}</p>
                </div>
                <div style={{ padding: '1.5rem', background: '#f8f9fa', borderRadius: '8px', border: '1px solid #e9ecef' }}>
                    <h3 style={{ fontSize: '1rem', color: '#6c757d', marginBottom: '0.5rem' }}>Total Warehouses</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{stats.totalWarehouses}</p>
                </div>
            </div>

            {/* Low Stock Alert */}
            {lowStockProducts.length > 0 && (
                <div style={{ marginTop: '3rem', padding: '1.5rem', background: '#fff3cd', borderRadius: '8px', border: '1px solid #ffc107' }}>
                    <h3 style={{ color: '#856404', marginTop: 0 }}>⚠️ Low Stock Alert</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid #ddd' }}>
                                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Product</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Current Stock</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Reorder Level</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Warehouse</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lowStockProducts.map((item, index) => (
                                <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                                    <td style={{ padding: '0.75rem' }}>{item[1]}</td>
                                    <td style={{ padding: '0.75rem', color: '#e74c3c', fontWeight: 'bold' }}>{item[2]}</td>
                                    <td style={{ padding: '0.75rem' }}>{item[3]}</td>
                                    <td style={{ padding: '0.75rem' }}>{item[4] || 'N/A'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Quick Links */}
            <div style={{ marginTop: '3rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#374151', marginBottom: '1.5rem' }}>Quick Actions</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                    <Link
                        to="/supplier/warehouse"
                        style={{
                            padding: '1.5rem',
                            background: '#2563eb', // Solid Blue
                            color: '#ffffff',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            border: 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.3)'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.background = '#1d4ed8'; // Darker blue on hover
                            e.currentTarget.style.boxShadow = '0 6px 8px -1px rgba(37, 99, 235, 0.4)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'none';
                            e.currentTarget.style.background = '#2563eb';
                            e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(37, 99, 235, 0.3)';
                        }}
                    >
                        <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>Manage Warehouse</span>
                        <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.9)', marginTop: '0.5rem' }}>View stock and record transactions</span>
                    </Link>
                    <Link
                        to="/supplier/categories"
                        style={{
                            padding: '1.5rem',
                            background: '#16a34a', // Solid Green
                            color: '#ffffff',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            border: 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 4px 6px -1px rgba(22, 163, 74, 0.3)'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.background = '#15803d'; // Darker green on hover
                            e.currentTarget.style.boxShadow = '0 6px 8px -1px rgba(22, 163, 74, 0.4)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'none';
                            e.currentTarget.style.background = '#16a34a';
                            e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(22, 163, 74, 0.3)';
                        }}
                    >
                        <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>View Categories</span>
                        <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.9)', marginTop: '0.5rem' }}>Browse product categories</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SupplierDashboard;
