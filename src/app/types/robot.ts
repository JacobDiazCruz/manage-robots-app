import { StaticImageData } from "next/image";

export type Robot = {
  avatar: StaticImageData;
  name: string;
  purpose: string;
};
