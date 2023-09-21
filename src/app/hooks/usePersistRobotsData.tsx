import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Robot } from "../types/robot";

export default function usePersistRobotsData(
  robots: Robot[],
  setRobots: Dispatch<SetStateAction<Robot[]>>
) {
  const [isLoadingRobots, setIsLoadingRobots] = useState<boolean>(true);

  useEffect(() => {
    const initialRobots = JSON.parse(localStorage.getItem("robots") as string);
    setRobots(initialRobots);
    setIsLoadingRobots(false);
  }, []);

  useEffect(() => {
    if (robots.length) {
      localStorage.setItem("robots", JSON.stringify(robots));
    }
  }, [robots]);

  return {
    isLoadingRobots,
  };
}
