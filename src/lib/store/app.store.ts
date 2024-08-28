import { User } from "lucide-react";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type User = {
  userId: number;
  email: string;
  name: string;
  organization: string;
  refreshToken: string;
  role: string;
  token: string;
  bio: string;
};
interface UserState {
  user: User;
  loggedIn: boolean | string;
  login: (user: User, loggedIn: boolean) => void;
  logout: () => void;
}

const useAppStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: {
          userId: 0,
          email: "",
          name: "",
          organization: "",
          refreshToken: "",
          role: "",
          token: "",
          bio: "",
        },
        loggedIn: false,
        login: (user: User, loggedIn: boolean) =>
          set(() => ({ user, loggedIn })),
        logout: () =>
          set(() => ({
            user: {
              userId: 0,
              email: "",
              name: "",
              organization: "",
              refreshToken: "",
              role: "",
              token: "",
              bio: "",
            },
            loggedIn: false,
          })),
      }),
      { name: "useAppStore" }
    )
  )
);

export default useAppStore;
