import Image, { StaticImageData } from "next/image";
import Baby from "../../../../public/baby.png";

import { useState } from "react";
import { Robot } from "../../types/robot";
import Button from "../ui/Button";
import Modal, { ModalContent, ModalFooter, ModalHeader } from "../ui/Modal";
import TextareaField from "../ui/TextareaField";
import TextField from "../ui/TextField";
import SelectAvatar from "./SelectAvatar";
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
  const [avatar, setAvatar] = useState<StaticImageData>(Baby);

  const [isAvatarsOpen, setIsAvatarsOpen] = useState<boolean>(false);

  const handleToggleAvatarsDropdown = () => {
    setIsAvatarsOpen((prev) => !prev);
  };

  return (
    <Modal onClose={onClose} className="w-[600px] h-[500px]">
      <ModalHeader>
        <h1 className="font-semibold dark:text-white">Add New Robot</h1>
      </ModalHeader>
      <ModalContent>
        <div>
          <div className="flex gap-2 items-center">
            <div className="rounded-full border dark:border-neutral-700">
              <Image src={Baby} alt="" width={80} height={80} />
            </div>
            <Button
              variant="secondary"
              size="small"
              onClick={handleToggleAvatarsDropdown}
            >
              Select avatar
            </Button>
          </div>
          <div className="relative overflow-hidden">
            {isAvatarsOpen && (
              <SelectAvatar
                handleToggleAvatarsDropdown={handleToggleAvatarsDropdown}
                onChange={(newAvatar) => setAvatar(newAvatar)}
              />
            )}
          </div>
        </div>
        <div className="mt-5">
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
            handleSubmitForm({ avatar, name, purpose });
          }}
          className="ml-auto"
        >
          Submit
        </Button>
      </ModalFooter>
    </Modal>
  );
}
