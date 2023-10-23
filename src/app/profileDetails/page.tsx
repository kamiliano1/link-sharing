"use client";
import CustomizeUserAccount from "@/layout/CustomizeUserAccount/CustomizeUserAccount";
import LinkPreview from "@/layout/LinkPreview/LinkPreview";
import Navbar from "@/layout/Navbar/Navbar";
import PopUp from "@/layout/PopUp/PopUp";
import useDataFromFirebase from "@/utility/useDataFromFirebase";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/clientApp";
import Modal from "@/layout/Modal/Modal";

export default function ProfileDetails() {
  const { getCurrentUserData } = useDataFromFirebase();
  getCurrentUserData();
  const [user, loading] = useAuthState(auth);
  const [load, setLoad] = useState(false);
  return (
    <main className="min-h-[100vh]">
      <button onClick={() => setLoad((prev) => !prev)}>Zmiana</button>
      {!loading && <Modal />}
      <Navbar />
      <div className="lg:flex relative pb-5 lg:justify-center">
        <LinkPreview loading={load} />
        <CustomizeUserAccount user={user} loading={load} />
        <PopUp type="changesSuccessfullySaved" />
      </div>
    </main>
  );
}
