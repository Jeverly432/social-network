import App from "@app/App";
import { createBrowserRouter } from "react-router-dom";
import { Routes } from "./root.types";
import { HomePage, ExplorePage, CommunityPage, CommunityCreatePage, CommunitySettings, CommunityProfileEdit, CommunityPostPermissions } from "./root.lazy";

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
            element: <CommunityPage />
          },
          {
            path: ":slug/settings",
            element: <CommunitySettings />
          },
          {
            path: Routes.CommunityCreate,
            element: <CommunityCreatePage />
          },
          {
            path: ":slug/settings/profile-edit",
            element: <CommunityProfileEdit />
          },
          {
            path: ":slug/settings/post-permissions",
            element: <CommunityPostPermissions />
          },
          {
            path: ":slug/post/:id",
            element: <CommunityPostPermissions />
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