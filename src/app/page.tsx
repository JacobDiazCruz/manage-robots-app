"use client";

import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

import EmptyList from "./components/features/EmptyList";
import RobotForm from "./components/features/RobotForm";
import RobotItem from "./components/features/RobotItem";
import Button from "./components/ui/Button";
import Switch from "./components/ui/Switch";
import useDarkTheme from "./hooks/useDarkTheme";
import usePersistRobotsData from "./hooks/usePersistRobotsData";
import { Robot } from "./types/robot";

export default function Homepage() {
  const { darkTheme, handleToggleDarkTheme } = useDarkTheme();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentEditedRobotId, setCurrentEditedRobotId] = useState<string>("");

  const { robots, setRobots, isLoadingRobots } = usePersistRobotsData();

  const handleToggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleSubmitForm = ({ data, submitType }: any) => {
    if (submitType === "ADD") {
      setRobots((prev) => {
        const robotsCopy = [...prev];
        robotsCopy.push(data);
        return robotsCopy;
      });
    }
    setRobots((prev) => {
      const robotsCopy = [...prev];
      const newRobotsCopy = robotsCopy.map((robot) => {
        if (robot.id === currentEditedRobotId) {
          return {
            ...robot,
            avatar: data.avatar,
            name: data.name,
            purpose: data.purpose,
          };
        }
        return robot;
      });
      return newRobotsCopy;
    });
    setCurrentEditedRobotId("");
    handleToggleModal();
  };

  const handleRemoveRobot = (robotId: string) => {
    setRobots((prev) => {
      const robotsCopy = [...prev];
      const filteredRobots = robotsCopy.filter(
        (robotCopy) => robotCopy.id !== robotId
      );
      return filteredRobots;
    });
  };

  const handleEditRobot = (robotId: string) => {
    setCurrentEditedRobotId(robotId);
    setIsModalOpen(true);
  };

  return (
    <main id="homepage" className="bg-neutral-50 dark:bg-neutral-900 h-[100vh]">
      <div className="w-[800px] mx-auto pt-10">
        <nav className="pb-10 flex">
          <div className="ml-auto">
            <Switch value={darkTheme} handleClick={handleToggleDarkTheme} />
          </div>
        </nav>

        <header className="flex justify-between items-center mb-5">
          <h1 className="font-semibold text-xl dark:text-white">Robots</h1>
          <Button onClick={handleToggleModal} startIcon={<AiOutlinePlus />}>
            Add new robot
          </Button>
        </header>

        <section className="list">
          <ul className="w-full">
            {!robots.length && !isLoadingRobots && <EmptyList />}

            {robots.map((robot: Robot, index: number) => (
              <RobotItem
                key={index}
                robot={robot}
                handleRemoveRobot={handleRemoveRobot}
                handleEditRobot={handleEditRobot}
              />
            ))}
          </ul>
        </section>
      </div>

      {isModalOpen && (
        <RobotForm
          onClose={() => {
            handleToggleModal();
            setCurrentEditedRobotId("");
          }}
          handleSubmitForm={handleSubmitForm}
          robots={robots}
          currentEditedRobotId={currentEditedRobotId}
        />
      )}
    </main>
  );
}
