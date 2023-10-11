import React from "react";
import PhoneMockup from "../../../public/icons/illustration-phone-mockup.svg";
import Image from "next/image";
import PreviewLink from "../Select/PreviewLink";
import { useRecoilValue } from "recoil";
import { previewUserLink } from "@/atoms/previewUserLinkAtom";
import { userAccountState } from "@/atoms/userAccountAtom";
type LinkPreviewProps = {};

const LinkPreview: React.FC<LinkPreviewProps> = () => {
  const previewLink = useRecoilValue(previewUserLink);
  const userAccount = useRecoilValue(userAccountState);
  return (
    <div className="hidden lg:block relative">
      <Image src={PhoneMockup} alt="Phone Mockup" />
      <div className="absolute mt-16 w-full top-0 flex flex-col items-center">
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
          className={`text-headingS capitalize w-[160px] truncate h-6 text-center  ${
            userAccount.firstName && "bg-white"
          } `}
        >
          {userAccount.firstName} {userAccount.lastName}
        </h2>
        <p
          className={`text-bodyS mb-[50px] w-[160px] truncate text-center h-5 ${
            userAccount.email && "bg-white"
          }`}
        >
          {userAccount.email}
        </p>
        <div className="max-h-[305px] overflow-y-auto scrollbar">
          {userAccount?.userLink.map((item) => (
            <PreviewLink
              key={item.id}
              platform={item.platform}
              link={item.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default LinkPreview;
