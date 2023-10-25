"use client";
import { auth } from "@/app/firebase/clientApp";
import Navbar from "@/layout/Navbar/Navbar";
import PopUp from "@/layout/PopUp/PopUp";
import PreviewUserProfile from "@/layout/PreviewUserProfile/PreviewUserProfile";
import { useParams } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

export default function PreviewProfile() {
  const [user] = useAuthState(auth);
  const params = useParams();
  const userId = params.userId as string;

  const isActivatedUserPreview = user?.uid === userId;
  return (
    <main className="relative h-[100vh] sm:h-auto bg-white sm:bg-lightGrey">
      {isActivatedUserPreview && <Navbar />}
      <PreviewUserProfile
        userId={userId}
        isActivatedUserPreview={isActivatedUserPreview}
      />
      <PopUp type="copyLinkToClipBoard" />
    </main>
  );
}
