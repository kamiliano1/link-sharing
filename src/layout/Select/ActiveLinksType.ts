import { IconType } from "react-icons";
export type PlatformsType =
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
  name: PlatformsType;
  icon: IconType;
  style?: string;
  placeholder?: string;
  validatePattern?: string[];
};
