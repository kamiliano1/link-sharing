"use client";
import LinkPreview from "@/layout/LinkPreview/LinkPreview";
import Navbar from "@/layout/Navbar/Navbar";
import PopUp from "@/layout/PopUp/PopUp";
import PreviewUserProfile from "@/layout/PreviewUserProfile/PreviewUserProfile";
import React from "react";

type PreviewProfileProps = {};

const PreviewProfile: React.FC<PreviewProfileProps> = () => {
  return (
    <div className="relative min-h-[80vh]">
      <Navbar />
      <PreviewUserProfile />
      <PopUp type="copyLinktoClipBoard" />
    </div>
  );
};
export default PreviewProfile;
