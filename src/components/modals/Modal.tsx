"use client";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  isOpen: boolean;
  body: React.ReactNode;
  footer?: React.ReactNode;
  header?: React.ReactNode;
  size?: "large" | "medium";
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  body,
  footer,
  header,
  size = "large",
}) => {
  // State to track if the component is mounted
  const [mounted, setMounted] = useState(false);
  const sizeEffect = {
    large: "sm:w-[65vw] sm:max-w-[750px] max-w-[420px] w-[90vw]",
    medium:"sm:w-[65vw] sm:max-w-[550px] max-w-[320px] w-[80vw]"
  };
  useEffect(() => {
    // Set the mounted state to true when the component mounts
    setMounted(true);
  }, []);

  if (!mounted) {
    // If the component is not mounted yet, return null
    return null;
  }

  return (
    <>
      {typeof document !== "undefined" && (
        <>
          {ReactDOM.createPortal(
            <>
              <div
                className={`fixed ${
                  isOpen
                    ? "opacity-100 -translate-y-1/2"
                    : "translate-y-0 pointer-events-none opacity-0"
                } left-1/2 top-1/2 z-50 flex h-fit translate
                -translate-x-1/2  translate transform flex-col items-center justify-center rounded-xl overflow-x-hidden overflow-y-auto transition duration-300 sm:items-start ${
                  sizeEffect[size]
                }`}
              >
                {/* Main content */}
                {header}
                <div className="flex w-full  p-6 flex-col gap-8 bg-[#2a2929]">
                  {/* Content */}
                  {body}
                  {footer}
                </div>
              </div>
              <span
                className={` ${
                  isOpen ? "opacity-100" : "pointer-events-none opacity-0"
                } fixed z-[49] inset-0 flex w-full bg-neutral-800/70 transition-opacity duration-300`}
              ></span>
            </>,
            document.getElementById("portals") as HTMLElement
          )}
        </>
      )}
    </>
  );
};

export default Modal;
