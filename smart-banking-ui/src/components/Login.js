import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import '../styles/Login.css';
import '../styles/GlobalStyles.css';
import MainLayout from './MainLayout';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await login(username, password);

            // Assuming response.data contains userId and role in the backend response
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            localStorage.setItem('userId', response.data.userId);
            localStorage.setItem('userRole', response.data.role);

            // Redirect based on role
            if (response.data.role === "BankManager") {
                navigate('/manager-landing');
            } else if (response.data.role === "User") {
                navigate('/user-landing');
            }
        } catch (err) {
            setError('Invalid username or password');
        }
    };

    return (
        <MainLayout>
        <div className="login-page">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleLogin} className="login-form">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
        </MainLayout>
    );
}

export default Login;
