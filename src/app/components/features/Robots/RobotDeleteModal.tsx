import Button from "../../ui/Button";
import Modal, { ModalHeader } from "../../ui/Modal";

interface RobotDeleteModalProps {
  onClose: () => void;
  handleDeleteRobot: () => void;
}

export default function RobotDeleteModal({
  onClose,
  handleDeleteRobot,
}: RobotDeleteModalProps) {
  return (
    <Modal onClose={onClose}>
      <ModalHeader>
        <p className="dark:text-white text-sm">
          Are you sure you want to delete this robot?
        </p>
        <div className="flex justify-between mt-5">
          <div className="flex gap-2 ml-auto">
            <Button variant="secondary" onClick={onClose}>
              No
            </Button>
            <Button onClick={handleDeleteRobot} variant="danger">
              Yes
            </Button>
          </div>
        </div>
      </ModalHeader>
    </Modal>
  );
}
