import Image, { StaticImageData } from "next/image";
import { v1 as uuidv1 } from "uuid";
import Charlie from "../../../../../public/charlie.png";

import { useEffect, useState } from "react";
import { Robot, SubmitRobotFormParams } from "../../../types/robot";
import Button from "../../ui/Button";
import Modal, { ModalContent, ModalHeader } from "../../ui/Modal";
import TextareaField from "../../ui/TextareaField";
import TextField from "../../ui/TextField";
import SelectAvatar from "./SelectAvatar";

interface RobotFormProps {
  onClose: () => void;
  handleSubmitForm: ({}: SubmitRobotFormParams) => void;
  robots: Robot[];
  currentEditedRobotId: string;
}

export default function RobotForm({
  onClose,
  handleSubmitForm,
  robots,
  currentEditedRobotId,
}: RobotFormProps) {
  const [name, setName] = useState<string>("");
  const [purpose, setPurpose] = useState<string>("");
  const [avatar, setAvatar] = useState<StaticImageData>(Charlie);

  const [isAvatarsOpen, setIsAvatarsOpen] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");

  const handleToggleAvatarsDropdown = () => {
    setIsAvatarsOpen((prev) => !prev);
  };

  const isSubmitDisabled = !avatar || !name || !purpose;
  const formType = currentEditedRobotId ? "EDIT" : "ADD";

  /**
   * Set existing robot data if edit action is invoked.
   */
  useEffect(() => {
    const editedRobot = robots.find(
      (robot) => robot.id === currentEditedRobotId
    ) as Robot;

    if (editedRobot) {
      setName(editedRobot?.name);
      setPurpose(editedRobot?.purpose);
      setAvatar(editedRobot?.avatar);
    }
  }, []);

  /**
   * This function is used for both adding a new robot
   * and editing an existing one.
   */
  const invokeHandleSubmitForm = () => {
    const isValid = handleValidateExistingName();
    if (!isValid) return false;

    handleSubmitForm({
      data: {
        id: uuidv1(),
        avatar,
        name,
        purpose,
      },
      formType,
    });
  };

  const handleValidateExistingName = () => {
    const robotFound = robots?.find((robot) => robot.name === name);
    if (robotFound) {
      setSubmitError("Robot name already exist.");
      return false;
    }
    return true;
  };

  return (
    <Modal onClose={onClose} className="w-[600px] h-[550px]">
      <ModalHeader>
        <h1 className="font-semibold dark:text-white">
          {formType === "ADD" ? "Add New Robot" : "Edit Robot"}
        </h1>
      </ModalHeader>
      <ModalContent>
        <section>
          <div className="flex gap-2 items-center">
            <div className="rounded-full border dark:border-neutral-700">
              <Image src={avatar} alt="" width={80} height={80} />
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
        </section>
        <section className="mt-5">
          <label className="dark:text-white text-sm">
            Name<span className="text-red-500">*</span>
          </label>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2"
          />
          <p className="text-red-500 text-sm my-2">{submitError}</p>
        </section>
        <section className="mt-5">
          <label className="dark:text-white text-sm">
            Purpose<span className="text-red-500">*</span>
          </label>
          <TextareaField
            value={purpose}
            className="mt-2"
            onChange={(e) => setPurpose(e.target.value)}
          />
        </section>
        <section className="flex py-5">
          <Button
            onClick={invokeHandleSubmitForm}
            className="ml-auto"
            disabled={isSubmitDisabled}
          >
            Submit
          </Button>
        </section>
      </ModalContent>
    </Modal>
  );
}
