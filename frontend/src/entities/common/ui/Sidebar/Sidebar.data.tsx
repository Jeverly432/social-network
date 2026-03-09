import { Routes } from "@app/routes/root.types";
import { Icons } from "@shared/assets";

export const data = [
  {
    title: "Profile",
    image: <></>,
    key: "profile",
    link: Routes.Profile,
  },
  {
    title: "News",
    image: <Icons.UI.NewsFeed />,
    key: "news",
    link: Routes.Home,
  },
  {
    title: "Explore",
    image: <Icons.UI.Explore />,
    key: "explore",
    link: Routes.Explore,
  },
]
