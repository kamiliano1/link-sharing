import { UserAccountState } from "@/atoms/userAccountAtom";
import { linksList } from "@/layout/Select/linkList";

export const notUsePlatforms = (platform: UserAccountState) => {
  const allLinks = linksList.map((item) => item.name);
  const usedLinks = platform.userLink.map((item) => item.platform);
  const remainingLinks = allLinks.filter((item) => !usedLinks.includes(item));
  if (!remainingLinks.length)
    return [allLinks[Math.floor(Math.random() * allLinks.length)]];
  return remainingLinks;
};
