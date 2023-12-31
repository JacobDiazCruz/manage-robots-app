import Image from "next/image";
import { Robot } from "../../../types/robot";
import Modal, { ModalContent } from "../../ui/Modal";

interface RobotDetailsModalProps {
  onClose: () => void;
  robot: Robot;
}

export default function RobotDetailsModal({
  onClose,
  robot,
}: RobotDetailsModalProps) {
  return (
    <Modal onClose={onClose} className="w-[400px]">
      <div className="absolute -m-8">
        <Image src={robot.avatar} alt="" width={80} height={80} />
      </div>
      <ModalContent>
        <div className="py-5">
          <h4 className="font-semibold text-lg dark:text-white">
            {robot.name}
          </h4>
          <p className="font-light text-md dark:text-neutral-100 mt-1">
            {robot.purpose}
          </p>
        </div>
      </ModalContent>
    </Modal>
  );
}
