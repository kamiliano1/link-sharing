import React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Image from "next/image";
import Link from "next/link";
import logoBig from "../../../public/icons/logo-devlinks-large.svg";
import logoSmall from "../../../public/icons/logo-devlinks-small.svg";
import { AiOutlineEye, AiOutlineLink } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { usePathname } from "next/navigation";
import { User } from "firebase/auth";

type CustomizeUserNavbarProps = { user: User | null | undefined };

const CustomizeUserNavbar: React.FC<CustomizeUserNavbarProps> = ({ user }) => {
  const pathname = usePathname();
  return (
    <NavigationMenu.Root className="py-4 pl-6 pr-4 sm:m-6 sm:mb-0 sm:rounded-xl bg-white items-center justify-between">
      <NavigationMenu.List className="flex items-center">
        <NavigationMenu.Item className="mr-auto">
          <Link href="/" passHref legacyBehavior>
            <NavigationMenu.Link>
              <Image src={logoSmall} className="sm:hidden" alt="web logo" />
              <Image
                src={logoBig}
                className="hidden sm:block sm:mt-2"
                alt="web logo"
              />
            </NavigationMenu.Link>
          </Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <Link href="/" passHref legacyBehavior>
            <NavigationMenu.Link
              className={`flex items-center hover:text-purple py-3 px-7 rounded-lg ${
                pathname === "/"
                  ? "flex items-center bg-lightPurple text-purple "
                  : "text-grey"
              } `}
            >
              <AiOutlineLink className="text-[1.2rem]" />
              <p className="ml-2 font-[600] hidden sm:block">Links</p>
            </NavigationMenu.Link>
          </Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <Link href="/profileDetails" passHref legacyBehavior>
            <NavigationMenu.Link
              className={`flex items-center hover:text-purple py-3 px-7 rounded-lg ${
                pathname === "/profileDetails"
                  ? "flex items-center bg-lightPurple text-purple "
                  : "text-grey"
              } `}
            >
              <RxAvatar className="text-[1.2rem]" />
              <p className="ml-2 font-[600] hidden sm:block">Profile Details</p>
            </NavigationMenu.Link>
          </Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item className="ml-auto">
          <Link href={`/previewProfile/${user?.uid}`} passHref legacyBehavior>
            <NavigationMenu.Link className="text-purple border-[1px] px-4 py-3 border-purple bg-white hover:bg-lightPurple w-full text-headingS flex justify-center rounded-lg">
              <AiOutlineEye className="sm:hidden" />
              <p className="hidden sm:block">Preview</p>
            </NavigationMenu.Link>
          </Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};
export default CustomizeUserNavbar;
