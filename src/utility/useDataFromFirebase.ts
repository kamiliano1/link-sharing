import { auth, firestore } from "@/app/firebase/clientApp";
import { UserLink, userAccountState } from "@/atoms/userAccountAtom";
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

  const getUserData = async () => {
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
        }
        getSnippets();
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
  const getSnippets = async () => {
    try {
      const userLink = await getMySnippets(user?.uid!);
      setUserAccount((prev) => ({
        ...prev,
        userLink: userLink as UserLink[],
      }));
    } catch (error: any) {
      console.log("Error getting user snippets", error);
    }
  };
  return { getUserData };
};

export default useDataFromFirebase;
