import { auth } from "@/app/firebase/clientApp";
import { usePathname } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import CustomizeUserNavbar from "./CustomizeUserNavbar";
import PreviewUserNavbar from "./PreviewUserNavbar";
type NavbarProps = { setIsPopUpOpen?: Dispatch<SetStateAction<boolean>> };

const Navbar: React.FC<NavbarProps> = ({ setIsPopUpOpen }) => {
  const [user] = useAuthState(auth);
  const pathname = usePathname();

  return (
    <>
      {pathname === `/previewProfile/${user?.uid}` ? (
        <PreviewUserNavbar setIsPopUpOpen={setIsPopUpOpen!} />
      ) : (
        <CustomizeUserNavbar user={user} />
      )}
    </>
  );
};
export default Navbar;
