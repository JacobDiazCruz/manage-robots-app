import { MdClose } from "react-icons/md";

interface ModalProps {
  onClose: () => void;
  className?: string;
  persist?: boolean;
  children: React.ReactNode;
  showBackdrop?: boolean;
}

interface ChildProps {
  children: React.ReactNode;
}

export const ModalContent = ({ children }: ChildProps) => {
  return (
    <div className="h-full content overflow-y-auto relative px-7 py-3">
      {children}
    </div>
  );
};

export const ModalHeader = ({ children }: ChildProps) => {
  return (
    <div className="py-5 px-7 w-full top-0 sticky z-[100] dark:bg-neutral-800 bg-white">
      {children}
    </div>
  );
};

export const ModalTitle = ({ children }: ChildProps) => {
  return <h2 className="font-semibold dark:font-normal">{children}</h2>;
};

export default function Modal({
  onClose,
  className,
  persist,
  children,
}: ModalProps) {
  return (
    <>
      <div
        className="fixed inset-0 w-full h-full dark:bg-neutral-300 bg-neutral-800 opacity-20 z-[600]"
        onClick={() => !persist && onClose()}
      ></div>
      <dialog
        open
        className={`
          ${className}
          dark:bg-neutral-800 bg-white shadow-xl shadow-sm rounded-lg m-auto fixed inset-0 z-[700] outline-none focus:outline-none
        `}
      >
        <div
          onClick={onClose}
          className="dark:bg-white flex items-center bg-neutral-700 cursor-pointer shadow-xl dark:border border-solid fixed items-center rounded-full w-[23px] h-[23px] absolute right-[-10px] top-[-10px] z-[999]"
        >
          <MdClose className="dark:fill-neutral-800 fill-white w-4 h-4 m-auto" />
        </div>
        <div className="relative h-full rounded-lg">{children}</div>
      </dialog>
    </>
  );
}
