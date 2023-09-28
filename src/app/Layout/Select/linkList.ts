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
    placeholder: "e.g. https://www.github.com/johnappleseed",
    validatePattern: [
      "https://www.github.com/",
      "www.github.com/",
      "github.com/",
    ],
  },
  {
    name: "Frontend Mentor",
    icon: SiFrontendmentor,
    style: "bg-white text-black",
    placeholder: "e.g. https://www.frontendmentor.io/profile/johnappleseed",
  },
  {
    name: "Twitter",
    icon: FaTwitter,
    style: "bg-[#43B7E9] text-white",
    placeholder: "e.g. https://twitter.com/johnappleseed",
  },
  {
    name: "LinkedIn",
    icon: BsLinkedin,
    style: "bg-[#2D68FF] text-white",
    placeholder: "e.g. https://www.linkedin.com/in/johnappleseed",
  },
  {
    name: "YouTube",
    icon: AiFillYoutube,
    style: "bg-[#EE3939] text-white",
    placeholder: "e.g. https://www.youtube.com/@johnappleseed",
  },
  {
    name: "Facebook",
    icon: BsFacebook,
    style: "bg-[#2442AC] text-white",
    placeholder: "e.g. https://www.facebook.com/johnappleseed/",
  },
  {
    name: "Twitch",
    icon: BsTwitch,
    style: "bg-[#EE3FC8] text-white",
    placeholder: "e.g. https://www.twitch.tv/johnappleseed",
  },
  {
    name: "Dev.to",
    icon: FaDev,
    style: "bg-darkGrey text-white",
    placeholder: "e.g. https://dev.to/johnappleseed",
  },
  {
    name: "Codewars",
    icon: SiCodewars,
    style: "bg-[#8A1A50] text-white",
    placeholder: "e.g. https://www.codewars.com/users/johnappleseed",
  },
  {
    name: "Codepen",
    icon: AiOutlineCodepen,
    style: "bg-[#8A1A50] text-white",
    placeholder: "e.g. https://codepen.io/johnappleseed",
  },
  {
    name: "freeCodeCamp",
    icon: FaFreeCodeCamp,
    style: "bg-[#302267] text-white",
    placeholder: "e.g. https://www.freecodecamp.org/johnappleseed",
  },
  {
    name: "GitLab",
    icon: FaGitlab,
    style: "bg-[#EB4925] text-white",
    placeholder: "e.g. https://gitlab.com/johnappleseed",
  },
  {
    name: "Hashnode",
    icon: SiHashnode,
    style: "bg-[#0330D1] text-white",
    placeholder: "e.g. https://hashnode.com/@johnappleseed",
  },
  {
    name: "Stack Overflow",
    icon: BsStackOverflow,
    style: "bg-[#EC7100] text-white",
    placeholder:
      "e.g. https://stackoverflow.com/users/1234/kelly-johnappleseed",
  },
];
