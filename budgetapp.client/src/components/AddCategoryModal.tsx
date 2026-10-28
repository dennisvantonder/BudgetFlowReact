import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PrimaryButton } from "./Buttons";
import { TextInput, ComboBoxInput, type ComboBoxOption } from "./Inputs";
import { useState } from "react";

export type AddCategoryProps = {
   categoryOptions: ComboBoxOption[];
   onClose: () => void;
   onAdd: (name: string, icon: string) => void;
};

export default function AddCategoryModal({
   categoryOptions,
   onClose,
   onAdd,
}: AddCategoryProps) {
   const [categoryName, setCategoryName] = useState("");
   const [categoryType, setCategoryType] = useState("");

   return (
      <div className="modal-overlay open">
         <div className="modal">
            <div className="modal-header">
               <h2>
                  <FontAwesomeIcon
                     icon="tag"
                     style={{ color: "var(--primary)", marginRight: "10px" }}
                  />{" "}
                  Add Category
               </h2>
               <button className="modal-close" onClick={onClose}>
                  &times;
               </button>
            </div>
            <form>
               <TextInput
                  label="Category Name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="Enter category name"
               />
               <ComboBoxInput
                  label="Category Icon"
                  value={categoryType}
                  options={categoryOptions}
                  onChange={(e) => setCategoryType(e.target.value)}
               />
               <PrimaryButton
                  type="button"
                  onClick={() => {
                     onAdd(categoryName, categoryType);
                     onClose();
                  }}
               >
                  Add Category
               </PrimaryButton>
            </form>
         </div>
      </div>
   );
}
