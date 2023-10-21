import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineEye, AiOutlineLink } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import logoBig from "../../../public/icons/logo-devlinks-large.svg";
import logoSmall from "../../../public/icons/logo-devlinks-small.svg";
import { auth } from "@/app/firebase/clientApp";
import { signOut } from "firebase/auth";

type NavbarProps = {};
const Navbar: React.FC<NavbarProps> = () => {
  const [user] = useAuthState(auth);
  const pathname = usePathname();
  const logout = () => {
    signOut(auth);
  };
  const urlToCopy = location.href;
  return (
    <NavigationMenu.Root>
      <NavigationMenu.List>
        {pathname === `/previewProfile/${user?.uid}` ? (
          <div className="bg-white sm:m-6 px-6 py-4 sm:rounded-xl flex justify-between gap-4 items-center self-stretch relative z-[5]">
            <NavigationMenu.Item className="w-full max-w-[159px]">
              <NavigationMenu.Trigger className="w-full border-[1px] text-purple border-purple bg-white enabled:hover:bg-lightPurple disabled:opacity-25 text-headingS flex justify-center py-[0.6875rem] rounded-lg">
                <Link href="/profileDetails" className="">
                  Back to Editor
                </Link>
              </NavigationMenu.Trigger>
            </NavigationMenu.Item>
            <NavigationMenu.Item className="w-full max-w-[159px]">
              <NavigationMenu.Trigger
                onClick={() => {
                  navigator.clipboard.writeText(urlToCopy);
                }}
                className="bg-purple text-white enabled:hover:bg-purpleHover disabled:opacity-25 shadow-[0px_0px_32px_0px_rgba(99,_60,_255,_0.25)] w-full text-headingS flex justify-center py-[0.6875rem] rounded-lg"
              >
                Share Link
              </NavigationMenu.Trigger>
            </NavigationMenu.Item>
          </div>
        ) : (
          <div className="py-4 pl-6 pr-4 sm:m-6 sm:rounded-xl bg-white flex items-center justify-between">
            <NavigationMenu.Item>
              <NavigationMenu.Trigger>
                <Link href="/">
                  <Image src={logoSmall} className="sm:hidden" alt="web logo" />
                  <Image
                    src={logoBig}
                    className="hidden sm:block sm:mt-2"
                    alt="web logo"
                  />
                </Link>
              </NavigationMenu.Trigger>
            </NavigationMenu.Item>
            <div className="flex">
              {" "}
              <NavigationMenu.Item>
                <NavigationMenu.Trigger>
                  <Link
                    href="/"
                    className={`flex items-center hover:text-purple py-3 px-7 rounded-lg  ${
                      pathname === "/"
                        ? "flex items-center bg-lightPurple text-purple "
                        : "text-grey"
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
                    className={`flex items-center hover:text-purple py-3 px-7 rounded-lg ${
                      pathname === "/profileDetails"
                        ? "flex items-center bg-lightPurple text-purple "
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
              <NavigationMenu.Trigger className="">
                <Link
                  href={`/previewProfile/${user?.uid}`}
                  className="text-purple border-[1px] px-4 py-3 border-purple bg-white hover:bg-lightPurple w-full text-headingS flex justify-center rounded-lg"
                >
                  <AiOutlineEye className="sm:hidden" />
                  <p className="hidden sm:block">Preview</p>
                </Link>
              </NavigationMenu.Trigger>
            </NavigationMenu.Item>
          </div>
        )}
        <button
          className="z-[999999] p-5 bg-darkGrey text-white"
          onClick={logout}
        >
          Logout
        </button>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};
export default Navbar;
