import { useUser } from "@/src/app/store/User";
import { User } from "@/src/app/types/user";
import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import TextField from "../../ui/TextField";

interface NavbarLoginModalProps {
  onClose: () => void;
  openRegister: () => void;
}

export default function NavbarLoginModal({
  onClose,
  openRegister,
}: NavbarLoginModalProps) {
  const users = JSON.parse(localStorage.getItem("users") as string);
  const { handleAddCurrentUser } = useUser();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoginError, setIsLoginError] = useState<boolean>(false);

  const handleLoginNow = () => {
    const user = users?.find((user: User) => {
      if (user.username === username && user.password === password) {
        return user;
      }
    });

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      handleAddCurrentUser(user);
      onClose();
    }
    setIsLoginError(true);
  };

  return (
    <Modal onClose={onClose} className="w-11/12 md:w-[900px] h-[500px]">
      <div className="flex h-full">
        <section className="hidden md:block w-1/2 bg-neutral-100 dark:bg-neutral-700 h-full relative">
          <div className="flex items-center justify-center h-full">
            <h2 className="text-center dark:text-neutral-100 font-semibold justify-center text-2xl">
              Welcome!
            </h2>
          </div>
        </section>
        <section className="w-full md:w-1/2 p-7">
          <h3 className="font-semibold dark:text-neutral-100 text-xl">Login</h3>
          <div className="my-5">
            <label className="text-neutral-500 dark:text-neutral-300 text-sm">
              Username
            </label>
            <TextField
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="text-neutral-500 dark:text-neutral-300 text-sm">
              Password
            </label>
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </div>
          <div className="mt-5">
            <p className="text-red-500 mb-2">
              {isLoginError && "Invalid username or password."}
            </p>
            <Button size="large" className="w-full" onClick={handleLoginNow}>
              Login now
            </Button>
          </div>
          <div className="mt-5">
            <p className="text-center text-neutral-600 dark:text-neutral-200 text-sm">
              Don&apos;t have an account yet?{" "}
              <b onClick={openRegister} className="cursor-pointer">
                Register now
              </b>
            </p>
          </div>
        </section>
      </div>
    </Modal>
  );
}
