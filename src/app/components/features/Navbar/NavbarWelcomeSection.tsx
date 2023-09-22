import { SiRobotframework } from "react-icons/si";

export default function NavbarWelcomeSection() {
  return (
    <section className="hidden md:block w-1/2 bg-neutral-100 dark:bg-neutral-700 h-full relative">
      <div className="flex flex-col items-center justify-center h-full">
        <SiRobotframework className="block w-14 h-14 text-neutral-700 dark:text-neutral-100" />
        <h2 className="text-center text-neutral-700 dark:text-neutral-100 font-semibold justify-center text-2xl mt-3">
          Welcome!
        </h2>
      </div>
    </section>
  );
}
