"use client";

import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import DeleteConfirmationModal from "./components/features/DeleteConfirmationModal";

import EmptyList from "./components/features/EmptyList";
import RobotForm from "./components/features/RobotForm";
import RobotItem from "./components/features/RobotItem";
import Button from "./components/ui/Button";
import Switch from "./components/ui/Switch";
import useDarkTheme from "./hooks/useDarkTheme";
import useDeleteRobot from "./hooks/useDeleteRobot";
import usePersistRobotsData from "./hooks/usePersistRobotsData";
import { Robot, SubmitRobotFormParams } from "./types/robot";

export default function Homepage() {
  const { darkTheme, handleToggleDarkTheme } = useDarkTheme();
  const { handleDeleteRobot } = useDeleteRobot();

  const [showRobotFormModal, setShowRobotFormModal] = useState<boolean>(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    useState<boolean>(false);
  const [selectedRobotId, setSelectedRobotId] = useState<string>("");

  const { robots, setRobots, isLoadingRobots } = usePersistRobotsData();

  const handleToggleModal = () => {
    setShowRobotFormModal((prev) => !prev);
  };

  const handleSubmitForm = ({ data, formType }: SubmitRobotFormParams) => {
    if (formType === "ADD") {
      handleAddRobot(data);
    }
    handleEditRobot(data);
  };

  const handleAddRobot = (data: Robot) => {
    setRobots((prev) => {
      const robotsCopy = [...prev];
      robotsCopy.push(data);
      return robotsCopy;
    });
  };

  /**
   * Update the values of the current edited robot from the robots list.
   * Then empty the robot id and close the modal
   */
  const handleEditRobot = (data: Robot) => {
    setRobots((prev) => {
      const robotsCopy = [...prev];
      const newRobotsCopy = robotsCopy.map((robot) => {
        if (robot.id === selectedRobotId) {
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
    setSelectedRobotId("");
    handleToggleModal();
  };

  return (
    <main
      id="homepage"
      className="bg-neutral-50 dark:bg-neutral-900 min-h-[100vh]"
    >
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
                handleDeleteRobot={() => {
                  setSelectedRobotId(robot.id);
                  setShowDeleteConfirmation(true);
                }}
                handleEditRobot={() => {
                  setSelectedRobotId(robot.id);
                  setShowRobotFormModal(true);
                }}
              />
            ))}
          </ul>
        </section>
      </div>

      {showRobotFormModal && (
        <RobotForm
          onClose={() => {
            handleToggleModal();
            setSelectedRobotId("");
          }}
          handleSubmitForm={handleSubmitForm}
          robots={robots}
          currentEditedRobotId={selectedRobotId}
        />
      )}

      {showDeleteConfirmation && (
        <DeleteConfirmationModal
          onClose={() => setShowDeleteConfirmation(false)}
          handleDeleteRobot={() => {
            handleDeleteRobot(selectedRobotId, setRobots);
            setShowDeleteConfirmation(false);
          }}
        />
      )}
    </main>
  );
}
