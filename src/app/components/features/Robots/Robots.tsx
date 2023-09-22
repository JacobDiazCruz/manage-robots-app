"use client";

import { useUser } from "@/src/app/store/User";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

import useDeleteRobot from "../../../hooks/useDeleteRobot";
import usePersistRobotsData from "../../../hooks/usePersistRobotsData";
import { Robot, SubmitRobotFormParams } from "../../../types/robot";
import Button from "../../ui/Button";
import RobotDeleteModal from "./RobotDeleteModal";
import RobotDetailsModal from "./RobotDetailsModal";
import RobotEmptyList from "./RobotEmptyList";
import RobotForm from "./RobotForm";
import RobotItem from "./RobotItem";
import RobotUnauthScreen from "./RobotUnauthScreen";

export default function Robots() {
  const { currentUser } = useUser();
  const { handleDeleteRobot } = useDeleteRobot();
  const { robots, setRobots, isLoadingRobots } = usePersistRobotsData();

  const [showRobotFormModal, setShowRobotFormModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false);

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
    <article className="pt-10">
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
            <RobotEmptyList />
          ) : (
            !currentUser && !isLoadingRobots && <RobotUnauthScreen />
          )}

          {currentUser &&
            robots?.map((robot: Robot, index: number) => (
              <RobotItem
                key={index}
                robot={robot}
                handleViewRobotDetails={(e) => {
                  e.stopPropagation();
                  setViewedRobotData(robot);
                  setShowDetailsModal(true);
                }}
                handleDeleteRobot={(e) => {
                  e.stopPropagation();
                  setSelectedRobotId(robot.id);
                  setShowDeleteModal(true);
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

      {showDeleteModal && (
        <RobotDeleteModal
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedRobotId("");
          }}
          handleDeleteRobot={() => {
            handleDeleteRobot(selectedRobotId, setRobots);
            setShowDeleteModal(false);
            setSelectedRobotId("");
          }}
        />
      )}

      {showDetailsModal && (
        <RobotDetailsModal
          onClose={() => setShowDetailsModal(false)}
          robot={viewedRobotData as Robot}
        />
      )}
    </article>
  );
}
