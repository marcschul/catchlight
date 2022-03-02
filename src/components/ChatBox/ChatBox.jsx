import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ChatContent from "./ChatContent";
import classNames from "classnames";

export default function ChatBox() {

  const [isOpen, setIsOpen] = useState(false);
  function toggleChat() {
    setIsOpen(!isOpen);
  }

  const toggleWidth = classNames(
    "flex fixed bottom-2 right-0 max-h-[100px] min-h-[100px] shadow-md drop-shadow-md z-50 chatmd:max-h-[500px] chatmd:min-h-[500px]",
    { "chatlg:w-1/2 chatmd:w-3/5 w-full max-h-[450px] min-h-[450px]": isOpen, "": !isOpen }
  );

  const rotateArrow = classNames("w-10 h-10 -left-3 text-black", {
    "": isOpen,
    "rotate-180": !isOpen,
  });

  return (
    <div className={toggleWidth}>
      <ChatContent isOpen={isOpen} />
      <button
        onClick={() => toggleChat()}
        className="flex justify-center items-center bg-navbar rounded-lg mx-1 border-2 border-black min-w-[50px] hover:bg-amber-500"
      >
        <FontAwesomeIcon className={rotateArrow} icon={faArrowRight} />
      </button>
    </div>
  );
}
