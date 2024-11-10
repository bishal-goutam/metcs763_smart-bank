import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// New Login API call
export const login = (username, password) => {
    return axios.post(`${API_BASE_URL}/auth/login`, {
        username: username,
        password: password
    });
};

const getAuthConfig = () => {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');
    if (username && password) {
        return {
            headers: {
                Authorization: `Basic ${btoa(`${username}:${password}`)}`,
            }
        };
    }
    return {}; // Return an empty object if credentials aren't available
};


// Other API functions with auth config
export const getAccount = (accountId) => axios.get(`${API_BASE_URL}/accounts/${accountId}`, getAuthConfig());
export const depositAmount = (accountId, amount) => axios.put(`${API_BASE_URL}/accounts/${accountId}/deposit`, { amount }, getAuthConfig());
export const withdrawAmount = (accountId, amount) => axios.put(`${API_BASE_URL}/accounts/${accountId}/withdraw`, { amount }, getAuthConfig());
export const getAllAccounts = () => axios.get(`${API_BASE_URL}/accounts`, getAuthConfig());
export const deleteAccount = (accountId) => axios.delete(`${API_BASE_URL}/accounts/${accountId}`, getAuthConfig());

export const addAccount = (accountData) => {
    return axios.post(`${API_BASE_URL}/accounts`, {
        accountHolderName: accountData.account_holder_name,
        balance: accountData.balance
    }, getAuthConfig());
};

export const getAccountsByUser = (userId) => {
    return axios.get(`${API_BASE_URL}/accounts/user/${userId}`,getAuthConfig());
};

export const getTransactionsByAccountId = (accountId) => {
    return axios.get(`${API_BASE_URL}/transactions/account/${accountId}`, getAuthConfig());
};

export const internalTransfer = (fromAccountId, toAccountId, amount) => {
    return axios.post(`${API_BASE_URL}/transfer/internal`, {
        fromAccountId,
        toAccountId,
        amount
    },
        getAuthConfig());
};

export const externalTransfer = (fromAccountId, amount, toRoutingNumber, toAccountNumber) => {
    return axios.post(`${API_BASE_URL}/transfer/external`,{
        fromAccountId,
        amount,
        toRoutingNumber,
        toAccountNumber
    },
        getAuthConfig());
};