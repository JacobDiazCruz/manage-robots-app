"use client";

import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { FiEdit2 } from "react-icons/fi";
import { PiRobotThin } from "react-icons/pi";

import Image from "next/image";
import AddNewRobotForm from "./components/features/AddNewRobotForm";
import Button from "./components/ui/Button";
import IconButton from "./components/ui/IconButton";
import Switch from "./components/ui/Switch";
import useDarkTheme from "./hooks/useDarkTheme";
import { Robot } from "./types/robot";

export default function Homepage() {
  const { darkTheme, handleToggleDarkTheme } = useDarkTheme();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [robots, setRobots] = useState<Robot[]>([]);

  const handleToggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleSubmitForm = (robot: Robot) => {
    setRobots((prev) => {
      const robotsCopy = [...prev];
      robotsCopy.push(robot);
      return robotsCopy;
    });
    handleToggleModal();
  };

  const DisplayEmpty = () => {
    return (
      <div className="text-center py-20 border-t dark:border-neutral-700">
        <PiRobotThin className="w-20 h-20 m-auto text-neutral-500" />
        <p className="text-neutral-600 font-light">No robots yet.</p>
      </div>
    );
  };

  return (
    <main id="homepage" className="bg-neutral-50 dark:bg-neutral-900 h-[100vh]">
      <div className="w-[800px] mx-auto pt-10">
        <header className="pb-10 flex">
          <div className="ml-auto">
            <Switch value={darkTheme} handleClick={handleToggleDarkTheme} />
          </div>
        </header>
        <div className="flex justify-between items-center mb-5">
          <h1 className="font-semibold text-xl dark:text-white">Robots</h1>
          <Button onClick={handleToggleModal} startIcon={<AiOutlinePlus />}>
            Add new robot
          </Button>
        </div>

        <section className="list">
          <ul className="w-full">
            {!robots.length && <DisplayEmpty />}

            {robots.map((robot: Robot, index: number) => (
              <li
                key={index}
                className="w-full border dark:border-neutral-700 dark:bg-neutral-800 rounded-xl p-2 my-3"
              >
                <div className="flex gap-2 items-center">
                  <Image
                    src={robot.avatar}
                    alt="avatar"
                    width={80}
                    height={80}
                  />
                  <div className="w-1/2">
                    <h4 className="truncate dark:text-white font-semibold">
                      {robot.name}
                    </h4>
                    <p className="text-neutral-500 text-sm dark:text-neutral-200 line-clamp-2 font-light">
                      {robot.purpose}
                    </p>
                  </div>
                  <div className="flex ml-auto gap-1">
                    <IconButton
                      onClick={() =>
                        setRobots((prev) => {
                          const robotsCopy = [...prev];
                          const filteredRobots = robotsCopy.filter(
                            (robotCopy) => robotCopy.id !== robot.id
                          );
                          return filteredRobots;
                        })
                      }
                    >
                      <BiTrash className="w-5 h-5 text-neutral-400" />
                    </IconButton>
                    <IconButton>
                      <FiEdit2 className="w-5 h-5 text-neutral-400" />
                    </IconButton>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {isModalOpen && (
        <AddNewRobotForm
          onClose={handleToggleModal}
          handleSubmitForm={handleSubmitForm}
        />
      )}
    </main>
  );
}
