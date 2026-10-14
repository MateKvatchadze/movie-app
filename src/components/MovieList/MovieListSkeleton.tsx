import Skeleton from "../Skeleton/Skeleton";

type MovieListSkeletonProps = {
  count?: number;
  variant?: "row" | "grid";
};

function MovieListSkeleton({
  count = 6,
  variant = "row",
}: MovieListSkeletonProps) {
  return (
    <div
      className={
        variant === "row"
          ? "moviesRow skeletonMovies"
          : "moviesGrid skeletonMovies"
      }
      aria-hidden="true"
    >
      {Array.from({ length: count }, (_, index) => (
        <div className="skeletonMovieCard" key={index}>
          <Skeleton variant="poster" />
          <div className="skeletonMovieInfo">
            <Skeleton variant="text" width="40%" />
            <Skeleton variant="text" width="85%" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default MovieListSkeleton;