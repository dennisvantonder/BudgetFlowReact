// This file contains reusable input components

// Email input component
type EmailInputProps = {
   value: string;
   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function EmailInput({ value, onChange }: EmailInputProps) {
   return (
      <div className="form-group">
         <label>Email</label>
         <input
            type="email"
            placeholder="you@example.com"
            value={value}
            onChange={onChange}
         />
      </div>
   );
}

// Password input component
type PasswordInputProps = {
   value: string;
   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function PasswordInput({ value, onChange }: PasswordInputProps) {
   return (
      <div className="form-group">
         <label>Password</label>
         <input
            type="password"
            placeholder="••••••••"
            value={value}
            onChange={onChange}
         />
      </div>
   );
}

// FullName Component
type FullNameInputProps = {
   value: string;
   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function FullNameInput({ value, onChange }: FullNameInputProps) {
   return (
      <div className="form-group">
         <label>Full Name</label>
         <input
            type="text"
            placeholder="Your Name"
            value={value}
            onChange={onChange}
         />
      </div>
   );
}

// Form Text input component
type TextInputProps = {
   label?: string;
   value: string;
   placeholder?: string;
   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function FormTextInput({
   label,
   value,
   placeholder = "Enter text...",
   onChange,
}: TextInputProps) {
   return (
      <div className="form-group">
         <label>{label}</label>
         <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
         />
      </div>
   );
}

// Form ComboBox input component
export type ComboBoxOption = {
   value: string;
   label: string;
};

type ComboBoxInputProps = {
   label?: string;
   value: string;
   options: ComboBoxOption[];
   onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export function FormComboBoxInput({
   label,
   value,
   options,
   onChange,
}: ComboBoxInputProps) {
   return (
      <div className="form-group">
         <label>{label}</label>
         <select value={value} onChange={onChange}>
            {options.map((option) => (
               <option key={option.value} value={option.value}>
                  {option.label}
               </option>
            ))}
         </select>
      </div>
   );
}

// Normal TextInput component
export function TextInput({
   value,
   placeholder = "Enter text...",
   onChange,
}: TextInputProps) {
   return (
      <input
         type="text"
         value={value}
         onChange={onChange}
         placeholder={placeholder}
         style={{
            flex: "1",
            minWidth: "180px",
            padding: "10px 16px",
            border: "2px solid var(--border)",
            borderRadius: "var(--radius-sm)",
            fontSize: "14px",
            backgroundColor: "var(--card-bg)",
         }}
      />
   );
}

export function ComboBoxInput({
   value,
   options,
   onChange,
}: ComboBoxInputProps) {
   return (
      <select
         style={{
            padding: "10px 16px",
            border: "2px solid var(--border)",
            borderRadius: "var(--radius-sm)",
            fontSize: "14px",
            backgroundColor: "var(--card-bg)",
         }}
         value={value}
         onChange={onChange}
      >
         {options.map((option) => (
            <option key={option.value} value={option.value}>
               {option.label}
            </option>
         ))}
      </select>
   );
}
