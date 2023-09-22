"use client";

import { useUser } from "@/src/app/store/User";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

import useDeleteRobot from "../../../hooks/useDeleteRobot";
import usePersistRobotsData from "../../../hooks/usePersistRobotsData";
import { Robot, SubmitRobotFormParams } from "../../../types/robot";
import Button from "../../ui/Button";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import EmptyList from "./EmptyList";
import RobotForm from "./RobotForm";
import RobotItem from "./RobotItem";
import UnauthScreen from "./UnauthScreen";
import ViewDetailsModal from "./ViewDetailsModal";

export default function Robots() {
  const { currentUser } = useUser();
  const { handleDeleteRobot } = useDeleteRobot();
  const { robots, setRobots, isLoadingRobots } = usePersistRobotsData();

  const [showRobotFormModal, setShowRobotFormModal] = useState<boolean>(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    useState<boolean>(false);
  const [showViewRobotDetails, setShowViewRobotDetails] =
    useState<boolean>(false);

  const [selectedRobotId, setSelectedRobotId] = useState<string>("");
  const [viewedRobotData, setViewedRobotData] = useState<Robot | null>(null);

  const handleSubmitForm = ({ data, formType }: SubmitRobotFormParams) => {
    if (formType === "ADD") {
      handleAddRobot(data);
    }
    handleEditRobot(data);
  };

  const handleAddRobot = (data: Robot) => {
    setRobots((prev) => {
      prev.push(data);
      return prev;
    });
  };

  /**
   * Update the values of the currently edited robot,
   * then clear the selected robot ID, and close the modal.
   */
  const handleEditRobot = (data: Robot) => {
    setRobots((prev) => {
      const newRobots = prev.map((robot) => {
        if (robot.id === selectedRobotId) {
          return {
            ...robot,
            avatar: data.avatar,
            name: data.name,
            purpose: data.purpose,
          };
        } else {
          return robot;
        }
      });
      return newRobots;
    });
    setSelectedRobotId("");
    setShowRobotFormModal(false);
  };

  return (
    <div className="pt-10">
      <header className="flex justify-between items-center mb-5">
        <h1 className="font-semibold text-xl dark:text-white">
          Robots
          {currentUser && (
            <span className="font-light">({robots?.length})</span>
          )}
        </h1>
        {currentUser && (
          <Button
            onClick={() => setShowRobotFormModal(true)}
            startIcon={<AiOutlinePlus />}
          >
            Add new robot
          </Button>
        )}
      </header>

      <section className="list">
        <ul className="w-full">
          {!robots.length && !isLoadingRobots ? (
            <EmptyList />
          ) : (
            !currentUser && !isLoadingRobots && <UnauthScreen />
          )}

          {currentUser &&
            robots?.map((robot: Robot, index: number) => (
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
            setShowRobotFormModal(false);
            setSelectedRobotId("");
          }}
          handleSubmitForm={handleSubmitForm}
          robots={robots}
          currentEditedRobotId={selectedRobotId}
        />
      )}

      {showDeleteConfirmation && (
        <DeleteConfirmationModal
          onClose={() => {
            setShowDeleteConfirmation(false);
            setSelectedRobotId("");
          }}
          handleDeleteRobot={() => {
            handleDeleteRobot(selectedRobotId, setRobots);
            setShowDeleteConfirmation(false);
            setSelectedRobotId("");
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
