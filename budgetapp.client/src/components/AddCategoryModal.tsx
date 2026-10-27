import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PrimaryButton } from "./Buttons";
import { TextInput, ComboBoxInput } from "./Inputs";
import { useState } from "react";

export type AddCategoryProps = {
   title: string;
   categoryOptions: { value: string; label: string }[];
};

export default function AddCategoryModal({
   title,
   categoryOptions,
}: AddCategoryProps) {
   const [categoryName, setCategoryName] = useState("");
   const [categoryType, setCategoryType] = useState("");

   return (
      <div className="modal-overlay">
         <div className="modal">
            <div className="modal-header">
               <h2>
                  <FontAwesomeIcon
                     icon="tag"
                     style={{ color: "var(--primary)", marginRight: "10px" }}
                  />{" "}
                  {title}
               </h2>
               <button className="modal-close">&times;</button>
            </div>
            <form>
               <TextInput
                  label="Category Name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="Enter category name"
               />
               <ComboBoxInput
                  label="Category Type"
                  value={categoryType}
                  options={categoryOptions}
                  onChange={(e) => setCategoryType(e.target.value)}
               />
               <PrimaryButton type="submit">Add Category</PrimaryButton>
            </form>
         </div>
      </div>
   );
}
