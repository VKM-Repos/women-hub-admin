// Layouts
import AnonymousLayout from "../layouts/AnonymousLayout";
import MainLayout from "../layouts/MainLayout";

// Pages
import Home from "@/pages/main/Home/Index";
import User from "@/pages/main/Users/User";
import Login from "@/pages/auth/Login/Index";
import { renderRoutes } from "./generateRoutes";

export const routess = [
  {
    layout: AnonymousLayout,
    routes: [
      {
        name: "login",
        title: "Login page",
        component: Login,
        path: "/login",
      },
    ],
  },
  {
    layout: MainLayout,
    routes: [
      {
        name: "home",
        title: "Home page",
        component: Home,
        path: "/home",
      },
      {
        name: "users",
        title: "Users",
        hasSiderLink: true,
        routes: [
          {
            name: "users",
            title: "List of users",
            hasSiderLink: true,
            component: User,
            path: "/users",
          },
        ],
      },
    ],
  },
];
export const Routes = renderRoutes(routess);
