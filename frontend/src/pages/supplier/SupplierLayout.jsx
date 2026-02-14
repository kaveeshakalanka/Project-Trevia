import SupplierSidebar from '../../components/SupplierSidebar';
import { Outlet } from 'react-router-dom';

const SupplierLayout = () => {
    return (
        <div style={{ display: 'flex' }}>
            <SupplierSidebar />
            <div style={{ marginLeft: '250px', width: '100%', padding: '2rem' }}>
                <Outlet />
            </div>
        </div>
    );
};

export default SupplierLayout;
