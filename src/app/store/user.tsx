import { createContext, ReactNode, useContext, useState } from "react";
import { User } from "../types/user";

export const UserContext = createContext(null);

interface UserProviderResponse {
  currentUser: User | null;
}

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const value: any = {
    currentUser,
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
