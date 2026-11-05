import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import EmptyState from "../components/EmptyState";
import CategoryItem from "../components/CategoryItem";
import type { Category } from "../services/CategoryService";
import { PrimaryButton } from "../components/Buttons";
import CategorySkeleton from "../components/CategorySkeleton";
import AddCategoryModal from "../components/AddCategoryModal";
import { iconMap } from "../utils/iconMap";
import CategoryService from "../services/CategoryService";

export default function CategoriesPage() {
   const [showModal, setShowModal] = useState(false);
   const [categories, setCategories] = useState<Category[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   const categoryOptions = Object.entries(iconMap).map(([key]) => ({
      value: key,
      label: key.toString().replace("fa-", ""),
   }));

   useEffect(() => {
      const fetchCategories = async () => {
         setLoading(true);
         setError(null);
         try {
            const categoryService = new CategoryService();
            const data = await categoryService.getCategories();
            console.log(data);
            setCategories(data);
         } catch (err) {
            console.error(err);
            setError("Failed to fetch categories");
         } finally {
            setLoading(false);
         }
      };

      fetchCategories();
   }, []);

   const handleDeleteCategory = async (id: number) => {
      try {
         setLoading(true);
         const categoryService = new CategoryService();
         await categoryService.deleteCategory(id);
         setCategories((currentCategories) =>
            currentCategories.filter((c) => c.id !== id),
         );
      } catch (err) {
         console.error(err);
      } finally {
         setLoading(false);
      }
   };

   const handleAddCategory = async (name: string, icon: string) => {
      try {
         setLoading(true);
         const categoryService = new CategoryService();
         const newCategory = await categoryService.addCategory({ name, icon });
         setCategories((currentCategories) => [
            ...currentCategories,
            newCategory,
         ]);
         setShowModal(false);
      } catch (err) {
         console.error(err);
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="page">
         <div className="page-header">
            <h1>
               Categories <small>Manage your spending categories here.</small>
            </h1>
            <div className="page-actions">
               <PrimaryButton onClick={() => setShowModal(true)}>
                  <FontAwesomeIcon icon="plus" /> Add Category
               </PrimaryButton>
            </div>
         </div>
         <div className="categories-grid">
            {loading ? (
               Array.from({ length: 6 }).map((_, index) => (
                  <CategorySkeleton key={index} />
               ))
            ) : error ? (
               <EmptyState
                  title="Error"
                  message={error || "An unexpected error occurred."}
               />
            ) : categories.length === 0 ? (
               <EmptyState
                  title="No categories yet"
                  message="Start by adding a new category."
               />
            ) : (
               categories.map((c) => (
                  <CategoryItem
                     key={c.id}
                     name={c.name}
                     count={0}
                     icon={c.icon}
                     onDelete={() => handleDeleteCategory(c.id)}
                  />
               ))
            )}
         </div>

         {showModal && (
            <AddCategoryModal
               categoryOptions={categoryOptions}
               onClose={() => setShowModal(false)}
               onAdd={handleAddCategory}
            />
         )}
      </div>
   );
}
