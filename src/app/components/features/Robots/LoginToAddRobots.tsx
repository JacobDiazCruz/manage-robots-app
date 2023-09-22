import { PiRobotThin } from "react-icons/pi";

export default function LoginToAddRobots() {
  return (
    <div className="text-center py-20 border-t dark:border-neutral-700">
      <PiRobotThin className="w-20 h-20 m-auto text-neutral-500 dark:text-neutral-300" />
      <p className="text-neutral-600 dark:text-neutral-200 font-light">
        Login to add robots.
      </p>
    </div>
  );
}
