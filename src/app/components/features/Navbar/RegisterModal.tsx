import { useState } from "react";
import { v1 as uuidv1 } from "uuid";
import { User } from "../../../types/user";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import TextField from "../../ui/TextField";

interface RegisterModalProps {
  onClose: () => void;
  openLogin: () => void;
}

interface FormField {
  name: string;
  label: string;
  type: "text" | "password";
  value: string;
}

export default function RegisterModal({
  onClose,
  openLogin,
}: RegisterModalProps) {
  /**
   * Assuming that we will have additional textfields in the future,
   * it would be easier to scale if we store them in a configurable state rather than
   * modifying the fields directly in the codebase.
   */
  const [formFields, setFormFields] = useState<FormField[]>([
    {
      name: "username",
      label: "Username",
      type: "text",
      value: "",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      value: "",
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      value: "",
    },
  ]);
  const [isPasswordError, setIsPasswordError] = useState<boolean>(false);

  const handleFieldUpdate = (fieldName: string, newValue: string) => {
    setFormFields((prev) => {
      const formFieldsCopy = [...prev];
      const newFields = formFieldsCopy.map((field) => {
        if (field.name === fieldName) {
          return {
            ...field,
            value: newValue,
          };
        }
        return field;
      });
      return newFields;
    });
  };

  /**
   * Continue to register user if password and confirm password matched.
   */
  const handleRegisterNow = () => {
    const password = formFields.find((field) => field.name === "password")
      ?.value;
    const confirmPassword = formFields.find(
      (field) => field.name === "confirmPassword"
    )?.value;

    if (password !== confirmPassword) {
      setIsPasswordError(true);
      return;
    }

    const newUser = {} as User;
    formFields.forEach((field) => {
      if (field.name !== "confirmPassword") {
        newUser["id"] = uuidv1();
        newUser[field.name] = field.value;
      }
    });
    localStorage.setItem("users", JSON.stringify([newUser]));
    openLogin();
  };

  return (
    <Modal onClose={onClose} className="w-[900px] h-[500px]">
      <div className="flex h-full">
        <section className="w-1/2 bg-neutral-100 dark:bg-neutral-700 h-full relative">
          <div className="flex items-center justify-center h-full">
            <h2 className="text-center font-semibold dark:text-neutral-100 justify-center text-2xl">
              Welcome!
            </h2>
          </div>
        </section>
        <section className="w-1/2 p-7">
          <h3 className="font-semibold dark:text-neutral-100 text-xl">
            Register
          </h3>
          {formFields.map((field, index) => (
            <div key={index} className="my-5">
              <label className="text-neutral-500 dark:text-neutral-300 text-sm">
                {field.label}
              </label>
              <TextField
                value={field.value}
                type={field.type}
                onChange={(e) => handleFieldUpdate(field.name, e.target.value)}
              />
            </div>
          ))}
          <div className="mt-5">
            <p className="text-red-500 mb-2">
              {isPasswordError &&
                "Password and confirm password did not match."}
            </p>
            <Button size="large" className="w-full" onClick={handleRegisterNow}>
              Register now
            </Button>
          </div>
          <div className="mt-5">
            <p className="text-center text-neutral-600 text-sm dark:text-neutral-200">
              Have an account already?{" "}
              <b onClick={openLogin} className="cursor-pointer">
                Log in
              </b>
            </p>
          </div>
        </section>
      </div>
    </Modal>
  );
}