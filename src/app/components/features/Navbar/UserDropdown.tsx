import { useOutsideClick } from "@/src/app/hooks/useOutsideClick";

interface UserDropdownProps {
  onClose: () => void;
  emptyCurrentUser: () => void;
}

export default function UserDropdown({
  onClose,
  emptyCurrentUser,
}: UserDropdownProps) {
  const userDropdownRef = useOutsideClick(onClose);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    onClose();
    emptyCurrentUser();
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
