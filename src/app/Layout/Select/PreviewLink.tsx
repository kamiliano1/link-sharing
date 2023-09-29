import React, { useEffect, useState } from "react";
import { ActiveLinksType, PlatfromsType } from "./ActiveLinksType";
import { linksList } from "./linkList";
import { IconType } from "react-icons";
import { AiOutlineArrowRight } from "react-icons/ai";
type PreviewLinkProps = {
  platform: PlatfromsType;
};

const PreviewLink: React.FC<PreviewLinkProps> = ({ platform }) => {
  const [linkStyle, setLinkStyle] = useState<ActiveLinksType>({
    name: "GitHub",
    icon: linksList[0].icon,
    style: "",
  });
  useEffect(() => {
    setLinkStyle(linksList.filter((item) => item.name === platform)[0]);
  }, [platform]);
  return (
    <div
      className={`mx-auto w-[237px] p-4 flex text-bodyM items-center rounded-lg ${linkStyle.style}`}
    >
      <linkStyle.icon />
      <p className="ml-3 mr-auto">{linkStyle.name}</p>
      <AiOutlineArrowRight className="text-[1.5rem]" />
    </div>
  );
};
export default PreviewLink;
