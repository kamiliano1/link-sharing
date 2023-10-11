import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { ActiveLinksType, PlatfromsType } from "./ActiveLinksType";
import { linksList } from "./linkList";
type PreviewLinkProps = {
  platform: PlatfromsType;
  link: string;
};

const PreviewLink: React.FC<PreviewLinkProps> = ({ platform, link }) => {
  const [linkStyle, setLinkStyle] = useState<ActiveLinksType>({
    name: "GitHub",
    icon: linksList[0].icon,
    style: "",
  });
  useEffect(() => {
    setLinkStyle(linksList.filter((item) => item.name === platform)[0]);
  }, [platform]);
  return (
    <Link
      href={link}
      className={`mx-auto w-[237px] px-4 py-3 flex text-bodyM items-center rounded-lg mb-4 mr-[.3rem] border-[1px] ${linkStyle.style}`}
    >
      <linkStyle.icon />
      <p className="ml-3 mr-auto">{linkStyle.name}</p>
      <AiOutlineArrowRight className="text-[1.5rem]" />
    </Link>
  );
};
export default PreviewLink;
