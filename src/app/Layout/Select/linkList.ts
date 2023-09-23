import { AiFillYoutube, AiOutlineCodepen } from "react-icons/ai";
import {
  BsFacebook,
  BsLinkedin,
  BsStackOverflow,
  BsTwitch,
} from "react-icons/bs";
import { FaDev, FaFreeCodeCamp, FaGitlab, FaTwitter } from "react-icons/fa";
import { PiGithubLogoFill } from "react-icons/pi";
import { SiCodewars, SiFrontendmentor, SiHashnode } from "react-icons/si";
import { ActiveLinksType } from "./ActiveLinksType";
export const linksList: ActiveLinksType[] = [
  {
    name: "GitHub",
    icon: PiGithubLogoFill,
    style: "bg-black text-white",
  },
  {
    name: "Frontend Mentor",
    icon: SiFrontendmentor,
    style: "bg-white text-black",
  },
  {
    name: "Twitter",
    icon: FaTwitter,
    style: "bg-[#43B7E9] text-white",
  },
  {
    name: "LinkedIn",
    icon: BsLinkedin,
    style: "bg-[#2D68FF] text-white",
  },
  {
    name: "YouTube",
    icon: AiFillYoutube,
    style: "bg-[#EE3939] text-white",
  },
  {
    name: "Facebook",
    icon: BsFacebook,
    style: "bg-[#2442AC] text-white",
  },
  {
    name: "Twitch",
    icon: BsTwitch,
    style: "bg-[#EE3FC8] text-white",
  },
  {
    name: "Dev.to",
    icon: FaDev,
    style: "bg-darkGrey text-white",
  },
  {
    name: "Codewars",
    icon: SiCodewars,
    style: "bg-[#8A1A50] text-white",
  },
  {
    name: "Codepen",
    icon: AiOutlineCodepen,
    style: "bg-[#8A1A50] text-white",
  },
  {
    name: "freeCodeCamp",
    icon: FaFreeCodeCamp,
    style: "bg-[#302267] text-white",
  },
  {
    name: "GitLab",
    icon: FaGitlab,
    style: "bg-[#EB4925] text-white",
  },
  {
    name: "Hashnode",
    icon: SiHashnode,
    style: "bg-[#0330D1] text-white",
  },
  {
    name: "Stack Overflow",
    icon: BsStackOverflow,
    style: "bg-[#EC7100] text-white",
  },
];
