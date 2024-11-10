import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccountsByUser } from '../services/api';
import MainLayout from './MainLayout';
import '../styles/ExternalTransfer.css';
import '../styles/GlobalStyles.css';
import { externalTransfer } from '../services/api';

function ExternalTransfer() {
    const [accounts, setAccounts] = useState([]);
    const [toRouting, setToRouting] = useState('');
    const [toAccount, setToAccount] = useState('');
    const [fromAccount, setFromAccount] = useState(''); // Updated to dropdown
    const [fromRouting, setFromRouting] = useState('');
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

 /*   const handleSubmit = (e) => {
        e.preventDefault();
        if (
            /^\d{1,16}$/.test(toRouting) &&
            /^\d{1,16}$/.test(toAccount) &&
            fromAccount &&  // Updated to check dropdown value
            /^\d{1,16}$/.test(fromRouting) &&
            parseFloat(amount) > 0
        ) {
            alert(`External transfer of $${amount} from account ${fromAccount} submitted.`);
        } else {
            alert("Please fill out all fields correctly.");
        }
    };*/



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            /^\d{1,16}$/.test(toRouting) &&
            /^\d{1,16}$/.test(toAccount) &&
            fromAccount &&
            parseFloat(amount) > 0
        ) {
            try {
                await externalTransfer(fromAccount, amount, toRouting, toAccount);
                alert(`External transfer of $${amount} submitted.`);
                setAmount('');
            } catch (error) {
                console.error("Error in external transfer:", error);
                alert("Transfer failed.");
            }
        } else {
            alert("Please fill out all fields correctly.");
        }
    };


    const handleCancel = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <MainLayout>
            <div className="transfer-page">
                <h2>External Money Transfer</h2>
                {error && <p>Error: {error}</p>}
                <form className="transfer-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>To Account Routing Number:</label>
                        <input
                            type="text"
                            value={toRouting}
                            onChange={(e) => setToRouting(e.target.value)}
                            pattern="\d{1,16}"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>To Account Number:</label>
                        <input
                            type="text"
                            value={toAccount}
                            onChange={(e) => setToAccount(e.target.value)}
                            pattern="\d{1,16}"
                            required
                        />
                    </div>
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
                        <label>From Account Routing Number:</label>
                        <input
                            type="text"
                            value={fromRouting}
                            onChange={(e) => setFromRouting(e.target.value)}
                            pattern="\d{1,16}"
                            required
                        />
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
                        <button className="submit-button" type="submit">Submit</button>
                        <button className="submit-button" type="button" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </MainLayout>
);
}

export default ExternalTransfer;
