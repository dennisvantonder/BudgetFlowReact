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

// Text input component
type TextInputProps = {
   label: string;
   value: string;
   placeholder?: string;
   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function TextInput({
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

// ComboBox input component
type ComboBoxOption = {
   value: string;
   label: string;
};

type ComboBoxInputProps = {
   label: string;
   value: string;
   options: ComboBoxOption[];
   onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export function ComboBoxInput({
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
