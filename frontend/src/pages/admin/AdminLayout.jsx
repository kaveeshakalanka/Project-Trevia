import Sidebar from '../../components/Sidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ marginLeft: '250px', width: '100%', padding: '2rem' }}>
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;
