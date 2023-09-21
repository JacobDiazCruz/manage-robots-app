import { FiSun } from "react-icons/fi";
import { MdOutlineDarkMode } from "react-icons/md";

interface SwitchProps {
  value: boolean;
  handleClick: (_value: boolean) => void;
}

export default function Switch({ value = false, handleClick }: SwitchProps) {
  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden">
      <div className="flex">
        <label className="inline-flex relative items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={value}
            readOnly
          />
          <div
            onClick={() => {
              handleClick(!value);
            }}
            className="w-11 flex justify-between px-1 items-center h-6 bg-indigo-400 rounded-full peer peer-focus:ring-green-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-400"
          >
            <FiSun className="text-orange-900" />
            <MdOutlineDarkMode className="text-indigo-900" />
          </div>
        </label>
      </div>
    </div>
  );
}
