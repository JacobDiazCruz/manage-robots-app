import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import TextField from "../../ui/TextField";

interface LoginModalProps {
  onClose: () => void;
}

export default function LoginModal({ onClose }: LoginModalProps) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    alert(1);
  };

  return (
    <Modal onClose={onClose} className="w-[900px] h-[500px]">
      <div className="flex h-full">
        <section className="w-1/2 bg-neutral-100 h-full relative">
          <div className="flex items-center justify-center h-full">
            <h2 className="text-center font-semibold justify-center text-2xl">
              Welcome!
            </h2>
          </div>
        </section>
        <section className="w-1/2 p-7">
          <h3 className="font-semibold text-xl">Login</h3>
          <div className="my-5">
            <label className="text-neutral-500 dark:text-neutral-300">
              Username
            </label>
            <TextField
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="text-neutral-500 dark:text-neutral-300">
              Password
            </label>
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mt-5">
            <Button size="large" className="w-full" onClick={handleLogin}>
              Login now
            </Button>
          </div>
          <div className="mt-5">
            <p className="text-center text-neutral-600 text-sm">
              Don&apos;t have an account yet? <b>Register</b>
            </p>
          </div>
        </section>
      </div>
    </Modal>
  );
}
