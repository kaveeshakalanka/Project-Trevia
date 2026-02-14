import { useEffect, useState } from 'react';
import userApi from '../../api/userAPI';
import { toast } from 'react-toastify';

const AdminUserList = () => {
    const [users, setUsers] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = () => {
        setLoading(true);
        userApi.getAll()
            .then(res => {
                const allUsers = res.data;
                // Separate users, suppliers, and admins based on roles
                const regularUsers = allUsers.filter(u =>
                    u.roles.some(r => r.name === 'ROLE_USER') &&
                    !u.roles.some(r => r.name === 'ROLE_SUPPLIER' || r.name === 'ROLE_ADMIN')
                );
                const supplierUsers = allUsers.filter(u =>
                    u.roles.some(r => r.name === 'ROLE_SUPPLIER')
                );
                const adminUsers = allUsers.filter(u =>
                    u.roles.some(r => r.name === 'ROLE_ADMIN')
                );
                setUsers(regularUsers);
                setSuppliers(supplierUsers);
                setAdmins(adminUsers);
            })
            .catch(err => toast.error("Failed to load users"))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this user? This cannot be undone.")) {
            userApi.delete(id)
                .then(() => {
                    toast.success("User deleted");
                    fetchUsers();
                })
                .catch(err => toast.error("Failed to delete user"));
        }
    };

    // Styles
    const styles = {
        container: {
            background: '#F5FAFD',
            minHeight: '100vh'
        },
        section: {
            background: '#fff',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '2rem',
            boxShadow: '0 2px 8px rgba(0, 29, 57, 0.05)'
        },
        sectionHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem'
        },
        title: {
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#001D39',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
        },
        badge: {
            background: '#e2e8f0',
            color: '#475569',
            padding: '0.25rem 0.75rem',
            borderRadius: '12px',
            fontSize: '0.85rem',
            fontWeight: '600'
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse'
        },
        tableHeader: {
            background: '#f8fafc',
            textAlign: 'left',
            padding: '0.75rem 1rem',
            fontSize: '0.85rem',
            fontWeight: '600',
            color: '#64748b',
            borderBottom: '2px solid #e2e8f0'
        },
        tableCell: {
            padding: '0.75rem 1rem',
            borderBottom: '1px solid #f1f5f9',
            fontSize: '0.9rem',
            color: '#334155'
        },
        roleBadge: (role) => ({
            display: 'inline-block',
            padding: '0.25rem 0.5rem',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: '600',
            marginRight: '0.25rem',
            background: role === 'ROLE_ADMIN' ? '#fee2e2' :
                role === 'ROLE_SUPPLIER' ? '#dbeafe' :
                    role === 'ROLE_USER' ? '#dcfce7' : '#f1f5f9',
            color: role === 'ROLE_ADMIN' ? '#dc2626' :
                role === 'ROLE_SUPPLIER' ? '#2563eb' :
                    role === 'ROLE_USER' ? '#16a34a' : '#64748b'
        }),
        deleteBtn: {
            color: '#ef4444',
            border: '1px solid #fecaca',
            background: '#fff',
            padding: '0.4rem 0.75rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: '500',
            transition: 'all 0.2s ease'
        },
        emptyState: {
            textAlign: 'center',
            padding: '2rem',
            color: '#94a3b8'
        },
        userIcon: {
            fontSize: '1.25rem'
        }
    };

    if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;

    return (
        <div style={styles.container}>
            <h1 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#001D39', marginBottom: '2rem' }}>User Management</h1>

            {/* Admins Section - Red transparent */}
            <div style={{ ...styles.section, background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                <div style={styles.sectionHeader}>
                    <h2 style={styles.title}>
                        Admins
                        <span style={{ ...styles.badge, background: '#fee2e2', color: '#dc2626' }}>{admins.length}</span>
                    </h2>
                </div>
                {admins.length > 0 ? (
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.tableHeader}>ID</th>
                                <th style={styles.tableHeader}>Username</th>
                                <th style={styles.tableHeader}>Email</th>
                                <th style={styles.tableHeader}>Role</th>
                                <th style={styles.tableHeader}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {admins.map(u => (
                                <tr key={u.id}>
                                    <td style={styles.tableCell}>#{u.id}</td>
                                    <td style={styles.tableCell}>{u.username}</td>
                                    <td style={styles.tableCell}>{u.email}</td>
                                    <td style={styles.tableCell}>
                                        {u.roles.map(r => (
                                            <span key={r.name} style={styles.roleBadge(r.name)}>
                                                {r.name.replace('ROLE_', '')}
                                            </span>
                                        ))}
                                    </td>
                                    <td style={styles.tableCell}>
                                        <button
                                            onClick={() => handleDelete(u.id)}
                                            style={styles.deleteBtn}
                                            onMouseOver={(e) => {
                                                e.target.style.background = '#fef2f2';
                                                e.target.style.borderColor = '#ef4444';
                                            }}
                                            onMouseOut={(e) => {
                                                e.target.style.background = '#fff';
                                                e.target.style.borderColor = '#fecaca';
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div style={styles.emptyState}>No admins found</div>
                )}
            </div>

            {/* Suppliers Section - Blue transparent */}
            <div style={{ ...styles.section, background: 'rgba(37, 99, 235, 0.12)', border: '1px solid rgba(37, 99, 235, 0.3)' }}>
                <div style={styles.sectionHeader}>
                    <h2 style={styles.title}>
                        Suppliers
                        <span style={{ ...styles.badge, background: '#dbeafe', color: '#2563eb' }}>{suppliers.length}</span>
                    </h2>
                </div>
                {suppliers.length > 0 ? (
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.tableHeader}>ID</th>
                                <th style={styles.tableHeader}>Username</th>
                                <th style={styles.tableHeader}>Email</th>
                                <th style={styles.tableHeader}>Role</th>
                                <th style={styles.tableHeader}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {suppliers.map(u => (
                                <tr key={u.id}>
                                    <td style={styles.tableCell}>#{u.id}</td>
                                    <td style={styles.tableCell}>{u.username}</td>
                                    <td style={styles.tableCell}>{u.email}</td>
                                    <td style={styles.tableCell}>
                                        {u.roles.map(r => (
                                            <span key={r.name} style={styles.roleBadge(r.name)}>
                                                {r.name.replace('ROLE_', '')}
                                            </span>
                                        ))}
                                    </td>
                                    <td style={styles.tableCell}>
                                        <button
                                            onClick={() => handleDelete(u.id)}
                                            style={styles.deleteBtn}
                                            onMouseOver={(e) => {
                                                e.target.style.background = '#fef2f2';
                                                e.target.style.borderColor = '#ef4444';
                                            }}
                                            onMouseOut={(e) => {
                                                e.target.style.background = '#fff';
                                                e.target.style.borderColor = '#fecaca';
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div style={styles.emptyState}>No suppliers found</div>
                )}
            </div>

            {/* Regular Users Section - Green transparent */}
            <div style={{ ...styles.section, background: 'rgba(34, 197, 94, 0.12)', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
                <div style={styles.sectionHeader}>
                    <h2 style={styles.title}>
                        Users
                        <span style={{ ...styles.badge, background: '#dcfce7', color: '#16a34a' }}>{users.length}</span>
                    </h2>
                </div>
                {users.length > 0 ? (
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.tableHeader}>ID</th>
                                <th style={styles.tableHeader}>Username</th>
                                <th style={styles.tableHeader}>Email</th>
                                <th style={styles.tableHeader}>Role</th>
                                <th style={styles.tableHeader}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(u => (
                                <tr key={u.id}>
                                    <td style={styles.tableCell}>#{u.id}</td>
                                    <td style={styles.tableCell}>{u.username}</td>
                                    <td style={styles.tableCell}>{u.email}</td>
                                    <td style={styles.tableCell}>
                                        {u.roles.map(r => (
                                            <span key={r.name} style={styles.roleBadge(r.name)}>
                                                {r.name.replace('ROLE_', '')}
                                            </span>
                                        ))}
                                    </td>
                                    <td style={styles.tableCell}>
                                        <button
                                            onClick={() => handleDelete(u.id)}
                                            style={styles.deleteBtn}
                                            onMouseOver={(e) => {
                                                e.target.style.background = '#fef2f2';
                                                e.target.style.borderColor = '#ef4444';
                                            }}
                                            onMouseOut={(e) => {
                                                e.target.style.background = '#fff';
                                                e.target.style.borderColor = '#fecaca';
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div style={styles.emptyState}>No users found</div>
                )}
            </div>
        </div>
    );
};

export default AdminUserList;
