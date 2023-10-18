import { auth, firestore } from "@/app/firebase/clientApp";
import { UserLink, userAccountState } from "@/atoms/userAccountAtom";
import {
  collection,
  doc,
  getDoc,
  limit,
  onSnapshot,
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
      }
    } catch (error: any) {
      console.log("getBookmarkError", error.message);
    }
    const userLinksRef = collection(firestore, `users/${user?.uid}/userLinks`);
    const q = query(userLinksRef, orderBy("order"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      // let userData: UserLink[];
      snapshot.forEach((userSnapshot) => {
        console.log(userSnapshot.data());
        // userData = [...userData, userSnapshot.data()];
      });
      //   console.log(userData);
      //   setUserAccount((prev) => ({ ...prev, userLink: userData }));
    });
  };

  return { getUserData };
};

export default useDataFromFirebase;
