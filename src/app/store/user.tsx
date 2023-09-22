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

interface UserProviderResponse {
  currentUser: User | null;
  handleEmptyCurrentUser: () => void;
  handleAddCurrentUser: (user: User) => void;
}

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const currentPersistedUser =
    typeof window !== "undefined"
      ? window.localStorage.getItem("currentUser")
      : "";

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleAddCurrentUser = (user: User) => {
    setCurrentUser(user);
  };

  const handleEmptyCurrentUser = () => {
    setCurrentUser(null);
  };

  useEffect(() => {
    if (currentPersistedUser) {
      setCurrentUser(JSON.parse(currentPersistedUser));
    }
  }, [currentPersistedUser]);

  const value: UserProviderResponse = {
    currentUser,
    handleEmptyCurrentUser,
    handleAddCurrentUser,
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
