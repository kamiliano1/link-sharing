import { PlatfromsType } from "@/layout/Select/ActiveLinksType";
import { atom } from "recoil";

export type UserAccountState = {
  firstName?: string;
  lastName?: string;
  email?: string;
  picture?: string;
  userLink: {
    platform: PlatfromsType;
    link: string;
    id: string;
  }[];
};

const defaultUserAccountState: UserAccountState = {
  firstName: "",
  lastName: "",
  email: "",
  picture: "",
  userLink: [],
};

export const userAccountState = atom<UserAccountState>({
  key: "userAccountState",
  default: defaultUserAccountState,
});
