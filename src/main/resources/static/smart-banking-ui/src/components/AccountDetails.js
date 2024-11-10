import React, { useState, useEffect } from 'react';
// In AccountDetails.js, AccountList.js, and AddAccount.js
import { addAccount, getAccount, depositAmount, withdrawAmount, getAllAccounts, deleteAccount } from '../services/api';


function AccountDetails({ accountId }) {
    const [account, setAccount] = useState(null);
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        getAccount(accountId).then(response => setAccount(response.data));
    }, [accountId]);

    const handleDeposit = () => {
        depositAmount(accountId, amount).then(() => {
            alert('Deposit successful');
            setAmount(0);
            // Refresh account data
            getAccount(accountId).then(response => setAccount(response.data));
        });
    };

    const handleWithdraw = () => {
        withdrawAmount(accountId, amount).then(() => {
            alert('Withdrawal successful');
            setAmount(0);
            // Refresh account data
            getAccount(accountId).then(response => setAccount(response.data));
        });
    };

    return (
        <div>
            {account && (
                <>
                    <h2>{account.name}'s Account</h2>
                    <p>Balance: ${account.balance}</p>

                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
                    <button onClick={handleDeposit}>Deposit</button>
                    <button onClick={handleWithdraw}>Withdraw</button>
                </>
            )}
        </div>
    );
}

export default AccountDetails;
