import Skeleton from "../../components/Skeleton/Skeleton";

function DetailsPageSkeleton() {
  return (
    <div className="detailsPage detailsSkeleton" role="status" aria-label="Loading media details">
      <Skeleton
        variant="block"
        className="detailsSkeletonBackButton"
        width={100}
        height={40}
      />

      <Skeleton
        variant="block"
        className="detailsSkeletonType"
        width={100}
        height={24}
      />

      <section className="detailsHero detailsSkeletonHero">
        <div className="detailsPosterBox">
          <Skeleton variant="poster" className="detailsSkeletonPoster" />
        </div>

        <div className="detailsInfo">
          <Skeleton
            variant="block"
            className="detailsSkeletonTitle"
            width="75%"
            height={44}
          />

          <div className="detailsBadges">
            <Skeleton variant="block" width={75} height={30} />
            <Skeleton variant="block" width={65} height={30} />
            <Skeleton variant="block" width={85} height={30} />
          </div>

          <div className="detailsSkeletonGenres">
            <Skeleton variant="block" width={85} height={28} />
            <Skeleton variant="block" width={100} height={28} />
            <Skeleton variant="block" width={75} height={28} />
          </div>

          <div className="detailsOverviewSection detailsSkeletonOverview">
            <Skeleton variant="block" width={130} height={25} />

            <div className="detailsSkeletonLines">
              <Skeleton variant="text" />
              <Skeleton variant="text" />
              <Skeleton variant="text" />
              <Skeleton variant="text" width="75%" />
            </div>
          </div>
        </div>
      </section>

      <section className="trailerBox detailsSkeletonTrailerSection">
        <Skeleton variant="block" width={180} height={28} />
        <Skeleton variant="block" className="detailsSkeletonTrailer" />
      </section>
    </div>
  );
}

export default DetailsPageSkeleton;