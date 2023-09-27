import { IconType } from "react-icons";
export type PlatfromsType =
  | "GitHub"
  | "Frontend Mentor"
  | "Twitter"
  | "LinkedIn"
  | "YouTube"
  | "Facebook"
  | "Twitch"
  | "Dev.to"
  | "Codewars"
  | "Codepen"
  | "freeCodeCamp"
  | "GitLab"
  | "Hashnode"
  | "Stack Overflow";
export type ActiveLinksType = {
  name: PlatfromsType;
  icon: IconType;
  style?: string;
  placeholder: string;
};
