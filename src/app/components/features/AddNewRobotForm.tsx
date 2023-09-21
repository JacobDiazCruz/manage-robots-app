import Modal from "../ui/Modal";

interface AddNewRobotFormProps {
  onClose: () => void;
}

export default function AddNewRobotForm({ onClose }: AddNewRobotFormProps) {
  return (
    <Modal onClose={onClose} className="w-[600px] h-[600px]">
      test
    </Modal>
  );
}
