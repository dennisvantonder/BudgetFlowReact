import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PrimaryButton } from "../components/Buttons";
import { ComboBoxInput, TextInput } from "../components/Inputs";
import EmptyState from "../components/EmptyState";
import TransactionTable from "../components/TransactionTable";
import { useState } from "react";

export default function TransactionPage() {
   const [searchTerm, setSearchTerm] = useState("");
   const [selectedCategory, setSelectedCategory] = useState("0");
   const [selectedType, setSelectedType] = useState("all");

   const categories = [
      { id: 0, name: "All Categories", icon: "fa-list" },
      { id: 1, name: "Food", icon: "fa-utensils" },
      { id: 2, name: "Transport", icon: "fa-car" },
      { id: 3, name: "Shopping", icon: "fa-shopping-bag" },
      { id: 4, name: "Entertainment", icon: "fa-film" },
      { id: 5, name: "Bills", icon: "fa-file-invoice" },
      { id: 6, name: "Health", icon: "fa-heartbeat" },
      { id: 7, name: "Education", icon: "fa-graduation-cap" },
      { id: 8, name: "Salary", icon: "fa-money-bill-wave" },
      { id: 9, name: "Freelance", icon: "fa-laptop-code" },
      { id: 10, name: "Other", icon: "fa-ellipsis-h" },
   ];

   let defaultTransactions = [
      {
         id: 1,
         description: "Grocery shopping",
         amount: 85.5,
         type: "expense",
         categoryName: "Food",
         date: "2026-08-10",
      },
      {
         id: 2,
         description: "Monthly salary",
         amount: 3200.0,
         type: "income",
         categoryName: "Salary",
         date: "2026-08-01",
      },
      {
         id: 3,
         description: "Uber ride",
         amount: 24.0,
         type: "expense",
         categoryName: "Transport",
         date: "2026-08-08",
      },
      {
         id: 4,
         description: "Netflix subscription",
         amount: 15.99,
         type: "expense",
         categoryName: "Entertainment",
         date: "2026-08-05",
      },
      {
         id: 5,
         description: "Freelance project",
         amount: 450.0,
         type: "income",
         categoryName: "Freelance",
         date: "2026-08-03",
      },
      {
         id: 6,
         description: "Electricity bill",
         amount: 120.0,
         type: "expense",
         categoryName: "Bills",
         date: "2026-07-28",
      },
      {
         id: 7,
         description: "New headphones",
         amount: 89.99,
         type: "expense",
         categoryName: "Shopping",
         date: "2026-07-25",
      },
      {
         id: 8,
         description: "Doctor visit",
         amount: 60.0,
         type: "expense",
         categoryName: "Health",
         date: "2026-07-20",
      },
   ];

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
               <PrimaryButton>
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
            />
         )}
      </div>
   );
}
