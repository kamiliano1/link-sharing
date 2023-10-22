import { auth, firestore } from "@/app/firebase/clientApp";
import {
  UserAccountState,
  UserLink,
  userAccountState,
} from "@/atoms/userAccountAtom";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";

const useDataFromFirebase = () => {
  const [user] = useAuthState(auth);
  const [userAccount, setUserAccount] = useRecoilState(userAccountState);

  const getCurrentUserData = async () => {
    if (userAccount.isLoaded) return;
    try {
      if (user) {
        const userDataRef = doc(firestore, "users", user!.uid);
        const userData = await getDoc(userDataRef);
        const bookmarkData = userData.data();
        if (bookmarkData) {
          setUserAccount({
            firstName: bookmarkData.firstName,
            lastName: bookmarkData.lastName,
            email: bookmarkData.email,
            picture: bookmarkData.picture,
            userLink: bookmarkData.userLink,
            isLoaded: true,
          });
          getSnippets(user.uid, setUserAccount);
        }
      }
    } catch (error: any) {
      console.log("getBookmarkError", error.message);
    }
  };
  const getMySnippets = async (userId: string) => {
    const snippetQuery = query(
      collection(firestore, `users/${userId}/userLinks`),
      orderBy("order", "asc")
    );
    const snippetDocs = await getDocs(snippetQuery);
    return snippetDocs.docs.map((doc) => ({ ...doc.data() }));
  };
  const getSnippets = async (
    userId: string,
    setUserState: (
      valOrUpdater:
        | UserAccountState
        | ((currVal: UserAccountState) => UserAccountState)
    ) => void
  ) => {
    try {
      const userLink = await getMySnippets(userId);
      setUserState((prev) => ({
        ...prev,
        userLink: userLink as UserLink[],
      }));
    } catch (error: any) {
      console.log("Error getting user snippets", error);
    }
  };
  return { getCurrentUserData, getMySnippets, getSnippets };
};

export default useDataFromFirebase;
