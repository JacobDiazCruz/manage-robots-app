import { Dispatch, SetStateAction } from "react";
import { Robot } from "../types/robot";

export default function useDeleteRobot() {
  const handleDeleteRobot = (
    robotId: string,
    setRobots: Dispatch<SetStateAction<Robot[]>>
  ) => {
    setRobots((prev) => {
      const robotsCopy = [...prev];
      const filteredRobots = robotsCopy.filter(
        (robotCopy) => robotCopy.id !== robotId
      );
      localStorage.setItem("robots", JSON.stringify(filteredRobots));
      return filteredRobots;
    });
  };

  return {
    handleDeleteRobot,
  };
}
