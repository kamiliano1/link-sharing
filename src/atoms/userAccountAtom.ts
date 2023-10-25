import { PlatformsType } from "@/layout/Select/ActiveLinksType";
import { atom } from "recoil";

export type UserLink = {
  platform: PlatformsType;
  link: string;
  id: string;
  order: number;
};

export type UserAccountState = {
  firstName?: string;
  lastName?: string;
  email?: string;
  picture?: string;
  userLink: UserLink[];
  isLoaded: boolean;
};

const defaultUserAccountState: UserAccountState = {
  firstName: "",
  lastName: "",
  email: "",
  picture: "",
  userLink: [],
  isLoaded: false,
};

export const userAccountState = atom<UserAccountState>({
  key: "userAccountState",
  default: defaultUserAccountState,
});
