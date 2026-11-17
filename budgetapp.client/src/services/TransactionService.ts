import BaseApiService from "./BaseApiService";

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
};

export default class TransactionService extends BaseApiService {
   async getTransactions(): Promise<Transaction[]> {
      return this.get<Transaction[]>("/Transactions/get");
   }

   async addTransaction(transaction: AddTransaction): Promise<Transaction> {
      return this.post<Transaction, AddTransaction>(
         "/Transactions/add",
         transaction,
      );
   }

   async deleteTransaction(transactionId: number): Promise<void> {
      return this.delete<void>(`/Transactions/delete/${transactionId}`);
   }
}
