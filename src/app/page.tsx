"use client";
import CustomizeUserLinks from "@/layout/CustomizeUserLinks/CustomizeUserLinks";
import LinkPreview from "@/layout/LinkPreview/LinkPreview";
import Navbar from "@/layout/Navbar/Navbar";
import PopUp from "@/layout/PopUp/PopUp";

export default function Home() {
  return (
    <main className="min-h-[100vh]">
      <Navbar />
      <div className="lg:flex lg:justify-evenly lg:items-center gap-5  relative pb-5">
        <LinkPreview />
        <CustomizeUserLinks />
        <PopUp type="changesSuccessfullySaved" />
      </div>
    </main>
  );
}
