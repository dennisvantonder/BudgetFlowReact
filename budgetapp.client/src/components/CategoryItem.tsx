import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCategoryIcon } from "../utils/IconMap";

type CategoryItemProps = {
   name: string;
   icon?: string;
   count: number;
   // onDelete: (id: number) => void;
};

export default function CategoryItem({ name, icon, count }: CategoryItemProps) {
   return (
      <div className="category-item">
         <FontAwesomeIcon icon={getCategoryIcon(icon)} className="cat-icon" />
         <div className="cat-name">{name}</div>
         <div className="cat-count">
            {count} transaction{count !== 1 ? "s" : ""}
         </div>
      </div>
   );
}
