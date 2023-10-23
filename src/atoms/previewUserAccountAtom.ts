import { atom } from "recoil";
import { UserAccountState } from "./userAccountAtom";

const defaultPreviewUserAccountState: UserAccountState = {
  firstName: "",
  lastName: "",
  email: "",
  picture: "",
  userLink: [],
  isLoaded: false,
};

export const previewUserAccountState = atom<UserAccountState>({
  key: "previewUserAccountState",
  default: defaultPreviewUserAccountState,
});
