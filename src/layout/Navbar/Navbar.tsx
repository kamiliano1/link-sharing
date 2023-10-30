import { auth } from "@/app/firebase/clientApp";
import { usePathname } from "next/navigation";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import CustomizeUserNavbar from "./CustomizeUserNavbar";
import PreviewUserNavbar from "./PreviewUserNavbar";
type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  const [user] = useAuthState(auth);
  const pathname = usePathname();

  return (
    <>
      {pathname === `/previewProfile/${user?.uid}` ? (
        <PreviewUserNavbar user={user} />
      ) : (
        <CustomizeUserNavbar user={user} />
      )}
    </>
  );
};
export default Navbar;
