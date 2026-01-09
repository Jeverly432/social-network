import App from "@app/App";
import { createBrowserRouter } from "react-router-dom";
import { Routes } from "./root.types";
import { CommunityPage, Explore } from "./root.lazy";

export const routes = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: Routes.Community,
        element: <CommunityPage />
      },
      {
        path: Routes.Explore,
        element: <Explore />
      }
    ]
  }
])