import Button from "../../ui/Button";
import Modal, { ModalHeader } from "../../ui/Modal";

interface DeleteConfirmationModalProps {
  onClose: () => void;
  handleDeleteRobot: () => void;
}

export default function DeleteConfirmationModal({
  onClose,
  handleDeleteRobot,
}: DeleteConfirmationModalProps) {
  return (
    <Modal onClose={onClose}>
      <ModalHeader>
        <p className="dark:text-white text-sm">
          Are you sure you want to delete this robot?
        </p>
        <div className="flex justify-between mt-5">
          <div className="flex gap-2 ml-auto">
            <Button variant="secondary">No</Button>
            <Button onClick={handleDeleteRobot} variant="danger">
              Yes
            </Button>
          </div>
        </div>
      </ModalHeader>
    </Modal>
  );
}
