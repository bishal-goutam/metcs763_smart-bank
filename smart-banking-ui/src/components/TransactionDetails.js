import React, { useState, useEffect } from 'react';
import {getTransactionsByAccountId} from '../services/api';
import '../styles/TransactionDetails.css';
import '../styles/GlobalStyles.css';

function TransactionDetails({ accountId }) {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchTransactions() {
            try {
                const response = await getTransactionsByAccountId(accountId);
                // Ensure transactions are in array format
                setTransactions(Array.isArray(response.data) ? response.data : []);
                setError(null);
                console.error("Success fetching transactions:");
                console.log("Fetched transactions:", response.data);
            } catch (error) {
                console.error("Error fetching transactions:", error);
                setError("Failed to load transactions.");
            }
        }
        fetchTransactions();
    }, [accountId]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="transaction-details">
            <h3>Transaction Details</h3>
            {transactions.length > 0 ? (
                <table className="transaction-table">
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>Balance Before</th>
                        <th>Balance After</th>
                    </tr>
                    </thead>
                    <tbody>
                    {transactions.map(transaction => (
                        <tr key={transaction.id}>
                            <td>{transaction.transactionDate}</td>
                            <td>{transaction.description}</td>
                            <td>${transaction.amount}</td>
                            <td>{transaction.transactionType}</td>
                            <td>${transaction.balanceBefore}</td>
                            <td>${transaction.balanceAfter}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>No transactions available for this account.</p>
            )}
        </div>
    );
}

export default TransactionDetails;
