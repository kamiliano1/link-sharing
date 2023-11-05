import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import LoginModal from "./LoginModal";
import { UserCredType } from "./userCredType";
import RegisterModal from "./RegisterModal";
import logoBig from "../../../public/icons/logo-devlinks-large.svg";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/clientApp";

export type ModalStatusType = "login" | "register";
const Modal: React.FC = () => {
  const [user] = useAuthState(auth);
  const [modalStatus, setModalStatus] = useState<ModalStatusType>("login");
  const [userCred, setUserCred] = useState<UserCredType>({
    email: "",
    currentPassword: "",
    repeatPassword: "",
  });
  return (
    <>
      <Dialog.Root open={user ? false : true}>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-white sm:bg-lightGrey fixed inset-0 z-[150]" />
          <Dialog.Content
            aria-label="login-modal"
            className={`data-[state=open]:animate-overlayShow fixed top-0 sm:top-[50%] left-[50%] max-w-[476px] w-[100vw] translate-x-[-50%] sm:translate-y-[-50%] rounded-md focus:outline-none bg-white z-[500]`}
          >
            <div className="bg-white mt-8 ml-8 sm:mt-0 sm:ml-0 sm:bg-lightGrey w-full ">
              <Image
                src={logoBig}
                className="mb-8 sm:mx-auto pb-[2.22rem]"
                alt="logo"
              />
            </div>
            <div className="p-8 sm:p-10 sm:pt-0">
              {modalStatus === "login" ? (
                <LoginModal
                  userCred={userCred}
                  setUserCred={setUserCred}
                  setModalStatus={setModalStatus}
                />
              ) : (
                <RegisterModal
                  userCred={userCred}
                  setUserCred={setUserCred}
                  setModalStatus={setModalStatus}
                />
              )}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};
export default Modal;
