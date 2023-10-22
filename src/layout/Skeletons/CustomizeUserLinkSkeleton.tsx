import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
type CustomizeUserLinkSkeletonProps = {};

const CustomizeUserLinkSkeleton: React.FC<
  CustomizeUserLinkSkeletonProps
> = () => {
  return (
    <SkeletonTheme
      baseColor="hsl(252, 100%, 62%)"
      highlightColor="hsl(252, 100%, 84%)"
    >
      <div className="flex flex-col z-[5000] relative p-5 bg-lightGrey rounded-xl my-5">
        <div className="flex justify-between mb-1">
          <Skeleton width={100} height={24} />
          <Skeleton width={100} height={24} />
        </div>
        <Skeleton width={100} height={18} />
        <Skeleton height={41.33} containerClassName="w-full mb-2" />
        <Skeleton width={100} height={18} />
        <Skeleton height={41.33} containerClassName="w-full" />
      </div>
      <div className="flex flex-col z-[5000] relative p-5 bg-lightGrey rounded-xl mb-5">
        <div className="flex justify-between mb-1">
          <Skeleton width={100} height={24} />
          <Skeleton width={100} height={24} />
        </div>
        <Skeleton width={100} height={18} />
        <Skeleton height={41.33} containerClassName="w-full mb-2" />
        <Skeleton width={100} height={18} />
        <Skeleton height={41.33} containerClassName="w-full" />
      </div>
    </SkeletonTheme>
  );
};
export default CustomizeUserLinkSkeleton;
