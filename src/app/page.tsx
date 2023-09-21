"use client";

import Image from "next/image";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Baby from "../../public/baby.png";
import AddNewRobotForm from "./components/features/AddNewRobotForm";
import Button from "./components/ui/Button";
import Switch from "./components/ui/Switch";
import useDarkTheme from "./hooks/useDarkTheme";

export default function Homepage() {
  const { darkTheme, handleToggleDarkTheme } = useDarkTheme();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleToggleModal = () => {
    setIsModalOpen((prev) => !prev);
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
            <li className="w-full border dark:border-neutral-700 dark:bg-neutral-800 rounded-xl p-2 my-3">
              <div className="flex gap-2 items-center">
                <Image src={Baby} alt="avatar" width={80} height={80} />
                <div className="w-1/2">
                  <h4 className="truncate dark:text-white">John Doe</h4>
                  <p className="text-neutral-500 text-sm dark:text-neutral-200 line-clamp-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Neque voluptates blanditiis vel
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </section>
      </div>

      {isModalOpen && <AddNewRobotForm onClose={handleToggleModal} />}
    </main>
  );
}
