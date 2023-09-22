import { StaticImageData } from "next/image";

export type Robot = {
  id: string;
  avatar: StaticImageData;
  name: string;
  purpose: string;
};

export type SubmitRobotFormParams = {
  data: Robot;
  submitType: "ADD" | "EDIT";
};
