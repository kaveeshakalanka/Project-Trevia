import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const { user } = useAuth();

    // Simpler read-only profile  
    return (
        <div className="container section" style={{ maxWidth: '500px' }}>
            <h2 className="section-title">My Profile</h2>
            <div style={{ padding: '2rem', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                <div className="form-group">
                    <label>Username</label>
                    <div className="form-control" style={{ backgroundColor: '#fff' }}>{user.username}</div>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <div className="form-control" style={{ backgroundColor: '#fff' }}>{user.email}</div>
                </div>

            </div>
        </div>
    );
};

export default Profile;
