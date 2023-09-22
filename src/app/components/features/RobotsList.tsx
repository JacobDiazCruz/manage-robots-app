"use client";

import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

import useDeleteRobot from "../../hooks/useDeleteRobot";
import usePersistRobotsData from "../../hooks/usePersistRobotsData";
import { Robot, SubmitRobotFormParams } from "../../types/robot";
import Button from "../ui/Button";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import EmptyList from "./EmptyList";
import RobotForm from "./RobotForm";
import RobotItem from "./RobotItem";
import ViewDetailsModal from "./ViewDetailsModal";

export default function RobotsList() {
  const { handleDeleteRobot } = useDeleteRobot();

  const [showRobotFormModal, setShowRobotFormModal] = useState<boolean>(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    useState<boolean>(false);
  const [showViewRobotDetails, setShowViewRobotDetails] =
    useState<boolean>(false);

  const [selectedRobotId, setSelectedRobotId] = useState<string>("");
  const [viewedRobotData, setViewedRobotData] = useState<Robot | null>(null);

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
    <div className="pt-10">
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
              handleViewRobotDetails={(e) => {
                e.stopPropagation();
                setViewedRobotData(robot);
                setShowViewRobotDetails(true);
              }}
              handleDeleteRobot={(e) => {
                e.stopPropagation();
                setSelectedRobotId(robot.id);
                setShowDeleteConfirmation(true);
              }}
              handleEditRobot={(e) => {
                e.stopPropagation();
                setSelectedRobotId(robot.id);
                setShowRobotFormModal(true);
              }}
            />
          ))}
        </ul>
      </section>
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

      {showViewRobotDetails && (
        <ViewDetailsModal
          onClose={() => setShowViewRobotDetails(false)}
          robot={viewedRobotData as Robot}
        />
      )}
    </div>
  );
}
