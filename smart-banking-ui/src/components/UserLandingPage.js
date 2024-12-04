import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';
import '../styles/GlobalStyles.css';
import useLogout from '../hooks/useLogout';
import MainLayout from './MainLayout';

function UserLandingPage() {
    const logout = useLogout();

    return (
        <MainLayout>

        <div className="landing-page">
            <header className="header">
                <h1>Welcome to Smart Bank</h1>
                <p>Your trusted partner in financial management</p>
            </header>
            <div className="buttons">
                <button className="button" onClick={logout}>Logout</button>
                <Link to="/accounts" className="button">View Accounts</Link>
            </div>
        </div>
        </MainLayout>
    );
}

export default UserLandingPage;
