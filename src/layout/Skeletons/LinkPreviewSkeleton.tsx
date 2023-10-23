import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
type LinkPreviewSkeletonProps = {};

const LinkPreviewSkeleton: React.FC<LinkPreviewSkeletonProps> = () => {
  return (
    <div className="absolute mt-[60px] w-full top-0 flex flex-col items-center ">
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
          <Skeleton width={200} height={24} />
          <Skeleton width={140} height={20} containerClassName="mb-11" />
          <Skeleton
            count={5}
            width={237}
            height={49.33}
            containerClassName="flex flex-col space-y-[-.5rem] items-center"
            borderRadius={"8px"}
          />
        </div>
      </SkeletonTheme>
    </div>
  );
};
export default LinkPreviewSkeleton;
