import { firestore, storage } from "@/app/firebase/clientApp";
import {
  UserAccountState,
  UserLink,
  userAccountState,
} from "@/atoms/userAccountAtom";
import { User } from "firebase/auth";
import { deleteDoc, doc, runTransaction, updateDoc } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import useDataFromFirebase from "./useDataFromFirebase";
import { useRecoilState } from "recoil";

type UpdateFirebaseType = {
  data: UserAccountState;
  user: User | null | undefined;
  setIsLoading: (value: React.SetStateAction<boolean>) => void;
  setIsPopUpOpen: (value: React.SetStateAction<boolean>) => void;
  setIsChangesSaved: (value: React.SetStateAction<boolean>) => void;
};

const useSaveDataToFirebase = () => {
  const [userAccount, setUserAccount] = useRecoilState(userAccountState);
  const { getMySnippets } = useDataFromFirebase();

  const deleteUserSnippets = async (
    id: string,
    user: User | null | undefined
  ) => {
    await deleteDoc(doc(firestore, `users/${user?.uid}/userLinks`, id));
  };
  const updateSnippet = async (
    userLink: UserLink,
    user: User | null | undefined
  ) => {
    const { platform, link, id, order } = userLink;
    try {
      await runTransaction(firestore, async (transaction) => {
        transaction.set(
          doc(firestore, `users/${user?.uid}/userLinks`, `${id}`),
          {
            platform,
            link,
            id,
            order,
          }
        );
      });
    } catch (error: any) {
      console.log("handleCreateLink error", error);
    }
  };

  const updateFirebase = async ({
    data,
    user,
    setIsLoading,
    setIsPopUpOpen,
    setIsChangesSaved,
  }: UpdateFirebaseType) => {
    setIsLoading(true);
    try {
      let orderedUserLink = data.userLink;
      orderedUserLink = orderedUserLink.map((item, order) => ({
        ...item,
        order: order,
      }));
      orderedUserLink.map((item) => updateSnippet(item, user));
      const userLink = await getMySnippets(user?.uid!);
      const snippetsToDelete = userLink.filter((item) => {
        return data.userLink.find((element) => element.id === item.id)
          ? false
          : true;
      });
      snippetsToDelete.map((item) => deleteUserSnippets(item.id, user));
      const userLinkRef = doc(firestore, `users/${user?.uid}`);
      await updateDoc(userLinkRef, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      });
      if (data.picture && data.isAvatarChanged) {
        const imageRef = ref(storage, `avatars/${user?.uid}/image`);
        await uploadString(imageRef, data.picture, "data_url");
        const downloadURL = await getDownloadURL(imageRef);
        data.isAvatarChanged;
        await updateDoc(userLinkRef, {
          picture: downloadURL,
        });
      }
      setIsPopUpOpen(true);
      setIsChangesSaved(true);
      setUserAccount((prev) => ({ ...prev, isAvatarChanged: false }));
    } catch (error: any) {
      console.log("handleSendingUserError", error.message);
    }
    setIsLoading(false);
  };

  return { updateFirebase };
};

export default useSaveDataToFirebase;
