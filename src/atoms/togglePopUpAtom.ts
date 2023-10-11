import { atom } from "recoil";

export type PopUpState = {
  togglePopUp: boolean;
};

const defaultPopUpState: PopUpState = {
  togglePopUp: false,
};

export const popUpState = atom<PopUpState>({
  key: "popUpState",
  default: defaultPopUpState,
});
