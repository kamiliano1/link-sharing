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
    <>
      <div className="sm:mt-28 flex flex-col items-center bg-white sm:w-[349px] mx-auto sm:rounded-3xl px-14 py-12 h-full sm:min-h-[569px] shadow-[0px_0px_32px_0px_rgba(0,_0,_0,_0.10)] sm:z-[5] sm:relative">
        {userAccount.picture ? (
          <Image
            width={96}
            height={96}
            src={userAccount.picture}
            alt="user Avatar"
            className="aspect-square rounded-full w-[96px] border-[4px] border-purple mb-[1.35rem]"
          />
        ) : (
          <div className="w-[96px] aspect-square mb-[1.35rem]"></div>
        )}
        <h2
          className={`text-headingM capitalize w-[250px] truncate text-center  ${
            userAccount.firstName && "bg-white"
          } `}
        >
          {userAccount.firstName} {userAccount.lastName}
        </h2>
        <p
          className={`text-headingS mb-[50px] w-[250px] truncate text-center ${
            userAccount.email && "bg-white"
          }`}
        >
          {userAccount.email}
        </p>
        <div className="max-h-[305px] overflow-y-auto scrollbar">
          {userAccount.userLink.map((item) => (
            <PreviewLink
              id={item.id}
              key={item.id}
              platform={item.platform}
              link={item.link}
            />
          ))}
        </div>
      </div>
      <div className="hidden sm:block absolute bg-purple rounded-b-[2rem] -top-6 left-0 w-full h-[357px]"></div>
    </>
  );
};
export default PreviewUserProfile;
