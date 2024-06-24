// Layouts
import AnonymousLayout from "../layouts/AnonymousLayout";
import MainLayout from "../layouts/MainLayout";

// Pages
import Home from "@/pages/main/Home/Index";
import User from "@/pages/main/Users/User";
import Admin from "@/pages/main/Users/Admin";
import Login from "@/pages/auth/Login/Index";
import Posts from "@/pages/main/Analytics/Index";
import NewsLetter from "@/pages/main/NewsLetter/Index";
import Analytics from "@/pages/main/Analytics/Index";
import AuditLog from "@/pages/main/AuditLog/Index";
import Settings from "@/pages/main/Settings/Index";
import CreateUser from "@/pages/main/Users/CreateUser";
import CreateEditor from "@/pages/main/Users/CreateEditor";
import CreateOrganization from "@/pages/main/Users/CreateOrganization";
import UploadPicture from "@/pages/main/Users/UploadPicture";
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
            name: "Users",
            title: "List of users",
            hasSiderLink: true,
            component: User,
            path: "/users",
          },
          {
            name: "Administrators",
            title: "List of admin",
            hasSiderLink: true,
            component: Admin,
            path: "/administrators",
          },
          {
            name: "Create User",
            title: "Create User",
            hasSiderLink: false,
            component: CreateUser,
            path: "/create-user",
          },
          {
            name: "Create Editor",
            title: "Create Editor",
            hasSiderLink: false,
            component: CreateEditor,
            path: "/create-editor",
          },
          {
            name: "Create Organization",
            title: "Create Organization",
            hasSiderLink: false,
            component: CreateOrganization,
            path: "/create-organization",
          },
          {
            name: "Upload User Picture",
            title: "Upload User Picture",
            hasSiderLink: false,
            component: UploadPicture,
            path: "/upload-user-picture/:id",
          },
        ],
      },
      {
        name: "Posts",
        title: "List of posts",
        component: Posts,
        path: "/posts",
      },
      {
        name: "News Letter",
        title: "News Letter",
        component: NewsLetter,
        path: "/news-letter",
      },
      {
        name: "Analytics",
        title: "Analytics",
        component: Analytics,
        path: "/analytics",
      },
      {
        name: "Audit Log",
        title: "Audit Log",
        component: AuditLog,
        path: "/audit-log",
      },
      {
        name: "Settings",
        title: "Settings",
        component: Settings,
        path: "/settings",
      },
    ],
  },
];
export const Routes = renderRoutes(routess);
