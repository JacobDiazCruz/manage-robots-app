"use client";

import { useState } from "react";
import useDarkTheme from "../../../hooks/useDarkTheme";
import Button from "../../ui/Button";
import Switch from "../../ui/Switch";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

export default function Navbar() {
  const { darkTheme, handleToggleDarkTheme } = useDarkTheme();

  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);

  return (
    <>
      <nav className="pb-10 flex">
        <div className="ml-auto flex items-center gap-2">
          <Button variant="secondary" onClick={() => setShowLoginModal(true)}>
            Login
          </Button>
          <Button variant="tertiary" onClick={() => setShowRegisterModal(true)}>
            Register
          </Button>
          <div className="ml-auto">
            <Switch value={darkTheme} handleClick={handleToggleDarkTheme} />
          </div>
        </div>
      </nav>
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}

      {showRegisterModal && (
        <RegisterModal onClose={() => setShowRegisterModal(false)} />
      )}
    </>
  );
}
