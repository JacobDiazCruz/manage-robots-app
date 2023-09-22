import { useState } from "react";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import TextField from "../ui/TextField";

interface LoginModalProps {
  onClose: () => void;
}

export default function LoginModal({ onClose }: LoginModalProps) {
  /**
   * Assuming that we will have additional textfields in the future,
   * it would be easier to scale if we store them in a configurable state rather than
   * modifying the fields directly in the codebase.
   */
  const [formFields, setFormFields] = useState([
    {
      name: "emailOrUsername",
      label: "Email or username",
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
          <h3 className="font-semibold text-xl">Register</h3>
          {formFields.map((field, index) => (
            <div key={index} className="my-5">
              <label className="text-neutral-500 dark:text-neutral-300">
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
            <Button size="large" className="w-full">
              Register now
            </Button>
          </div>
          <div className="mt-5">
            <p className="text-center text-neutral-600 text-sm">
              Have an account already? <b>Log in</b>
            </p>
          </div>
        </section>
      </div>
    </Modal>
  );
}