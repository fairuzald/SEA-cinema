"use client";
import {  useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  isOpen: boolean;
  body: React.ReactNode;
  footer?: React.ReactNode;
  header?: React.ReactNode;
  size?: "large" | "medium";
  onClose: () => void
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  body,
  footer,
  header,
  size = "large",
  onClose
}) => {
  // State to track if the component is mounted to prevent hidration problem
  const [mounted, setMounted] = useState(false);
  const sizeEffect = {
    large: "sm:w-[65vw] sm:max-w-[750px] max-w-[420px] w-[90vw]",
    medium: "sm:w-[65vw] sm:max-w-[550px] max-w-[320px] w-[80vw]"
  };

  const blackBgRef = useRef<HTMLDivElement>(null);
  // Close Navbar when user clicks except Navbar content
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // If Userclick is in the black background stuff
      if (
        blackBgRef.current &&
        blackBgRef.current.contains(event.target as Node)
      ) {
        onClose()
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [blackBgRef, onClose]);

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
          {/* Push the component as react portal into div portals id */}
          {ReactDOM.createPortal(
            <>
              <div
                className={`fixed ${isOpen
                  ? "opacity-100 -translate-y-1/2"
                  : "translate-y-0 pointer-events-none opacity-0"
                  } left-1/2 top-1/2 z-50 flex h-fit translate
                -translate-x-1/2  translate transform flex-col items-center justify-center rounded-xl overflow-x-hidden overflow-y-auto transition duration-300 sm:items-start ${sizeEffect[size]
                  }`}
              >
                {/* Main content */}
                {header}
                <div className="flex w-full  p-6 flex-col gap-8 bg-[#2a2929]">
                  {/* Content */}
                  {body}
                  {/* Footer */}
                  {footer}
                </div>
              </div>
              {isOpen && (
                <div
                  ref={blackBgRef}
                  className="fixed left-0 top-0 z-[49] h-screen w-full bg-[#111111] opacity-50 transition duration-300"
                />
              )}
            </>,
            document.getElementById("portals") as HTMLElement
          )}
        </>
      )}
    </>
  );
};

export default Modal;
