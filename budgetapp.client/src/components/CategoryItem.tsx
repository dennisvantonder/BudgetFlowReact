import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type CategoryItemProps = {
   name: string;
   icon?: IconProp;
   count: number;
   // onDelete: (id: number) => void;
};

export default function CategoryItem({
   name,
   icon = "tags",
   count,
}: CategoryItemProps) {
   return (
      <div className="category-item">
         <FontAwesomeIcon icon={icon} className="cat-icon" />
         <div className="cat-name">{name}</div>
         <div className="cat-count">
            {count} transaction{count !== 1 ? "s" : ""}
         </div>
      </div>
   );
}
