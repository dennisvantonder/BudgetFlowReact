import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PrimaryButton } from "../components/Buttons";
import { ComboBoxInput, TextInput } from "../components/Inputs";
import EmptyState from "../components/EmptyState";
import TransactionTable from "../components/TransactionTable";
import { useState, useEffect } from "react";

import CategoryService from "../services/CategoryService";
import TransactionService from "../services/TransactionService";

import AddTransactionModal from "../components/AddTransactionModal";

import type { Category } from "../services/CategoryService";
import type { Transaction } from "../services/TransactionService";
import type { AddTransaction } from "../services/TransactionService";

export default function TransactionPage() {
   const [searchTerm, setSearchTerm] = useState("");
   const [selectedCategory, setSelectedCategory] = useState("0");
   const [selectedType, setSelectedType] = useState("all");
   const [showModal, setShowModal] = useState(false);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   const [categories, setCategories] = useState<Category[]>([]);
   const [defaultTransactions, setDefaultTransactions] = useState<
      Transaction[]
   >([]);

   useEffect(() => {
      // first fetch categories and transactions when the component mounts
      const fetchCategories = async () => {
         setLoading(true);
         setError(null);
         try {
            const categoryService = new CategoryService();
            const categoryResponse = await categoryService.getCategories();
            categoryResponse.unshift({ id: 0, name: "All", icon: "" });
            setCategories(categoryResponse);
         } catch (err) {
            console.error(err);
            setError("Failed to fetch Categories");
         } finally {
            setLoading(false);
         }
      };

      fetchCategories();

      // fetch transactions
      const fetchTransactions = async () => {
         setLoading(true);
         setError(null);
         try {
            const transactionService = new TransactionService();
            const transactionResponse =
               await transactionService.getTransactions();
            setDefaultTransactions(transactionResponse);
         } catch (err) {
            console.error(err);
            setError("Failed to fetch Transactions");
         } finally {
            setLoading(false);
         }
      };

      fetchTransactions();
   }, []);

   const handleAddTransaction = async (transaction: AddTransaction) => {
      try {
         setLoading(true);

         // set transaction
         const transactionService = new TransactionService();
         const addedTransaction =
            await transactionService.addTransaction(transaction);
         setDefaultTransactions((currentTransactions) => [
            ...currentTransactions,
            addedTransaction,
         ]);
         setShowModal(false);
      } catch (err) {
         console.error(err);
      } finally {
         setLoading(false);
      }
   };

   const expenseTypes = [
      { value: "all", label: "All Types" },
      { value: "expense", label: "Expense" },
      { value: "income", label: "Income" },
   ];

   const filteredTransactions = defaultTransactions.filter((transaction) => {
      // Search by transaction description
      const matchesSearch = transaction.description
         .toLowerCase()
         .includes(searchTerm.toLowerCase());

      // Filter by category
      const matchesCategory =
         selectedCategory === "0" ||
         categories.find((c) => c.id.toString() === selectedCategory)?.name ===
            transaction.categoryName;

      // Filter by transaction type
      const matchesType =
         selectedType === "all" || transaction.type === selectedType;

      // All conditions must match
      return matchesSearch && matchesCategory && matchesType;
   });

   return (
      <div className="page">
         <div className="page-header">
            <h1>
               Transactions <small>Manage your transaction history here.</small>
            </h1>
            <div className="page-actions">
               <PrimaryButton onClick={() => setShowModal(true)}>
                  <FontAwesomeIcon icon="plus" /> Add Transaction
               </PrimaryButton>
            </div>
         </div>

         <div
            style={{
               display: "flex",
               gap: "12px",
               flexWrap: "wrap",
               marginBottom: "20px",
            }}
         >
            <TextInput
               placeholder="Search transactions..."
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ComboBoxInput
               value={selectedCategory}
               options={categories.map((category) => ({
                  value: category.id.toString(),
                  label: category.name,
               }))}
               onChange={(e) => setSelectedCategory(e.target.value)}
            />
            <ComboBoxInput
               value={selectedType}
               options={expenseTypes}
               onChange={(e) => setSelectedType(e.target.value)}
            />
         </div>

         {filteredTransactions.length == 0 ? (
            <EmptyState
               title="No transactions yet"
               message="Start by adding a new transaction."
            />
         ) : (
            <TransactionTable
               transactions={filteredTransactions}
               categories={categories}
               onDelete={(transactionId) => {
                  setDefaultTransactions((transactions) =>
                     transactions.filter((t) => t.id !== transactionId),
                  );
               }}
            />
         )}

         {showModal && (
            <AddTransactionModal
               categoryOptions={categories.map((category) => ({
                  value: category.id.toString(),
                  label: category.name,
               }))}
               onClose={() => setShowModal(false)}
               onAdd={handleAddTransaction}
            />
         )}
      </div>
   );
}
