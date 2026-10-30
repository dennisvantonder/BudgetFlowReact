import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCategoryIcon } from "../utils/iconMap";
import type { Transaction } from "../services/TransactionService";
import type { Category } from "../services/CategoryService";

export default function TransactionTable({
   transactions,
   categories,
}: {
   transactions: Transaction[];
   categories: Category[];
}) {
   const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
         month: "short",
         day: "numeric",
         year: "numeric",
      });
   };

   return (
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
               {transactions.map((transaction) => {
                  const category = categories.find(
                     (c) => c.name === transaction.categoryName,
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
                              {transaction.categoryName}
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
   );
}
