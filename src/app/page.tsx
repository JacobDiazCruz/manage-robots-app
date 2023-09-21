"use client";

import Image from "next/image";
import Baby from "../../public/baby.png";
import Button from "./components/Button";

export default function Home() {
  return (
    <main id="homepage">
      <div className="w-[800px] mx-auto mt-10">
        <div className="flex justify-between items-center mb-5">
          <h1 className="font-semibold text-xl">Robots</h1>
          <Button>Add new robot</Button>
        </div>
        <section className="list">
          <ul className="w-full">
            <li className="w-full border rounded-lg p-2">
              <div className="flex gap-2 items-center">
                <Image src={Baby} alt="avatar" width={80} height={80} />
                <div className="w-1/2">
                  <h4 className="truncate">John Doe</h4>
                  <p className="text-neutral-500 text-sm line-clamp-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Neque voluptates blanditiis vel
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
