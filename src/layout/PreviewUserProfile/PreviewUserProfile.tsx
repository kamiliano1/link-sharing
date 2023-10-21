import { firestore } from "@/app/firebase/clientApp";
import { UserAccountState } from "@/atoms/userAccountAtom";
import useDataFromFirebase from "@/utility/useDataFromFirebase";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import PreviewLink from "../Select/PreviewLink";

type PreviewUserProfileProps = { userId: string };

const PreviewUserProfile: React.FC<PreviewUserProfileProps> = ({ userId }) => {
  const { getSnippets } = useDataFromFirebase();
  const [previewAccount, setPreviewAccount] = useState<UserAccountState>({
    userLink: [],
    isLoaded: false,
  });
  const [isUserExist, setIsUserExist] = useState<boolean>(false);
  useEffect(() => {
    const getUserData = async () => {
      if (previewAccount.isLoaded) return;
      try {
        if (userId) {
          const userDataRef = doc(firestore, "users", userId);
          const userData = await getDoc(userDataRef);
          const bookmarkData = userData.data();
          if (bookmarkData) {
            setPreviewAccount({
              firstName: bookmarkData.firstName,
              lastName: bookmarkData.lastName,
              email: bookmarkData.email,
              picture: bookmarkData.picture,
              userLink: bookmarkData.userLink,
              isLoaded: true,
            });
            getSnippets(userId, setPreviewAccount);
            setIsUserExist(true);
            return;
          }
        }
      } catch (error: any) {
        console.log("getBookmarkError", error.message);
      }
    };
    getUserData();
  }, [getSnippets, previewAccount.isLoaded, userId]);
  return (
    <>
      <div className="sm:mt-28 flex flex-col items-center bg-white sm:w-[349px] mx-auto sm:rounded-3xl px-14 py-12 h-full sm:min-h-[569px] shadow-[0px_0px_32px_0px_rgba(0,_0,_0,_0.10)] sm:z-[5] sm:relative">
        {previewAccount.picture ? (
          <Image
            width={96}
            height={96}
            src={previewAccount.picture}
            alt="user Avatar"
            className="aspect-square rounded-full w-[96px] border-[4px] border-purple mb-[1.35rem]"
          />
        ) : (
          <div className="w-[96px] aspect-square mb-[1.35rem]"></div>
        )}
        <h2
          className={`text-headingM capitalize w-[250px] truncate text-center  ${
            previewAccount.firstName && "bg-white"
          } `}
        >
          {previewAccount.firstName} {previewAccount.lastName}
        </h2>
        {!isUserExist && (
          <p className="text-headingS mb-[50px] w-[250px] truncate text-center">
            User does not exist
          </p>
        )}
        <p
          className={`text-headingS mb-[50px] w-[250px] truncate text-center ${
            previewAccount.email && "bg-white"
          }`}
        >
          {previewAccount.email}
        </p>
        <div className="max-h-[305px] overflow-y-auto scrollbar">
          {previewAccount.userLink?.map((item) => (
            <PreviewLink
              id={item.id}
              key={item.id}
              platform={item.platform}
              link={item.link}
            />
          ))}
        </div>
      </div>
      <div className="hidden sm:block absolute bg-purple rounded-b-[2rem] -top-6 left-0 w-full h-[357px]"></div>
    </>
  );
};
export default PreviewUserProfile;
