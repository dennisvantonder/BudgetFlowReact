import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EmptyState from "../components/EmptyState";
import CategoryItem from "../components/CategoryItem";
import type { Category } from "../services/CategoryService";

export default function CategoriesPage() {
   const categories: Category[] = [];

   return (
      <div className="page">
         <div className="page-header">
            <h1>
               Categories <small>Manage your spending categories here.</small>
            </h1>
            <div className="page-actions">
               <button className="btn btn-primary">
                  <FontAwesomeIcon icon="plus" /> Add Category
               </button>
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
                     <CategoryItem key={c.id} name={c.name} count={count} />
                  );
               })
            )}
         </div>
      </div>
   );
}
