"use client";
import CustomizeUserAccount from "@/layout/CustomizeUserAccount/CustomizeUserAccount";
import LinkPreview from "@/layout/LinkPreview/LinkPreview";
import Modal from "@/layout/Modal/Modal";
import Navbar from "@/layout/Navbar/Navbar";
import PopUp from "@/layout/PopUp/PopUp";
import useDataFromFirebase from "@/hooks/useDataFromFirebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/clientApp";
import { useState } from "react";

export default function ProfileDetails() {
  const { getCurrentUserData } = useDataFromFirebase();
  getCurrentUserData();
  const [user, loading] = useAuthState(auth);
  const [isPopUpOpen, setIsPopUpOpen] = useState<boolean>(false);
  return (
    <main>
      {!loading && <Modal />}
      <Navbar />
      <div className="lg:flex relative pb-5 lg:justify-center">
        <LinkPreview loading={loading} />
        <CustomizeUserAccount
          user={user}
          loading={loading}
          setIsPopUpOpen={setIsPopUpOpen}
        />
        <PopUp
          type="changesSuccessfullySaved"
          isPopUpOpen={isPopUpOpen}
          setIsPopUpOpen={setIsPopUpOpen}
        />
      </div>
    </main>
  );
}
