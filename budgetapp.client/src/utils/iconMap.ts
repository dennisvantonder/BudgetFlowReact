import {
   faTag,
   faUtensils,
   faCar,
   faShoppingBag,
   faEllipsisH,
   faFilm,
   faFileInvoice,
   faHeartbeat,
   faHouse,
   faGraduationCap,
   faMoneyBillWave,
   faLaptopCode,
} from "@fortawesome/free-solid-svg-icons";

import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export const iconMap: Record<string, IconDefinition> = {
   "fa-tag": faTag,
   "fa-utensils": faUtensils,
   "fa-car": faCar,
   "fa-shopping-bag": faShoppingBag,
   "fa-ellipsis-h": faEllipsisH,
   "fa-film": faFilm,
   "fa-file-invoice": faFileInvoice,
   "fa-heartbeat": faHeartbeat,
   "fa-house": faHouse,
   "fa-graduation-cap": faGraduationCap,
   "fa-money-bill-wave": faMoneyBillWave,
   "fa-laptop-code": faLaptopCode,
};

export function getCategoryIcon(iconName?: string): IconDefinition {
   return iconMap[iconName ?? ""] ?? faTag;
}
