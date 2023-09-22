import { useOutsideClick } from "@/src/app/hooks/useOutsideClick";
import { useUser } from "@/src/app/store/User";

interface NavbarUserDropdownProps {
  onClose: () => void;
}

export default function NavbarUserDropdown({
  onClose,
}: NavbarUserDropdownProps) {
  const userDropdownRef = useOutsideClick(onClose);
  const { handleEmptyCurrentUser } = useUser();

  const handleLogout = () => {
    handleEmptyCurrentUser();
    localStorage.removeItem("currentUser");
    onClose();
  };

  return (
    <div
      ref={userDropdownRef}
      className="absolute bg-white dark:bg-neutral-700 shadow-md border dark:border-neutral-700 w-[fit h-fit rounded-lg"
    >
      <ul>
        <li className="py-2 px-3 cursor-pointer hover:bg-neutral-100 hover:dark:bg-neutral-600">
          <p
            className="dark:text-neutral-100 text-neutral-700"
            onClick={() => handleLogout()}
          >
            Logout
          </p>
        </li>
      </ul>
    </div>
  );
}
