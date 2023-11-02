"use client";
import CustomizeUserLinks from "@/layout/CustomizeUserLinks/CustomizeUserLinks";
import LinkPreview from "@/layout/LinkPreview/LinkPreview";
import Modal from "@/layout/Modal/Modal";
import Navbar from "@/layout/Navbar/Navbar";
import PopUp from "@/layout/PopUp/PopUp";
import useDataFromFirebase from "@/utility/useDataFromFirebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/clientApp";

export default function Home() {
  const { getCurrentUserData } = useDataFromFirebase();
  getCurrentUserData();
  const [user, loading] = useAuthState(auth);
  return (
    <main className="min-h-[100vh]">
      {!loading && <Modal />}
      <Navbar />
      <div className="lg:flex relative pb-5 lg:justify-center">
        <LinkPreview loading={loading} />
        <CustomizeUserLinks user={user} loading={loading} />
        <PopUp type="changesSuccessfullySaved" />
      </div>
    </main>
  );
}
