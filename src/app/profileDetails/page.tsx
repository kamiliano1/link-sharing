"use client";
import CustomizeUserAccount from "@/layout/CustomizeUserAccount/CustomizeUserAccount";
import LinkPreview from "@/layout/LinkPreview/LinkPreview";
import Navbar from "@/layout/Navbar/Navbar";
import PopUp from "@/layout/PopUp/PopUp";
import React from "react";

const ProfileDetails: React.FC = () => {
  return (
    <main className="min-h-[100vh]">
      <Navbar />
      <div className="lg:flex lg:justify-evenly lg:items-center gap-5  relative pb-5">
        <LinkPreview />
        <CustomizeUserAccount />
        <PopUp type="changesSuccessfullySaved" />
      </div>
    </main>
  );
};
export default ProfileDetails;
