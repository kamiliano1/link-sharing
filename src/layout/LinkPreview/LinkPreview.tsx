import { userAccountState } from "@/atoms/userAccountAtom";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import PhoneMockup from "../../../public/icons/illustration-phone-mockup.svg";
import PreviewLink from "../Select/PreviewLink";
import LinkPreviewSkeleton from "../Skeletons/LinkPreviewSkeleton";

type LinkPreviewProps = { loading: boolean };

const LinkPreview: React.FC<LinkPreviewProps> = ({ loading }) => {
  const userAccount = useRecoilValue(userAccountState);
  const [userAccountLetterCount, setUserAccountLetterCount] =
    useState<number>(0);
  useEffect(() => {
    if (userAccount.firstName && userAccount.lastName)
      setUserAccountLetterCount(
        userAccount.firstName?.length + userAccount.lastName?.length
      );
  }, [userAccount.firstName, userAccount.lastName]);
  return (
    <div className="hidden lg:flex lg:justify-center lg:items-center bg-white w-[560px] h-[809px] m-6 mr-0 rounded-xl">
      <div className="relative">
        <Image src={PhoneMockup} loading="eager" alt="Phone Mockup" />
        {loading ? (
          <LinkPreviewSkeleton />
        ) : (
          <div className="absolute top-0 flex flex-col items-center w-full mt-16">
            {userAccount.picture ? (
              <Image
                loading="eager"
                priority={true}
                width={96}
                height={96}
                src={userAccount.picture}
                alt="user Avatar"
                className="aspect-square rounded-full w-[96px] border-[4px] border-purple mb-[1.35rem]"
              />
            ) : (
              <div className="w-[96px] aspect-square mb-[1.35rem]"></div>
            )}
            <div
              className={`${
                userAccountLetterCount > 18
                  ? "flex-col"
                  : "bg-white w-[160px] justify-center"
              } flex`}
            >
              <h2
                className={`text-headingS capitalize h-6  ${
                  userAccountLetterCount > 18
                    ? " w-[160px] truncate bg-white"
                    : " mr-2"
                } text-center`}
              >
                {userAccount.firstName}
              </h2>
              <h2
                className={`text-headingS capitalize h-6  ${
                  userAccountLetterCount > 18 && " w-[160px] truncate bg-white"
                } text-center`}
              >
                {userAccount.lastName}
              </h2>
            </div>
            <p
              className={`text-bodyS  ${
                userAccountLetterCount > 18 ? "mb-[26px]" : "mb-[50px]"
              } w-[160px] truncate text-center h-5 ${
                userAccount.email && "bg-white"
              }`}
            >
              {userAccount.email}
            </p>
            <div className="max-h-[305px] overflow-y-auto scrollbar bg-white">
              {userAccount?.userLink.map((item) => (
                <PreviewLink
                  key={item.id}
                  platform={item.platform}
                  link={item.link}
                  id={item.id}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default LinkPreview;
