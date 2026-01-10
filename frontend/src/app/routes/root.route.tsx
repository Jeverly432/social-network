import App from "@app/App";
import { createBrowserRouter } from "react-router-dom";
import { Routes } from "./root.types";
import { HomePage, ExplorePage, CommunityPage } from "./root.lazy";

export const routes = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: Routes.Home,
        element: <HomePage />
      },
      {
        path: Routes.Community,
        children: [
          {
            path: ":slug",
            element: <CommunityPage />,
          }
        ]
      },
      {
        path: Routes.Explore,
        element: <ExplorePage />
      }
    ]
  }
])