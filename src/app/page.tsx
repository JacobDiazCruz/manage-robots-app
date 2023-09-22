import Navbar from "./components/features/Navbar";
import Robots from "./components/features/Robots";

export default function Homepage() {
  return (
    <main
      id="homepage"
      className="bg-neutral-50 dark:bg-neutral-900 min-h-[100vh]"
    >
      <div className="w-[800px] mx-auto pt-7">
        <Navbar />
        <Robots />
      </div>
    </main>
  );
}
