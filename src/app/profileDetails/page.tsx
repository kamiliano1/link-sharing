"use client";
import CustomizeUserAccount from "@/layout/CustomizeUserAccount/CustomizeUserAccount";
import LinkPreview from "@/layout/LinkPreview/LinkPreview";
import Navbar from "@/layout/Navbar/Navbar";
import PopUp from "@/layout/PopUp/PopUp";
import useDataFromFirebase from "@/utility/useDataFromFirebase";
import React from "react";

const ProfileDetails: React.FC = () => {
  const { getCurrentUserData } = useDataFromFirebase();
  getCurrentUserData();
  return (
    <main className="min-h-[100vh]">
      <Navbar />
      <div className="lg:flex relative pb-5 lg:justify-center">
        <LinkPreview />
        <CustomizeUserAccount />
        <PopUp type="changesSuccessfullySaved" />
      </div>
    </main>
  );
};
export default ProfileDetails;
