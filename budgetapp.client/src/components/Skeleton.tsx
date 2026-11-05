type SkeletonProps = {
   width?: string;
   height?: string;
   borderRadius?: string;
   className?: string;
   style?: React.CSSProperties;
};

export default function Skeleton({
   width = "100%",
   height = "20px",
   borderRadius = "6px",
   className = "",
   style = {},
}: SkeletonProps) {
   return (
      <div
         className={`skeleton ${className}`}
         style={{
            width,
            height,
            borderRadius,
            ...style,
         }}
      />
   );
}
