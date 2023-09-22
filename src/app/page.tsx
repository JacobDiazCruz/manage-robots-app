"use client";

import { useState } from "react";
import LoginModal from "./components/features/LoginModal";

import RegisterModal from "./components/features/RegisterModal";
import RobotsList from "./components/features/RobotsList";
import Button from "./components/ui/Button";
import Switch from "./components/ui/Switch";
import useDarkTheme from "./hooks/useDarkTheme";

export default function Homepage() {
  const { darkTheme, handleToggleDarkTheme } = useDarkTheme();

  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);

  return (
    <main
      id="homepage"
      className="bg-neutral-50 dark:bg-neutral-900 min-h-[100vh]"
    >
      <div className="w-[800px] mx-auto pt-7">
        <nav className="pb-10 flex">
          <div className="ml-auto flex items-center gap-2">
            <Button variant="secondary" onClick={() => setShowLoginModal(true)}>
              Login
            </Button>
            <Button
              variant="tertiary"
              onClick={() => setShowRegisterModal(true)}
            >
              Register
            </Button>
            <div className="ml-auto">
              <Switch value={darkTheme} handleClick={handleToggleDarkTheme} />
            </div>
          </div>
        </nav>

        <RobotsList />
      </div>

      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}

      {showRegisterModal && (
        <RegisterModal onClose={() => setShowRegisterModal(false)} />
      )}
    </main>
  );
}
