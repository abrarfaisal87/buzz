import React from "react";

import useConversation from "../Zustand/useConversation";
import { useSocketContext } from "../context/socketContext";

const Conversation = ({ conversation }) => {
  const { setSelectedConversation, selectedConversation } = useConversation();
  const isSelected = selectedConversation?.id === conversation.id;
  
  const {onlineUsers}=useSocketContext();
  const isOnline = onlineUsers.includes(conversation.id);

  return (
    <>
      <div
        className={`p-1 flex gap-2 items-center hover:bg-gray-500 rounded-2xl cursor-pointer 
          ${isSelected ? "bg-gray-500" : ""}`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-9 rounded-full">
            <img src={conversation.profilePic} alt="user avatar" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div>
            <p className="font-normal text-sm text-gray-400">
              {conversation.fullname}
            </p>
          </div>
        </div>
      </div>
      <div className="divider my-0 px-3"></div>
    </>
  );
};

export default Conversation;
