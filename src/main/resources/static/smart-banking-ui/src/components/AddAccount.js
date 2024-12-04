// src/components/AddAccount.js

import React, { useState } from 'react';
import { addAccount } from '../services/api';
import '../styles/AddAccount.css';
import '../styles/GlobalStyles.css';
import MainLayout from './MainLayout';

function AddAccount() {
    const [form, setForm] = useState({ account_holder_name: '', balance: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addAccount(form)
            .then(() => {
                setMessage('Account added successfully!');
                setForm({ account_holder_name: '', balance: '' });
            })
            .catch(error => {
                console.error("Error adding account:", error);
                setMessage('Failed to add account. Please try again.');
            });
    };

    return (
        <MainLayout>
        <div className="add-account">
            <h2>Add New Account</h2>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit} className="account-form">
                <div className="form-group">
                    <label htmlFor="name">Account Holder's Name</label>
                    <input
                        type="text"
                        id="account_holder_name"
                        name="account_holder_name"
                        value={form.account_holder_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="initialBalance">Initial Balance</label>
                    <input
                        type="number"
                        id="balance"
                        name="balance"
                        value={form.balance}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Add Account</button>
            </form>
        </div>
        </MainLayout>
    );
}

export default AddAccount;
