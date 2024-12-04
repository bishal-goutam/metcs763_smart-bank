// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ManagerLandingPage from './components/ManagerLandingPage';
import UserLandingPage from './components/UserLandingPage';
import AccountList from './components/AccountList';
import AddAccount from './components/AddAccount';
import Login from './components/Login';
import InternalTransfer from './components/InternalTransfer';
import ExternalTransfer from './components/ExternalTransfer';
import NavigationButtons from './components/NavigationButtons';

import TransactionDetails from './components/TransactionDetails';



function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/manager-landing" element={<ManagerLandingPage />} />
                <Route path="/user-landing" element={<UserLandingPage />} />
                <Route path="/accounts" element={<AccountList />} />
                <Route path="/add-account" element={<AddAccount />} />
                <Route path="/accounts" element={<AccountList />} />
                <Route path="/account/:accountId/transactions" element={<TransactionDetails />} />
                <Route path="/internal-transfer" element={<InternalTransfer />} />
                <Route path="/external-transfer" element={<ExternalTransfer />} />
            </Routes>
        </Router>
    );
}

export default App;
