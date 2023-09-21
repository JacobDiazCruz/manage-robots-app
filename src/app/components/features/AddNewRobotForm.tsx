import { useState } from "react";
import Modal, { ModalContent } from "../ui/Modal";
import TextareaField from "../ui/TextareaField";
import TextField from "../ui/TextField";

interface AddNewRobotFormProps {
  onClose: () => void;
}

export default function AddNewRobotForm({ onClose }: AddNewRobotFormProps) {
  const [name, setName] = useState<string>("");
  const [purpose, setPurpose] = useState<string>("");

  return (
    <Modal onClose={onClose} className="w-[600px] h-[600px]">
      <ModalContent>
        <TextField value={name} onChange={(e) => setName(e.target.value)} />
        <TextareaField
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
        />
      </ModalContent>
    </Modal>
  );
}
