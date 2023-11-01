import React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { User } from "firebase/auth";
import { popUpState } from "@/atoms/togglePopUpAtom";
import { useRecoilState } from "recoil";
import { usePathname, useRouter } from "next/navigation";
type PreviewUserNavbarProps = { user: User | null | undefined };

const PreviewUserNavbar: React.FC<PreviewUserNavbarProps> = ({ user }) => {
  const [isPopUpOpen, setIsPopUpOpen] = useRecoilState(popUpState);
  const pathname = usePathname();
  const router = useRouter();
  const copyLinkToClipBoard = () => {
    navigator.clipboard.writeText(
      `https://link-sharing-iota.vercel.app${pathname}`
    );
    setIsPopUpOpen({ togglePopUp: true });
  };
  return (
    <NavigationMenu.Root>
      <NavigationMenu.List className="bg-white sm:m-6 px-6 py-4 sm:rounded-xl flex justify-between gap-4 items-center relative z-[5]">
        <NavigationMenu.Item
          className="cursor-pointer"
          onClick={() => router.back()}
        >
          <NavigationMenu.Trigger className="flex px-7 border-[1px] text-purple border-purple bg-white hover:bg-lightPurple text-headingS py-[0.6875rem] rounded-lg">
            Back to Editor
          </NavigationMenu.Trigger>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger
            onClick={copyLinkToClipBoard}
            className="flex px-7 bg-purple text-white hover:bg-purpleHover cursor-pointer shadow-[0px_0px_32px_0px_rgba(99,_60,_255,_0.25)] w-full text-headingS justify-center py-[0.6875rem] rounded-lg"
          >
            Share Link
          </NavigationMenu.Trigger>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};
export default PreviewUserNavbar;
