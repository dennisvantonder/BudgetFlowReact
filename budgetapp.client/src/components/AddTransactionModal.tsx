import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PrimaryButton } from "./Buttons";
import {
   FormTextInput,
   FormNumberInput,
   FormComboBoxInput,
   FormDateInput,
   type ComboBoxOption,
} from "./Inputs";
import { type AddTransaction } from "../services/TransactionService";
import { useState } from "react";

export type AddTransactionModalProps = {
   categoryOptions: ComboBoxOption[];
   onClose: () => void;
   onAdd: (transaction: AddTransaction) => void;
};

export default function AddTransactionModal({
   categoryOptions,
   onClose,
   onAdd,
}: AddTransactionModalProps) {
   const [description, setDescription] = useState("");
   const [amount, setAmount] = useState(0);
   const [type, setType] = useState("");
   const [categoryId, setCategoryId] = useState(0);
   const [date, setDate] = useState("");
   const userId = "";

   return (
      <div className="modal-overlay open">
         <div className="modal">
            <div className="modal-header">
               <h2>
                  <FontAwesomeIcon
                     icon="plus-circle"
                     style={{ color: "var(--primary)", marginRight: "10px" }}
                  />{" "}
                  Add Transaction
               </h2>
               <button className="modal-close" onClick={onClose}>
                  &times;
               </button>
            </div>
            <form>
               <FormTextInput
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Grocery shopping"
               />
               <FormNumberInput
                  label="Amount"
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value))}
                  placeholder="0.01"
               />
               <div className="form-row">
                  <FormComboBoxInput
                     label="Type"
                     value={type}
                     options={[
                        { value: "expense", label: "Expense" },
                        { value: "income", label: "Income" },
                     ]}
                     onChange={(e) => setType(e.target.value)}
                  />
                  <FormComboBoxInput
                     label="Category"
                     value={categoryId.toString()}
                     options={categoryOptions}
                     onChange={(e) => setCategoryId(parseInt(e.target.value))}
                  />
               </div>
               <FormDateInput
                  label="Date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
               />
               <PrimaryButton
                  type="button"
                  onClick={() => {
                     onAdd({
                        description: description,
                        amount: amount,
                        type: type,
                        categoryId: categoryId,
                        date: date,
                        userId: userId,
                     });
                     onClose();
                  }}
               >
                  Add Transaction
               </PrimaryButton>
            </form>
         </div>
      </div>
   );
}
