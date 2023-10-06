import { atom } from "recoil";
import { UserAccountState } from "./userAccountAtom";

const defaultPreviewUserLinkState: UserAccountState = {
  userLink: [],
};

export const previewUserLink = atom<UserAccountState>({
  key: "previewUserLink",
  default: defaultPreviewUserLinkState,
});
