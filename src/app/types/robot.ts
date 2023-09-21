import { StaticImageData } from "next/image";

export type Robot = {
  id: string;
  avatar: StaticImageData;
  name: string;
  purpose: string;
};
