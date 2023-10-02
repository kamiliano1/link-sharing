import NextLink from "next/link";
import React from "react";
import Button from "../Button/Button";
import Image from "next/image";
import logoSmall from "../../../../public/icons/logo-devlinks-small.svg";
import logoBig from "../../../../public/icons/logo-devlinks-large.svg";
import { AiOutlineLink, AiOutlineEye } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  const pathname = usePathname();

  return (
    <>
      <div className="py-4 sm:py-10 pl-6 pr-4 sm:pl-12 sm:pr-10 flex items-center justify-between self-stretch">
        <Link href="/home">
          <Image src={logoSmall} className="sm:hidden" alt="web logo" />
          <Image src={logoBig} className="hidden sm:block" alt="web logo" />
        </Link>
        <div className="flex gap-[3.375rem]">
          <Link
            href="/home"
            className={`flex items-center hover:text-purple  ${
              pathname === "/home" ? "text-purple" : "text-grey"
            } `}
          >
            <AiOutlineLink />
            <p className="ml-2 hidden sm:block">Links</p>
          </Link>

          <Link
            href="/profileDetails"
            className={`flex items-center hover:text-purple ${
              pathname === "/profileDetails" ? "text-purple" : "text-grey"
            } `}
          >
            <RxAvatar />
            <p className="ml-2 hidden sm:block">Profile Details</p>
          </Link>
        </div>

        <Link
          href="/previewProfile"
          className="border-[1px] border-purple rounded-lg text-purple px-4 sm:px-[1.6875rem] py-[0.6875rem]"
        >
          <AiOutlineEye className="sm:hidden text-purple" />
          <p className="hidden sm:block">Preview</p>
        </Link>
      </div>

      <NavigationMenu.Root>
        <NavigationMenu.List>
          <div className="py-4 sm:py-10 pl-6 pr-4 sm:pl-12 sm:pr-10 flex items-center justify-between self-stretch">
            <NavigationMenu.Item>
              <Link href="/home">
                <Image src={logoSmall} className="sm:hidden" alt="web logo" />
                <Image
                  src={logoBig}
                  className="hidden sm:block"
                  alt="web logo"
                />
              </Link>
            </NavigationMenu.Item>
            <div className="flex gap-[3.375rem]">
              {" "}
              <NavigationMenu.Item>
                <Link
                  href="/home"
                  className={`flex items-center hover:text-purple  ${
                    pathname === "/home" ? "text-purple" : "text-grey"
                  } `}
                >
                  <AiOutlineLink />
                  <p className="ml-2 hidden sm:block">Links</p>
                </Link>
              </NavigationMenu.Item>{" "}
              <NavigationMenu.Item>
                <Link
                  href="/profileDetails"
                  className={`flex items-center hover:text-purple ${
                    pathname === "/profileDetails" ? "text-purple" : "text-grey"
                  } `}
                >
                  <RxAvatar />
                  <p className="ml-2 hidden sm:block">Profile Details</p>
                </Link>{" "}
              </NavigationMenu.Item>
            </div>
            <NavigationMenu.Item>
              <Link
                href="/previewProfile"
                className="border-[1px] border-purple rounded-lg text-purple
             px-4 sm:px-[1.6875rem] py-[0.6875rem]"
              >
                <AiOutlineEye className="sm:hidden text-purple" />
                <p className="hidden sm:block">Preview</p>
              </Link>
            </NavigationMenu.Item>
          </div>
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </>
  );
};
export default Navbar;
