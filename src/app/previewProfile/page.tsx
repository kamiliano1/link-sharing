"use client";
import LinkPreview from "@/layout/LinkPreview/LinkPreview";
import Navbar from "@/layout/Navbar/Navbar";
import PreviewUserProfile from "@/layout/PreviewUserProfile/PreviewUserProfile";
import React from "react";

type PreviewProfileProps = {};

const PreviewProfile: React.FC<PreviewProfileProps> = () => {
  return (
    <div>
      <Navbar />
      <PreviewUserProfile />
    </div>
  );
};
export default PreviewProfile;
