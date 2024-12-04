import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccountsByUser } from '../services/api';
import '../styles/InternalTransfer.css';
import '../styles/GlobalStyles.css';
import MainLayout from './MainLayout';
import { internalTransfer } from '../services/api';

function InternalTransfer() {
    const [accounts, setAccounts] = useState([]);
    const [fromAccount, setFromAccount] = useState('');
    const [toAccount, setToAccount] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        async function fetchUserAccounts() {
            try {
                const response = await getAccountsByUser(userId);
                setAccounts(response.data);
            } catch (error) {
                console.error("Error fetching user accounts:", error);
                setError("Failed to load accounts.");
            }
        }
        fetchUserAccounts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (parseFloat(amount) > 0 && fromAccount && toAccount) {
            try {
                await internalTransfer(fromAccount, toAccount, amount);
                alert(`Internal transfer of $${amount} submitted.`);
                setAmount('');
            } catch (error) {
                console.error("Error in internal transfer:", error);
                alert("Transfer failed.");
            }
        } else {
            alert("Please fill out all fields correctly.");
        }
    };

/*
    const handleSubmit = (e) => {
        e.preventDefault();
        if (parseFloat(amount) > 0 && fromAccount && toAccount) {
            alert(`Internal transfer of $${amount} from ${fromAccount} to ${toAccount} submitted.`);
        } else {
            alert("Please fill out all fields correctly.");
        }
    };*/

    const handleCancel = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <MainLayout>
        <div className="transfer-page">
            <h2>Internal Money Transfer</h2>
            {error && <p className="message">Error: {error}</p>}
            <form className="transfer-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>From Account:</label>
                    <select value={fromAccount} onChange={(e) => setFromAccount(e.target.value)} required>
                        <option value="">Select Account</option>
                        {accounts.map(account => (
                            <option key={account.id} value={account.id}>{account.id}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>To Account:</label>
                    <select value={toAccount} onChange={(e) => setToAccount(e.target.value)} required>
                        <option value="">Select Account</option>
                        {accounts.map(account => (
                            <option key={account.id} value={account.id}>{account.id}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Amount:</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        min="0.01"
                        step="0.01"
                        required
                    />
                </div>
                <div className="button-group">
                    <button type="submit" className="submit-button">Submit</button>
                    <button type="button" onClick={handleCancel} className="cancel-button">Cancel</button>
                </div>
            </form>
        </div>
        </MainLayout>
    );
}

export default InternalTransfer;
