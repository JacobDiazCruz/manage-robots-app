import Modal, { ModalContent } from "../ui/Modal";
import TextField from "../ui/TextField";

interface AddNewRobotFormProps {
  onClose: () => void;
}

export default function AddNewRobotForm({ onClose }: AddNewRobotFormProps) {
  return (
    <Modal onClose={onClose} className="w-[600px] h-[600px]">
      <ModalContent>
        <TextField />
      </ModalContent>
    </Modal>
  );
}
