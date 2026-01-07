import App from "@app/App";
import { createBrowserRouter } from "react-router-dom";
import { Routes } from "./root.types";
import { HomePage, LoginPage } from "./root.lazy";

export const routes = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: Routes.Home,
        element: <HomePage />
      },
      {
        path: Routes.Login,
        element: <LoginPage />
      }
    ]
  }
])