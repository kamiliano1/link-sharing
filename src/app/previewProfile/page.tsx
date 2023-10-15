"use client";
import LinkPreview from "@/layout/LinkPreview/LinkPreview";
import Navbar from "@/layout/Navbar/Navbar";
import PopUp from "@/layout/PopUp/PopUp";
import PreviewUserProfile from "@/layout/PreviewUserProfile/PreviewUserProfile";
import React from "react";

type PreviewProfileProps = {};

const PreviewProfile: React.FC<PreviewProfileProps> = () => {
  return (
    <main className="relative h-[100vh] sm:h-auto bg-white sm:bg-lightGrey">
      <Navbar />
      <PreviewUserProfile />
      <PopUp type="copyLinktoClipBoard" />
    </main>
  );
};
export default PreviewProfile;
