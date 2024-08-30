// Layouts
import AnonymousLayout from "../layouts/AnonymousLayout";
import MainLayout from "../layouts/MainLayout";

// Pages
import Home from "@/pages/main/Home/Index";
import User from "@/pages/main/Users/User";
import Admin from "@/pages/main/Users/Admin";
import Login from "@/pages/auth/Login/Index";
import Posts from "@/pages/main/Posts/Index";
import CreatePosts from "@/pages/main/Posts/create-post/index";
import NewsLetter from "@/pages/main/NewsLetter/Index";
import Analytics from "@/pages/main/Analytics/Index";
import AuditLog from "@/pages/main/AuditLog/Index";
import Settings from "@/pages/main/Settings/Index";
import CreateUser from "@/pages/main/Users/CreateUser";
import CreateEditor from "@/pages/main/Users/CreateEditor";
import CreateOrganization from "@/pages/main/Users/CreateOrganization";
import UploadPicture from "@/pages/main/Users/UploadPicture";
import { renderRoutes } from "./generateRoutes";
import PostPreview from "@/pages/main/Posts/preview";
import PostDetailsPage from "@/pages/main/Posts/postid";
import Tickets from "@/pages/main/Support/Tickets";
import Editor from "@/pages/main/Users/Editor";
import Support from "@/pages/main/Support/Support";
import Guidelines from "@/pages/main/Support/Guidelines";
import FAQs from "@/pages/main/Support/FAQs";
import Helplines from "@/pages/main/Support/Helplines";
import EditHeader from "@/pages/main/Support/EditHeader";
import AddGuideline from "@/pages/main/Support/components/AddGuideline";
import AddFAQ from "@/pages/main/Support/components/AddFAQ";
import AddHelpline from "@/pages/main/Support/components/AddHelpline";
import UploadOrgPicture from "@/pages/main/Users/UploadOrgPicture";
import Categories from "@/pages/main/Categories/Index";
import { CategoryDetails } from "@/pages/main/Categories/CategoryDetails";
import Ticket from "@/pages/main/Support/components/Ticket";

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
            name: "Editors",
            title: "List of admin",
            hasSiderLink: true,
            component: Editor,
            path: "/editors",
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
            path: "/upload-user-picture/:id/:pathname",
          },
          {
            name: "Upload Organization Picture",
            title: "Upload Organization Picture",
            hasSiderLink: false,
            component: UploadOrgPicture,
            path: "/upload-org-picture/:orgId/:userId",
          },
        ],
      },
      {
        name: "Posts",
        title: "List of posts",
        hasSiderLink: true,
        routes: [
          {
            name: "Posts",
            title: "List of posts",
            hasSiderLink: true,
            component: Posts,
            path: "/posts",
          },
          {
            name: "Post details",
            title: "post details",
            hasSiderLink: true,
            component: PostDetailsPage,
            path: "/posts/:id",
          },
          {
            name: "Create Post",
            title: "Create Post",
            hasSiderLink: false,
            component: CreatePosts,
            path: "/posts/create-post",
          },
          {
            name: "",
            title: "Preview post",
            hasSiderLink: false,
            component: PostPreview,
            path: "/posts/:postId/:previewId",
          },
        ],
      },
      {
        name: "Categires",
        title: "Categories",
        component: Categories,
        path: "/categories",
      },
      {
        name: "Categires Details",
        title: "Categories",
        component: CategoryDetails,
        path: "/categories-details",
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
      {
        name: "Support",
        title: "Support page",
        component: Support,
        path: "/support",
        hasSiderLink: true,
        routes: [
          {
            name: "Support",
            title: "Guidelines",
            hasSiderLink: true,
            component: Guidelines,
            path: "/support/a-guide-to-womenhub",
          },
          {
            name: "Support",
            title: "FAQs",
            hasSiderLink: true,
            component: FAQs,
            path: "/support/FAQs",
          },
          {
            name: "Support",
            title: "Helplines",
            hasSiderLink: false,
            component: Helplines,
            path: "/support/helplines",
          },
          {
            name: "Support",
            title: "View All Tickets",
            hasSiderLink: false,
            component: Tickets,
            path: "/support/tickets",
          },
          {
            name: "Create Guideline",
            title: "Create Guideline",
            hasSiderLink: false,
            component: AddGuideline,
            path: "/support/create-guideline",
          },
          {
            name: "Create FAQ",
            title: "Create FAQ",
            hasSiderLink: false,
            component: AddFAQ,
            path: "/support/create-FAQ",
          },
          {
            name: "Create Helpline",
            title: "Create Helpline",
            hasSiderLink: false,
            component: AddHelpline,
            path: "/support/create-helpline",
          },

          {
            name: "Edit Header",
            title: "EDit Header",
            hasSiderLink: false,
            component: EditHeader,
            path: "/support/editHeader",
          },
          {
            name: "Ticket",
            title: "Ticket",
            hasSiderLink: false,
            component: Ticket,
            path: "/support/ticket",
          },
        ],
      },
    ],
  },
];
export const Routes = renderRoutes(routess);
