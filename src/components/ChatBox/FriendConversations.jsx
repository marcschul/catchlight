import classNames from "classnames";
import TopicContainer from "./TopicContainer";
import MessageContainer from "./MessageContainer";
import InputContainer from "./InputContainer";
import { useState } from "react";
export default function FriendConversations(props) {
  const { isOpen, topicSelected, topicOnClick } = props;

  const hide = classNames(
    "flex flex-col justify-between bg-gradient-to-r  from-chatbg1 via-chatbg2 to-chatbg3 w-full",
    {
      "": isOpen,
      hidden: !isOpen,
    }
  );

  return (
    <div className={hide}>
      <TopicContainer
        topicSelected={topicSelected}
        topicOnClick={topicOnClick}
      />
      <MessageContainer />
      <InputContainer />
    </div>
  );
}
