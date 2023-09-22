import Button from "../ui/Button";
import Modal, { ModalContent } from "../ui/Modal";

interface DeleteConfirmationModalProps {
  onClose: () => void;
}

export default function DeleteConfirmationModal({
  onClose,
}: DeleteConfirmationModalProps) {
  return (
    <Modal onClose={onClose}>
      <ModalContent>
        <p>Are you sure you want to delete this robot?</p>
        <div className="flex justify-between">
          <Button>No</Button>
          <Button>Yes</Button>
        </div>
      </ModalContent>
    </Modal>
  );
}
