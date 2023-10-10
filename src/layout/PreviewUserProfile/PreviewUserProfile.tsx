import React from "react";
import Image from "next/image";
import PreviewLink from "../Select/PreviewLink";
import { useRecoilValue } from "recoil";
import { previewUserLink } from "@/atoms/previewUserLinkAtom";
import { userAccountState } from "@/atoms/userAccountAtom";
import { PlatfromsType } from "../Select/ActiveLinksType";

type PreviewUserProfileProps = {};

const PreviewUserProfile: React.FC<PreviewUserProfileProps> = () => {
  const previewLink = useRecoilValue(previewUserLink);
  const userAccount = useRecoilValue(userAccountState);
  return (
    <div className="mt-16 sm:mt-28 flex flex-col items-center bg-white w-[349px] mx-auto rounded-3xl px-14 py-12">
      {userAccount.picture && (
        <Image
          width={96}
          height={96}
          src={userAccount.picture}
          alt="user Avatar"
          className="aspect-square rounded-full w-[96px] border-[4px] border-purple mb-[1.125rem]"
        />
      )}
      <div className="hidden sm:block absolute bg-purple rounded-b-[2rem] top-0 left-0 w-full z-[-1] h-[357px]"></div>
      <h2 className="text-headingM capitalize">
        {userAccount.firstName} {userAccount.lastName}
      </h2>
      <p className="text-headingS mb-14">{userAccount.email} Email</p>
      <div className="max-h-[305px] overflow-y-auto scrollbar">
        {userAccount.userLink.map((item) => (
          <PreviewLink
            key={item.id}
            platform={item.platform}
            link={item.link}
          />
        ))}
      </div>
    </div>
  );
};
export default PreviewUserProfile;
