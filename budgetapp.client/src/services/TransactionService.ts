import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export type Transaction = {
    id: number;
    description: string;
    type: string;
    categoryName: string;
    amount: number;
    date: string;
};

export type AddTransaction = {
    description: string;
    amount: number;
    date: string;
    categoryId: number;
    type: string;
    userId: string;
};

export async function addTransaction(transaction: AddTransaction) : Promise<any> {
    const token = localStorage.getItem('authToken');

    return await api.post('/transactions/add', transaction, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export async function getTransactions(userId: string) : Promise<Transaction[]> {
    const token = localStorage.getItem('authToken');

    const response = await api.get(`/transactions/get/${userId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
}