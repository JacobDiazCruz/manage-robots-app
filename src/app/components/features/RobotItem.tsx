import Image from "next/image";
import IconButton from "../ui/IconButton";

import { BiTrash } from "react-icons/bi";
import { FiEdit2 } from "react-icons/fi";
import { Robot } from "../../types/robot";

interface RobotItemProps {
  robot: Robot;
  handleRemoveRobot: (_robotId: string) => void;
  handleEditRobot: (_robotId: string) => void;
}

export default function RobotItem({
  robot,
  handleRemoveRobot,
  handleEditRobot,
}: RobotItemProps) {
  return (
    <li className="w-full border dark:border-neutral-700 dark:bg-neutral-800 rounded-xl p-2 my-3">
      <div className="flex gap-2 items-center">
        <Image src={robot.avatar} alt="avatar" width={80} height={80} />
        <div className="w-1/2">
          <h4 className="truncate dark:text-white font-semibold">
            {robot.name}
          </h4>
          <p className="text-neutral-500 text-sm dark:text-neutral-200 line-clamp-2 font-light">
            {robot.purpose}
          </p>
        </div>
        <div className="flex ml-auto gap-1">
          <IconButton onClick={() => handleRemoveRobot(robot.id)}>
            <BiTrash className="w-5 h-5 text-neutral-400" />
          </IconButton>
          <IconButton onClick={() => handleEditRobot(robot.id)}>
            <FiEdit2 className="w-5 h-5 text-neutral-400" />
          </IconButton>
        </div>
      </div>
    </li>
  );
}
