"use client";

import Navbar from "./components/features/Navbar";
import Robots from "./components/features/Robots";
import { UserProvider } from "./store/User";

export default function Homepage() {
  return (
    <main
      id="homepage"
      className="bg-neutral-50 dark:bg-neutral-900 min-h-[100vh]"
    >
      <div className="w-full md:w-[600px] px-4 md:px-0  mx-auto pt-7">
        <UserProvider>
          <Navbar />
          <Robots />
        </UserProvider>
      </div>
    </main>
  );
}
