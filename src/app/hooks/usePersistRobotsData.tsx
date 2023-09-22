import { useEffect, useState } from "react";
import { Robot } from "../types/robot";

export default function usePersistRobotsData() {
  const [robots, setRobots] = useState<Robot[]>([]);
  const [isLoadingRobots, setIsLoadingRobots] = useState<boolean>(true);

  useEffect(() => {
    const robotsFromLocalStorage = JSON.parse(
      localStorage.getItem("robots") as string
    );
    if (robotsFromLocalStorage) {
      setRobots(robotsFromLocalStorage);
      setIsLoadingRobots(false);
    }
  }, []);

  useEffect(() => {
    if (robots.length > 0) {
      localStorage.setItem("robots", JSON.stringify(robots));
    }
  }, [robots]);

  return {
    robots,
    setRobots,
    isLoadingRobots,
  };
}
