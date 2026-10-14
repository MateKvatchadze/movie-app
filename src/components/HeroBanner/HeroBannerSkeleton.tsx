import Skeleton from "../Skeleton/Skeleton";

function HeroBannerSkeleton() {
  return (
    <section className="heroBanner heroBannerSkeleton">
      <div className="heroContent">
        <Skeleton variant="block" width="280px" height="128px" />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="85%" />
        <Skeleton variant="block" width="120px" height="58px" />
      </div>
    </section>
  );
}

export default HeroBannerSkeleton;