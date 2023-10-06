import React from "react";
import PhoneMockup from "../../../public/icons/illustration-phone-mockup.svg";
import Image from "next/image";
import PreviewLink from "../Select/PreviewLink";
import { useRecoilValue } from "recoil";
import { previewUserLink } from "@/atoms/previewUserLinkAtom";
type LinkPreviewProps = {};

const LinkPreview: React.FC<LinkPreviewProps> = () => {
  const previewLink = useRecoilValue(previewUserLink);
  return (
    <div className="hidden lg:block relative">
      <Image src={PhoneMockup} alt="Phone Mockup" />
      <div className="absolute mt-14 w-full top-0  flex flex-col items-center">
        <div className="aspect-square rounded-full w-[96px] border-[4px] border-purple mb-6"></div>
        <h2 className="text-headingS ">Ben Wright</h2>
        <p className="text-bodyS mb-14">ben@example.com</p>
        <div className="max-h-[305px]  overflow-y-auto scrollbar">
          {previewLink?.userLink.map((item) => (
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
