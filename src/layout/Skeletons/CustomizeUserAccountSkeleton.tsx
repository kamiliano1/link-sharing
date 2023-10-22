import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
type CustomizeUserAccountSkeletonProps = {};

const CustomizeUserAccountSkeleton: React.FC<
  CustomizeUserAccountSkeletonProps
> = () => {
  return (
    <SkeletonTheme
      baseColor="hsl(252, 100%, 62%)"
      highlightColor="hsl(252, 100%, 84%)"
    >
      <div className="sm:flex items-center z-[5000] relative p-5 bg-lightGrey rounded-xl">
        <Skeleton width={120} height={24} containerClassName="w-[255px]" />
        <Skeleton
          width={193}
          height={193}
          containerClassName=""
          borderRadius={"12px"}
        />
        <div className="max-w-[300px] sm:w-[127px]">
          <Skeleton width={"100%"} height={54} containerClassName=" sm:ml-6" />
        </div>
      </div>
      <div className="mt-6 sm:flex sm:flex-col sm:gap-3 bg-lightGrey rounded-xl p-5">
        <div className="relative sm:flex sm:justify-between sm:items-center sm:gap-4 ">
          <Skeleton width={130} height={20} containerClassName="w-[355px]" />
          <Skeleton width={"100%"} height={49.33} containerClassName="w-full" />
        </div>

        <div className="relative sm:flex sm:justify-between sm:items-center sm:gap-4 ">
          <Skeleton width={130} height={20} containerClassName="w-[355px]" />
          <Skeleton width={"100%"} height={49.33} containerClassName="w-full" />
        </div>

        <div className="relative sm:flex sm:justify-between sm:items-center sm:gap-4 ">
          <Skeleton width={130} height={20} containerClassName="w-[355px]" />
          <Skeleton width={"100%"} height={49.33} containerClassName="w-full" />
        </div>
      </div>
    </SkeletonTheme>
  );
};
export default CustomizeUserAccountSkeleton;
