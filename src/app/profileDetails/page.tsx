"use client";
import CustomizeUserAccount from "@/layout/CustomizeUserAccount/CustomizeUserAccount";
import LinkPreview from "@/layout/LinkPreview/LinkPreview";
import Navbar from "@/layout/Navbar/Navbar";
import PopUp from "@/layout/PopUp/PopUp";
import React, { useEffect, useState } from "react";
import { IoMdSave } from "react-icons/io";

const ProfileDetails: React.FC = () => {
  const [clikaj, setClikaj] = useState<boolean>(true);

  useEffect(() => {
    const popUpTimer = setTimeout(() => {
      setClikaj(false);
    }, 5000);
    return () => clearTimeout(popUpTimer);
  }, [clikaj]);
  return (
    <main className="min-h-[100vh]">
      <Navbar />
      <PopUp />
      <div className="lg:flex lg:justify-evenly lg:items-center gap-5 bg-purpleHover relative pb-5">
        <LinkPreview />
        <CustomizeUserAccount />
        <button
          className="bg-red p-5"
          onClick={() => {
            setClikaj((prev) => !prev);
          }}
        >
          ACTIVe
        </button>
        <div
          className={`bg-darkGrey flex items-center text-white rounded-xl px-6 py-4 text-headingS w-[406px] absolute bottom-[20px] z-[200] ${
            clikaj
              ? "animate-popUpOpen"
              : "translate-y-[2000px] animate-popUpClose"
          }
        
        `}
        >
          <IoMdSave />
          <p className="ml-2">Your changes have been successfully saved!</p>
        </div>
      </div>
    </main>
  );
};
export default ProfileDetails;
