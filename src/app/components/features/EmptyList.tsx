import { PiRobotThin } from "react-icons/pi";

export default function EmptyList() {
  return (
    <div className="text-center py-20 border-t dark:border-neutral-700">
      <PiRobotThin className="w-20 h-20 m-auto text-neutral-500" />
      <p className="text-neutral-600 font-light">No robots.</p>
    </div>
  );
}
