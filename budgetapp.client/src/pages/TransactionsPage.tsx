import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PrimaryButton } from "../components/Buttons";
import { ComboBoxInput, TextInput } from "../components/Inputs";
import EmptyState from "../components/EmptyState";
import { getCategoryIcon } from "../utils/iconMap";

export default function TransactionPage() {
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
         category: "Food",
         date: "2026-08-10",
      },
      {
         id: 2,
         description: "Monthly salary",
         amount: 3200.0,
         type: "income",
         category: "Salary",
         date: "2026-08-01",
      },
      {
         id: 3,
         description: "Uber ride",
         amount: 24.0,
         type: "expense",
         category: "Transport",
         date: "2026-08-08",
      },
      {
         id: 4,
         description: "Netflix subscription",
         amount: 15.99,
         type: "expense",
         category: "Entertainment",
         date: "2026-08-05",
      },
      {
         id: 5,
         description: "Freelance project",
         amount: 450.0,
         type: "income",
         category: "Freelance",
         date: "2026-08-03",
      },
      {
         id: 6,
         description: "Electricity bill",
         amount: 120.0,
         type: "expense",
         category: "Bills",
         date: "2026-07-28",
      },
      {
         id: 7,
         description: "New headphones",
         amount: 89.99,
         type: "expense",
         category: "Shopping",
         date: "2026-07-25",
      },
      {
         id: 8,
         description: "Doctor visit",
         amount: 60.0,
         type: "expense",
         category: "Health",
         date: "2026-07-20",
      },
   ];

   const expenseTypes = [
      { value: "all", label: "All Types" },
      { value: "expense", label: "Expense" },
      { value: "income", label: "Income" },
   ];

   const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
         month: "short",
         day: "numeric",
         year: "numeric",
      });
   };

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
               value=""
               onChange={() => {}}
            />
            <ComboBoxInput
               value=""
               options={categories.map((category) => ({
                  value: category.id.toString(),
                  label: category.name,
               }))}
               onChange={() => {}}
            />
            <ComboBoxInput
               value=""
               options={expenseTypes}
               onChange={() => {}}
            />
         </div>

         {defaultTransactions.length == 0 ? (
            <EmptyState
               title="No transactions yet"
               message="Start by adding a new transaction."
            />
         ) : (
            <div className="table-wrapper">
               <table>
                  <thead>
                     <tr>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th style={{ textAlign: "right" }}>Actions</th>
                     </tr>
                  </thead>
                  <tbody>
                     {defaultTransactions.map((transaction) => {
                        const category = categories.find(
                           (c) => c.name === transaction.category,
                        );
                        const isIncome = transaction.type === "income";
                        return (
                           <tr key={transaction.id}>
                              <td>
                                 <strong>{transaction.description}</strong>
                              </td>
                              <td>
                                 <span className="badge category-badge">
                                    <FontAwesomeIcon
                                       icon={getCategoryIcon(category?.icon)}
                                       style={{ marginRight: "4px" }}
                                    />
                                    {transaction.category}
                                 </span>
                              </td>
                              <td>
                                 <span
                                    className={`badge ${isIncome ? "income" : "expense"}`}
                                 >
                                    {isIncome ? "Income" : "Expense"}
                                 </span>
                              </td>
                              <td
                                 style={{
                                    fontWeight: "600",
                                    color: isIncome ? "#10b981" : "#ef4444",
                                 }}
                              >
                                 {isIncome
                                    ? `+${Math.abs(transaction.amount).toFixed(2)}`
                                    : `-${Math.abs(transaction.amount).toFixed(2)}`}
                              </td>
                              <td style={{ color: "var(--text-secondary)" }}>
                                 {formatDate(transaction.date)}
                              </td>
                              <td style={{ textAlign: "right" }}>
                                 <div
                                    className="table-actions"
                                    style={{ justifyContent: "flex-end" }}
                                 >
                                    <button className="danger">
                                       <FontAwesomeIcon icon="trash" />
                                    </button>
                                 </div>
                              </td>
                           </tr>
                        );
                     })}
                  </tbody>
               </table>
            </div>
         )}
      </div>
   );
}
