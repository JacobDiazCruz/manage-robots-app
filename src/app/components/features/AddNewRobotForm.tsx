import { useState } from "react";
import { Robot } from "../../types/robot";
import Button from "../ui/Button";
import Modal, { ModalContent, ModalFooter, ModalHeader } from "../ui/Modal";
import TextareaField from "../ui/TextareaField";
import TextField from "../ui/TextField";

interface AddNewRobotFormProps {
  onClose: () => void;
  handleSubmitForm: (_robot: Robot) => void;
}

export default function AddNewRobotForm({
  onClose,
  handleSubmitForm,
}: AddNewRobotFormProps) {
  const [name, setName] = useState<string>("");
  const [purpose, setPurpose] = useState<string>("");

  return (
    <Modal onClose={onClose} className="w-[600px] h-[500px]">
      <ModalHeader>
        <h1 className="font-semibold dark:text-white">Add New Robot</h1>
      </ModalHeader>
      <ModalContent>
        <div>
          <label className="dark:text-white">Name</label>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2"
          />
        </div>
        <div className="mt-5">
          <label className="dark:text-white">Purpose</label>
          <TextareaField
            value={purpose}
            className="mt-2"
            onChange={(e) => setPurpose(e.target.value)}
          />
        </div>
      </ModalContent>
      <ModalFooter>
        <Button
          onClick={() => {
            handleSubmitForm({ name, purpose });
          }}
          className="ml-auto"
        >
          Submit
        </Button>
      </ModalFooter>
    </Modal>
  );
}
