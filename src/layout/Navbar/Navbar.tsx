import NextLink from "next/link";
import React from "react";
import Button from "../Button/Button";
import Image from "next/image";
import logoSmall from "../../../public/icons/logo-devlinks-small.svg";
import logoBig from "../../../public/icons/logo-devlinks-large.svg";
import { AiOutlineLink, AiOutlineEye } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  const pathname = usePathname();

  return (
    <NavigationMenu.Root>
      <NavigationMenu.List>
        {pathname === "/previewProfile" ? (
          <div className="bg-white sm:m-6 px-6 py-4 sm:rounded-xl flex justify-between gap-4 items-center self-stretch">
            <NavigationMenu.Item className="w-full max-w-[159px]">
              <NavigationMenu.Trigger className="w-full">
                <Link href="/profileDetails">
                  <Button role="secondary" className="text-purple ">
                    Back to Editor
                  </Button>
                </Link>
              </NavigationMenu.Trigger>
            </NavigationMenu.Item>
            <NavigationMenu.Item className="w-full max-w-[159px]">
              <NavigationMenu.Trigger className="w-full">
                <div className="w-full max-w-[159px]">
                  <Button role="primary" className="">
                    Share Link
                  </Button>
                </div>
              </NavigationMenu.Trigger>
            </NavigationMenu.Item>
          </div>
        ) : (
          <div className="py-4 sm:py-10 pl-6 pr-4 sm:pl-12 sm:pr-10 flex items-center justify-between self-stretch">
            <NavigationMenu.Item>
              <NavigationMenu.Trigger>
                <Link href="/">
                  <Image src={logoSmall} className="sm:hidden" alt="web logo" />
                  <Image
                    src={logoBig}
                    className="hidden sm:block"
                    alt="web logo"
                  />
                </Link>
              </NavigationMenu.Trigger>
            </NavigationMenu.Item>
            <div className="flex gap-[3.375rem]">
              {" "}
              <NavigationMenu.Item>
                <NavigationMenu.Trigger>
                  <Link
                    href="/"
                    className={`flex items-center hover:text-purple  ${
                      pathname === "/" ? "text-purple" : "text-grey"
                    } `}
                  >
                    <AiOutlineLink />
                    <p className="ml-2 hidden sm:block">Links</p>
                  </Link>
                </NavigationMenu.Trigger>
              </NavigationMenu.Item>{" "}
              <NavigationMenu.Item>
                <NavigationMenu.Trigger>
                  <Link
                    href="/profileDetails"
                    className={`flex items-center hover:text-purple ${
                      pathname === "/profileDetails"
                        ? "text-purple"
                        : "text-grey"
                    } `}
                  >
                    <RxAvatar />
                    <p className="ml-2 hidden sm:block">Profile Details</p>
                  </Link>{" "}
                </NavigationMenu.Trigger>
              </NavigationMenu.Item>
            </div>
            <NavigationMenu.Item>
              <NavigationMenu.Trigger
                className="border-[1px] border-purple rounded-lg text-purple
                  px-4 sm:px-[1.6875rem] py-[0.6875rem] flex"
              >
                <Link href="/previewProfile">
                  <AiOutlineEye className="sm:hidden text-purple" />
                  <p className="hidden sm:block">Preview</p>
                </Link>
              </NavigationMenu.Trigger>
            </NavigationMenu.Item>
          </div>
        )}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};
export default Navbar;
