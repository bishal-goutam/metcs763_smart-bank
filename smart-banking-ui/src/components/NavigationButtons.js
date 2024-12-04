import React from 'react';
import { useNavigate } from 'react-router-dom';
import useLogout from '../hooks/useLogout';

function NavigationButtons({ showBackToAll, onBackToAll }) {
    const navigate = useNavigate();
    const logout = useLogout();

    const handleBack = () => {
        navigate(-1);  // Navigate to the previous page in history
    };
    const handleInternalTransfer = () => {
        navigate('/internal-transfer'); // Replace with actual internal transfer route
    };

    const handleExternalTransfer = () => {
        navigate('/external-transfer'); // Replace with actual external transfer route
    };

    return (
        <div style={{display: 'flex', gap: '10px', marginBottom: '20px'}}>
            <button className="nav-button" onClick={handleBack}>Dashboard</button>
            {showBackToAll && (
                <button className="nav-button" onClick={onBackToAll}>Back to All Accounts</button>
            )}
            <button className="nav-button" onClick={handleInternalTransfer}>Internal Money Transfer</button>
            <button className="nav-button" onClick={handleExternalTransfer}>External Money Transfer</button>
            <button className="nav-button" onClick={logout}>Logout</button>
        </div>
    );
}

export default NavigationButtons;
