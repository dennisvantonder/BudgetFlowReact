import Skeleton from "./Skeleton";

export default function CategorySkeleton() {
   return (
      <div className="category-item">
         <Skeleton
            width="42px"
            height="42px"
            borderRadius="10px"
            className="cat-icon"
            style={{ marginBottom: "8px" }}
         />
         <Skeleton
            width="65%"
            height="18px"
            style={{ marginBottom: "4px" }}
            className="cat-name"
         />
         <Skeleton width="65%" height="18px" className="cat-count" />
      </div>
   );
}
