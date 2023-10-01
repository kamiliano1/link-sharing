import React, { useEffect, useState } from "react";
import { ActiveLinksType, PlatfromsType } from "./ActiveLinksType";
import { linksList } from "./linkList";
import { IconType } from "react-icons";
import { AiOutlineArrowRight } from "react-icons/ai";
import Link from "next/link";
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
    console.log(platform);
  }, [platform]);
  return (
    <Link
      href={link}
      className={`mx-auto w-[237px] p-4 flex text-bodyM items-center rounded-lg ${linkStyle.style}`}
    >
      <linkStyle.icon />
      <p className="ml-3 mr-auto">{linkStyle.name}</p>
      <AiOutlineArrowRight className="text-[1.5rem]" />
    </Link>
  );
};
export default PreviewLink;
