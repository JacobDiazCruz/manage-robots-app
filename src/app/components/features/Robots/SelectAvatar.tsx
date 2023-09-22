import Image, { StaticImageData } from "next/image";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import { ROBOT_AVATARS } from "../../../utils/avatars";

interface SelectAvatarProps {
  handleToggleAvatarsDropdown: () => void;
  onChange: (_avatar: StaticImageData) => void;
}

export default function SelectAvatar({
  handleToggleAvatarsDropdown,
  onChange,
}: SelectAvatarProps) {
  const avatarsDropdown = useOutsideClick(handleToggleAvatarsDropdown);

  return (
    <div
      ref={avatarsDropdown}
      className="fixed bg-neutral-50 shadow-md dark:bg-neutral-800 overflow-auto z-[700] w-[270px] h-[200px] border dark:border-neutral-700 rounded-lg"
    >
      <div className="flex flex-wrap">
        {ROBOT_AVATARS.map((avatar: StaticImageData, index: number) => (
          <div
            key={index}
            className="cursor-pointer"
            onClick={() => {
              onChange(avatar);
              handleToggleAvatarsDropdown();
            }}
          >
            <Image src={avatar} alt="" width={80} height={80} />
          </div>
        ))}
      </div>
    </div>
  );
}
