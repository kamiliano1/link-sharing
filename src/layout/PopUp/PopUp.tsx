import { IoMdSave } from "react-icons/io";
import { BsLink45Deg } from "react-icons/bs";
import * as Toast from "@radix-ui/react-toast";

import React, { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { useRecoilState } from "recoil";
import { popUpState } from "@/atoms/togglePopUpAtom";

type PopUpProps = {
  type: "copyLinktoClipBoard" | "changesSuccessfullySaved";
};

type PopUpDescriptionType = {
  description:
    | "The link has been copied to your clipboard!"
    | "Your changes have been successfully saved!";
  icon: IconType;
};

const PopUp: React.FC<PopUpProps> = ({ type }) => {
  const [isPopUpOpen, setIsPopUpOpen] = useRecoilState(popUpState);
  const [popUpDescription, setPopUpDescription] =
    useState<PopUpDescriptionType>({
      description: "Your changes have been successfully saved!",
      icon: IoMdSave,
    });
  useEffect(() => {
    type === "changesSuccessfullySaved"
      ? setPopUpDescription({
          description: "Your changes have been successfully saved!",
          icon: IoMdSave,
        })
      : setPopUpDescription({
          description: "The link has been copied to your clipboard!",
          icon: BsLink45Deg,
        });
  }, [type]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPopUpOpen({ togglePopUp: false });
    }, 4500);
    return () => clearTimeout(timer);
  }, [isPopUpOpen.togglePopUp, setIsPopUpOpen]);
  return (
    <>
      <Toast.Provider swipeDirection="left">
        <Toast.Root
          className="bg-darkGrey flex items-center text-white rounded-xl px-6 py-4 text-headingS w-[406px] data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
          open={isPopUpOpen.togglePopUp}
        >
          <Toast.Title>
            <popUpDescription.icon />
          </Toast.Title>
          <Toast.Description asChild>
            <p className="ml-2">{popUpDescription.description}</p>
          </Toast.Description>
        </Toast.Root>
        <Toast.Viewport
          className={`absolute bottom-[15px] flex flex-col w-[406px] m-0 list-none z-[2147483647] outline-none ${
            type === "changesSuccessfullySaved"
              ? "left-[calc(50%_-_290px)]"
              : "left-[calc(50%_-_203px)]"
          }`}
        />
      </Toast.Provider>
    </>
  );
};
export default PopUp;
