import App from "@app/App";
import { createBrowserRouter } from "react-router-dom";
import { Routes } from "./root.types";
import { CommunityPage, LoginPage } from "./root.lazy";

export const routes = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: Routes.Home,
        element: <CommunityPage />
      },
      {
        path: Routes.Login,
        element: <LoginPage />
      }
    ]
  }
])