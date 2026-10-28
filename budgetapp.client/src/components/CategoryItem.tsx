import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCategoryIcon } from "../utils/iconMap";

type CategoryItemProps = {
   name: string;
   icon?: string;
   count: number;
   onDelete?: () => void;
};

export default function CategoryItem({
   name,
   icon,
   count,
   onDelete,
}: CategoryItemProps) {
   const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
   const [showContextMenu, setShowContextMenu] = useState(false);

   const categoryRef = useRef<HTMLDivElement>(null);
   const menuRef = useRef<HTMLDivElement>(null);

   const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();

      // Capture the mouse position once, on right-click.
      setMenuPosition({
         x: e.clientX,
         y: e.clientY,
      });

      setShowContextMenu(true);
   };

   useEffect(() => {
      if (!showContextMenu) return;

      const handleOutsideClick = (e: MouseEvent) => {
         const target = e.target as Node;

         if (
            !categoryRef.current?.contains(target) &&
            !menuRef.current?.contains(target)
         ) {
            setShowContextMenu(false);
         }
      };

      const handleEscape = (e: KeyboardEvent) => {
         if (e.key === "Escape") {
            setShowContextMenu(false);
         }
      };

      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("contextmenu", handleOutsideClick);
      document.addEventListener("keydown", handleEscape);

      return () => {
         document.removeEventListener("mousedown", handleOutsideClick);
         document.removeEventListener("contextmenu", handleOutsideClick);
         document.removeEventListener("keydown", handleEscape);
      };
   }, [showContextMenu]);

   return (
      <div
         ref={categoryRef}
         className="category-item"
         onContextMenu={handleContextMenu}
      >
         <FontAwesomeIcon icon={getCategoryIcon(icon)} className="cat-icon" />
         <div className="cat-name">{name}</div>
         <div className="cat-count">
            {count} transaction{count !== 1 ? "s" : ""}
         </div>

         {showContextMenu &&
            createPortal(
               <div
                  ref={menuRef}
                  className="context-menu"
                  style={{
                     position: "fixed",
                     left: menuPosition.x,
                     top: menuPosition.y,
                  }}
               >
                  <button
                     type="button"
                     className="context-menu-item delete"
                     onClick={() => {
                        setShowContextMenu(false);
                        onDelete?.();
                     }}
                  >
                     <FontAwesomeIcon icon="trash" />
                     Delete
                  </button>
               </div>,
               document.body,
            )}
      </div>
   );
}
