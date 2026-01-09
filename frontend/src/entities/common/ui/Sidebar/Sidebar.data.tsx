import { Routes } from "@app/routes/root.types";
import { Explore, NewsFeed } from "@shared/assets";

export const data = [
  {
    title: "Newsfeed",
    image: <NewsFeed />,
    key: "news",
    link: Routes.Community,
  },
  {
    title: "Explore",
    image: <Explore />,
    key: "explore",
    link: Routes.Explore,
  },
]