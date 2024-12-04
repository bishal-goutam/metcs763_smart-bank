import React, { useState, useEffect } from 'react';
import { getAllAccounts, getAccountsByUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import TransactionDetails from './TransactionDetails'; // Import TransactionDetails component
import NavigationButtons from './NavigationButtons'; // Import  component
import '../styles/AccountList.css';
import '../styles/GlobalStyles.css';
import MainLayout from './MainLayout';

function AccountList() {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedAccountId, setSelectedAccountId] = useState(null); // State for selected account

    useEffect(() => {
        const userRole = localStorage.getItem('userRole');
        const userId = localStorage.getItem('userId');

        async function fetchAccounts() {
            setLoading(true);
            try {
                let response;
                if (userRole === 'BankManager') {
                    response = await getAllAccounts();
                } else if (userRole === 'User' && userId) {
                    response = await getAccountsByUser(userId);
                }

                if (response) {
                    setAccounts(response.data);
                    setError(null);
                } else {
                    setError("No accounts available for this user.");
                }
            } catch (error) {
                console.error("Error fetching accounts:", error);
                setError("Failed to load accounts.");
            } finally {
                setLoading(false);
            }
        }

        fetchAccounts();
    }, []);

    const handleViewDetails = (accountId) => {
        console.log("Selected Account ID:", accountId);
        setSelectedAccountId(accountId);
    };
    const handleBackToAllAccounts = () => {
        setSelectedAccountId(null);  // Return to the full account list
    };


    if (loading) {
        return <div>Loading accounts...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
    <MainLayout>
    <div className="account-list">
        <NavigationButtons
            showBackToAll={!!selectedAccountId}
            onBackToAll={handleBackToAllAccounts}
        />
        {selectedAccountId ? (
            // Display only the selected account with TransactionDetails

            <>
                <div className="account-details">
                    {accounts
                        .filter(account => account.id === selectedAccountId)
                        .map(account => (
                            <div className="account-card expanded" key={account.id}>
                                <h3>{account.account_holder_name || "Account Holder"}</h3>
                                <p><strong>Account ID:</strong> {account.id}</p>
                                <p><strong>Balance:</strong> ${account.balance}</p>
                            </div>
                        ))}
                </div>
                <TransactionDetails accountId={selectedAccountId}/>  </>
        ) : (
            // Display all accounts with View Details button
            <div className="account-cards">
                {accounts.map(account => (
                    <div className="account-card" key={account.id}>
                        <h3>{account.account_holder_name || "Account Holder"}</h3>
                        <p><strong>Account ID:</strong> {account.id}</p>
                        <p><strong>Balance:</strong> ${account.balance}</p>
                        <button
                            className="view-button"
                            onClick={() => handleViewDetails(account.id)}
                        >
                            View Details
                        </button>
                    </div>
                ))}
            </div>
        )}
    </div>
    </MainLayout>
    );
}

export default AccountList;
