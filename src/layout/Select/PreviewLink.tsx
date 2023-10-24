import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { ActiveLinksType, PlatfromsType } from "./ActiveLinksType";
import { linksList } from "./linkList";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
type PreviewLinkProps = {
  platform: PlatfromsType;
  link: string;
  id: string;
};

const PreviewLink: React.FC<PreviewLinkProps> = ({ platform, link, id }) => {
  const [linkStyle, setLinkStyle] = useState<ActiveLinksType>({
    name: "GitHub",
    icon: linksList[0].icon,
    style: "",
  });
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });
  useEffect(() => {
    setLinkStyle(linksList.filter((item) => item.name === platform)[0]);
  }, [platform]);
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const wholeLink = link.includes("https://") ? link : `https://${link}`;
  return (
    <Link
      target="_blank"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      href={wholeLink}
      className={`mx-auto w-[237px] px-4 py-3 flex text-bodyM items-center rounded-lg mb-4 mr-[.3rem] border-[1px] hover:bg-opacity-60 ${linkStyle.style}`}
    >
      <linkStyle.icon />
      <p className="ml-3 mr-auto">{linkStyle.name}</p>
      <AiOutlineArrowRight className="text-[1.5rem]" />
    </Link>
  );
};
export default PreviewLink;
