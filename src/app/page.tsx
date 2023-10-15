"use client";
import CustomizeUserLinks from "@/layout/CustomizeUserLinks/CustomizeUserLinks";
import LinkPreview from "@/layout/LinkPreview/LinkPreview";
import Modal from "@/layout/Modal/Modal";
import Navbar from "@/layout/Navbar/Navbar";
import PopUp from "@/layout/PopUp/PopUp";

export default function Home() {
  return (
    <main className="min-h-[100vh]">
      <Modal />
      <Navbar />
      <div className="lg:flex relative pb-5 lg:justify-center">
        <LinkPreview />
        <CustomizeUserLinks />
        <PopUp type="changesSuccessfullySaved" />
      </div>
    </main>
  );
}
