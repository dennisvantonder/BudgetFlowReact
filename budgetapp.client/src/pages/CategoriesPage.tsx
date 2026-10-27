import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EmptyState from "../components/EmptyState";
import CategoryItem from "../components/CategoryItem";
import type { Category } from "../services/CategoryService";
import { PrimaryButton } from "../components/Buttons";

export default function CategoriesPage() {
   const categories: Category[] = [
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

   return (
      <div className="page">
         <div className="page-header">
            <h1>
               Categories <small>Manage your spending categories here.</small>
            </h1>
            <div className="page-actions">
               <PrimaryButton>
                  <FontAwesomeIcon icon="plus" /> Add Category
               </PrimaryButton>
            </div>
         </div>
         <div className="categories-grid">
            {categories.length === 0 ? (
               <EmptyState
                  title="No categories yet"
                  message="Start by adding a new category."
               />
            ) : (
               categories.map((c) => {
                  const count = 0;
                  return (
                     <CategoryItem
                        key={c.id}
                        name={c.name}
                        count={count}
                        icon={c.icon}
                     />
                  );
               })
            )}
         </div>
      </div>
   );
}
