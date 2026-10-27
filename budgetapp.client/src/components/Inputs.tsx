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
