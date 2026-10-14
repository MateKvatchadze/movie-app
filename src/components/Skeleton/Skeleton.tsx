import "./Skeleton.css";

type SkeletonProps = {
  variant?: "poster" | "text" | "banner" | "block";
  width?: string | number;
  height?: string | number;
  className?: string;
};

function Skeleton({
  variant = "block",
  width,
  height,
  className = "",
}: SkeletonProps) {
  return (
    <div
      className={`skeleton skeleton--${variant} ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}

export default Skeleton;