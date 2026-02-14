import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // We need to export AuthContext from there

const useAuth = () => {
    return useContext(AuthContext);
};

export default useAuth;
