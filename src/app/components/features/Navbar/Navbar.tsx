"use client";

import { useUser } from "@/src/app/store/User";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { RiArrowDropDownFill } from "react-icons/ri";
import useDarkTheme from "../../../hooks/useDarkTheme";
import Button from "../../ui/Button";
import Switch from "../../ui/Switch";
import NavbarLoginModal from "./NavbarLoginModal";
import NavbarRegisterModal from "./NavbarRegisterModal";
import UserDropdown from "./NavbarUserDropdown";

export default function Navbar() {
  const { darkTheme, handleToggleDarkTheme } = useDarkTheme();
  const { currentUser } = useUser();

  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);
  const [showUserDropdown, setShowUserDropdown] = useState<boolean>(false);

  return (
    <>
      <nav className="pb-10 flex">
        <div className="ml-auto flex items-center gap-2">
          {!currentUser ? (
            <>
              <Button
                variant="secondary"
                onClick={() => setShowLoginModal(true)}
              >
                Login
              </Button>
              <Button
                variant="tertiary"
                onClick={() => setShowRegisterModal(true)}
              >
                Register
              </Button>
            </>
          ) : (
            <section className="relative">
              <button
                className="flex items-center cursor-pointer"
                onClick={() => setShowUserDropdown(true)}
              >
                <FaUserCircle className="text-neutral-500 dark:text-neutral-100 w-8 h-8" />
                <label className="ml-2 text-neutral-500 dark:text-neutral-200 text-sm cursor-pointer">
                  {currentUser?.username}
                </label>
                <RiArrowDropDownFill className="w-6 h-6 dark:text-neutral-50" />
              </button>
              {showUserDropdown && (
                <UserDropdown onClose={() => setShowUserDropdown(false)} />
              )}
            </section>
          )}
          <section className="ml-auto">
            <Switch value={darkTheme} handleClick={handleToggleDarkTheme} />
          </section>
        </div>
      </nav>

      {showLoginModal && (
        <NavbarLoginModal
          onClose={() => setShowLoginModal(false)}
          openRegister={() => {
            setShowLoginModal(false);
            setShowRegisterModal(true);
          }}
        />
      )}

      {showRegisterModal && (
        <NavbarRegisterModal
          onClose={() => setShowRegisterModal(false)}
          openLogin={() => {
            setShowRegisterModal(false);
            setShowLoginModal(true);
          }}
        />
      )}
    </>
  );
}
