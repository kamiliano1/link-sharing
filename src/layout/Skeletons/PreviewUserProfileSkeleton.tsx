import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
type PreviewUserProfileSkeletonProps = {};

const PreviewUserProfileSkeleton: React.FC<
  PreviewUserProfileSkeletonProps
> = () => {
  return (
    <SkeletonTheme
      baseColor="hsl(252, 100%, 62%)"
      highlightColor="hsl(252, 100%, 84%)"
    >
      <div className="flex flex-col items-center z-[5000] relative">
        <Skeleton
          circle={true}
          width={96}
          height={96}
          containerClassName="mb-5"
        />
        <Skeleton width={200} height={40} />
        <Skeleton width={140} height={24} containerClassName="mb-[42px]" />
        <Skeleton
          count={3}
          width={237}
          height={49.33}
          containerClassName="flex flex-col space-y-[-.5rem] items-center"
          borderRadius={"8px"}
        />
      </div>
    </SkeletonTheme>
  );
};
export default PreviewUserProfileSkeleton;
