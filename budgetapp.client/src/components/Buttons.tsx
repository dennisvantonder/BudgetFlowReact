// File that contains reusable button components
type ButtonProps = {
   children: React.ReactNode;
   onClick?: () => void;
   type?: "button" | "submit" | "reset";
   disabled?: boolean;
};

export function PrimaryButton({
   children,
   onClick,
   type = "button",
   disabled = false,
}: ButtonProps) {
   return (
      <button
         className="btn btn-primary"
         onClick={onClick}
         type={type}
         disabled={disabled}
      >
         {children}
      </button>
   );
}
