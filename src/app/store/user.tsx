"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../types/user";

export const UserContext = createContext<UserProviderResponse>(
  // @ts-ignore
  null
);

export interface UserProviderResponse {
  currentUser: User | null;
  setCurrentUser: any;
}

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const currentPersistedUser = localStorage.getItem("currentUser") as string;
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    if (currentPersistedUser) {
      setCurrentUser(JSON.parse(currentPersistedUser));
    }
  }, [currentPersistedUser]);

  const value: UserProviderResponse = {
    currentUser,
    setCurrentUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within `UserContext`");
  }
  return context;
};
